// lib/ai-optimizer.ts

import { OpenAI } from 'openai';

export interface Trip {
  id: string;
  user: string;
  email?: string;
  departureLocation: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  returnDate: string;
  returnTime: string;
  status?: string;
  notified?: boolean;
  optimized?: boolean;
  originalDepartureTime?: string;
}

export interface OptimizationProposal {
  id: string;
  trips: Trip[];
  vehicle: string;
  savingEstimate: string;
  status?: string;
  analysis?: string;
}

// Khởi tạo OpenAI client - bạn cần cung cấp API key khi triển khai
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function optimizeTrips(trips: Trip[]): Promise<OptimizationProposal[]> {
  try {
    // Nhóm các chuyến đi theo ngày và tuyến đường
    const tripGroups: Record<string, Trip[]> = {};

    trips.forEach((trip) => {
      const key = `${trip.departureDate}-${trip.departureLocation}-${trip.destination}`;
      if (!tripGroups[key]) {
        tripGroups[key] = [];
      }
      tripGroups[key].push(trip);
    });

    // Tạo đề xuất cho các nhóm có nhiều hơn 1 chuyến đi
    const proposals: OptimizationProposal[] = [];
    const aiPromises: Promise<any>[] = [];

    // Chuẩn bị các nhóm chuyến đi và tạo promise gọi API cho mỗi nhóm
    for (const [key, groupTrips] of Object.entries(tripGroups)) {
      if (groupTrips.length > 1) {
        // Chuẩn bị prompt cho OpenAI
        aiPromises.push(optimizeGroupWithAI(key, groupTrips, proposals));
      }
    }

    // Chờ tất cả các cuộc gọi API hoàn thành
    await Promise.all(aiPromises);

    // Sắp xếp các đề xuất theo số tiền tiết kiệm được (từ cao đến thấp)
    return proposals.sort((a, b) => {
      const valueA = parseInt(a.savingEstimate.replace(/[^\d]/g, ''));
      const valueB = parseInt(b.savingEstimate.replace(/[^\d]/g, ''));
      return valueB - valueA;
    });
  } catch (error) {
    console.error("Lỗi khi tối ưu hóa chuyến đi:", error);
    return [];
  }
}

async function optimizeGroupWithAI(key: string, groupTrips: Trip[], proposals: OptimizationProposal[]): Promise<void> {
  try {
    // Tạo một JSON representation của nhóm chuyến đi
    const tripsJson = JSON.stringify(groupTrips.map(trip => ({
      id: trip.id,
      user: trip.user,
      departureLocation: trip.departureLocation,
      destination: trip.destination,
      departureDate: trip.departureDate,
      departureTime: trip.departureTime,
      returnDate: trip.returnDate,
      returnTime: trip.returnTime
    })));

    // Xây dựng prompt cho OpenAI
    const prompt = `
    Hãy phân tích và tối ưu hóa các chuyến đi sau đây:
    ${tripsJson}

    Nhiệm vụ của bạn là:
    1. Đề xuất một thời gian khởi hành tối ưu để gộp các chuyến đi này (dựa trên thời gian hiện có).
    2. Quyết định loại xe phù hợp (xe 4 chỗ hoặc xe 7 chỗ) dựa trên số lượng người.
    3. Ước tính số tiền tiết kiệm được (tính bằng VNĐ) khi gộp các chuyến đi.
    4. Cung cấp phân tích ngắn gọn về lợi ích của đề xuất này.

    Trả về kết quả theo định dạng JSON như sau:
    {
      "optimizedTime": "HH:MM", 
      "vehicleType": "Xe X chỗ",
      "savingEstimate": "X VNĐ",
      "analysis": "Phân tích ngắn gọn về lợi ích"
    }
    `;

    // Gọi OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "Bạn là một AI chuyên về tối ưu hóa lịch trình và chi phí di chuyển cho doanh nghiệp." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    // Phân tích phản hồi từ AI
    const responseContent = completion.choices[0]?.message?.content || '';
    let aiResult;
    
    try {
      aiResult = JSON.parse(responseContent);
    } catch (e) {
      console.error("Lỗi khi phân tích JSON từ AI:", e);
      // Sử dụng giá trị mặc định nếu không thể phân tích JSON
      aiResult = {
        optimizedTime: groupTrips[0].departureTime,
        vehicleType: groupTrips.length <= 4 ? "Xe 4 chỗ" : "Xe 7 chỗ",
        savingEstimate: `${groupTrips.length * 300000} VNĐ`,
        analysis: "Đề xuất này sẽ giúp tiết kiệm chi phí vận chuyển bằng cách gộp các chuyến đi có cùng lộ trình."
      };
    }

    // Tạo đề xuất từ kết quả AI
    const optimizedTime = aiResult.optimizedTime;
    const vehicleType = aiResult.vehicleType;
    const savingEstimate = aiResult.savingEstimate;
    const analysis = aiResult.analysis;

    // Tạo đề xuất
    proposals.push({
      id: `opt-${Date.now()}-${key}`,
      trips: groupTrips.map(trip => ({
        ...trip,
        originalDepartureTime: trip.departureTime,
        departureTime: optimizedTime,
      })),
      vehicle: vehicleType,
      savingEstimate,
      status: "pending",
      analysis
    });
  } catch (error) {
    console.error("Lỗi khi tối ưu hóa nhóm chuyến đi với AI:", error);
    
    // Fallback nếu API không hoạt động
    const optimizedTime = groupTrips.reduce(
      (prev, current) => (prev < current.departureTime ? prev : current.departureTime),
      "23:59",
    );

    const vehicleType = groupTrips.length <= 4 ? "Xe 4 chỗ" : "Xe 7 chỗ";
    const savingEstimate = `${groupTrips.length * 300000} VNĐ`;

    proposals.push({
      id: `opt-${Date.now()}-${key}`,
      trips: groupTrips.map(trip => ({
        ...trip,
        originalDepartureTime: trip.departureTime,
        departureTime: optimizedTime,
      })),
      vehicle: vehicleType,
      savingEstimate,
      status: "pending",
      analysis: "Đề xuất này sẽ giúp tiết kiệm chi phí vận chuyển bằng cách gộp các chuyến đi có cùng lộ trình."
    });
  }
}

// Hàm để ước tính chi phí của một chuyến đi đơn lẻ - có thể điều chỉnh theo nhu cầu
export function estimateTripCost(trip: Trip): number {
  // Ước tính đơn giản dựa trên khoảng cách
  const basePrice = 500000; // Giá cơ bản cho một chuyến
  
  // Có thể mở rộng để tính toán phức tạp hơn dựa trên khoảng cách giữa các địa điểm
  return basePrice;
}