import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const favorites = await prisma.userFavorite.findMany({
      where: { userId: user.id },
      include: {
        recipe: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ favorites });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { recipeId } = body;

    if (!recipeId) {
      return NextResponse.json(
        { error: 'Recipe ID is required' },
        { status: 400 }
      );
    }

    // Check if already favorited
    const existingFavorite = await prisma.userFavorite.findUnique({
      where: {
        userId_recipeId: {
          userId: user.id,
          recipeId,
        },
      },
    });

    if (existingFavorite) {
      return NextResponse.json(
        { error: 'Recipe already in favorites' },
        { status: 400 }
      );
    }

    const favorite = await prisma.userFavorite.create({
      data: {
        userId: user.id,
        recipeId,
      },
    });

    return NextResponse.json({ favorite }, { status: 201 });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { recipeId } = body;

    if (!recipeId) {
      return NextResponse.json(
        { error: 'Recipe ID is required' },
        { status: 400 }
      );
    }

    await prisma.userFavorite.delete({
      where: {
        userId_recipeId: {
          userId: user.id,
          recipeId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
