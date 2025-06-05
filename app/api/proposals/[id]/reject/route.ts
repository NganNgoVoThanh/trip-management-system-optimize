// app/api/proposals/[id]/reject/route.ts
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const proposalId = params.id;
    
    // Logic cập nhật database hoặc state management
    console.log('Rejecting proposal:', proposalId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Không thể từ chối đề xuất' },
      { status: 500 }
    );
  }
}