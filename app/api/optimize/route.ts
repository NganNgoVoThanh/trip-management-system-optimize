// app/api/optimize/route.ts
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { Trip } from '@/lib/ai-optimizer';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const trips: Trip[] = data.trips;

    if (!trips || !Array.isArray(trips) || trips.length === 0) {
      return NextResponse.json(
        { error: 'Không có dữ liệu chuyến đi hợp lệ' },
        { status: 400 }
      );
    }

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
    const proposals = [];
    
    for (const [key, groupTrips] of Object.entries(tripGroups)) {
      if (groupTrips.length > 1) {
        const prompt = `
        Hãy phân tích và tối ưu hóa các chuyến đi sau:
        ${JSON.stringify(groupTrips, null, 2)}

        Yêu cầu:
        1. Đề xuất một thời gian khởi hành tối ưu để gộp các chuyến đi này
        2. Quyết định loại xe phù hợp (xe 4 chỗ hoặc xe 7 chỗ)
        3. Ước tính số tiền tiết kiệm được khi gộp chuyến
        4. Phân tích lợi ích của đề xuất

        Trả về kết quả theo định dạng JSON:
        {
          "optimizedTime": "HH:MM",
          "vehicleType": "Xe X chỗ",
          "savingEstimate": "X.XXX.XXX VNĐ",
          "analysis": "Phân tích chi tiết"
        }
        `;

        try {
          const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              { 
                role: "system", 
                content: "Bạn là AI chuyên về tối ưu hóa lịch trình và chi phí di chuyển cho doanh nghiệp. Hãy phân tích kỹ lưỡng và đưa ra đề xuất tối ưu nhất." 
              },
              { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }
          });

          const aiResult = JSON.parse(completion.choices[0]?.message?.content || '{}');
          
          proposals.push({
            id: `opt-${Date.now()}-${key}`,
            trips: groupTrips.map(trip => ({
              ...trip,
              originalDepartureTime: trip.departureTime,
              departureTime: aiResult.optimizedTime || trip.departureTime,
            })),
            vehicle: aiResult.vehicleType || "Xe 4 chỗ",
            savingEstimate: aiResult.savingEstimate || "0 VNĐ",
            status: "pending",
            analysis: aiResult.analysis || "Đề xuất tối ưu hóa chuyến đi"
          });
        } catch (error) {
          console.error('Lỗi khi gọi OpenAI:', error);
        }
      }
    }

    return NextResponse.json({ proposals });
  } catch (error) {
    console.error('Lỗi khi tối ưu hóa chuyến đi:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tối ưu hóa chuyến đi' },
      { status: 500 }
    );
  }
}