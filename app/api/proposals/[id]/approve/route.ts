// app/api/proposals/[id]/approve/route.ts
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const proposalId = params.id;
    
    // Logic cập nhật database hoặc state management
    // Tạm thời trả về success
    console.log('Approving proposal:', proposalId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Không thể chấp nhận đề xuất' },
      { status: 500 }
    );
  }
}