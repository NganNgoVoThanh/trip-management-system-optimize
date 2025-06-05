// app/api/proposals/[id]/notify/route.ts
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const proposalId = params.id;
    
    // Logic gửi email thông báo
    console.log('Sending notifications for proposal:', proposalId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Không thể gửi thông báo' },
      { status: 500 }
    );
  }
}