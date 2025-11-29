import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        subject: subject || null,
        message,
      },
    });

    return NextResponse.json({ submission }, { status: 201 });
  } catch (error) {
    console.error('Error creating contact submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
