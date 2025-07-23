import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const { task, dueDate, category } = body;

  if (!task || !dueDate || !category) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const newTask = await prisma.task.create({
    data: {
      name: task,
      dueDate: new Date(dueDate),
      category,
    },
  });

  return NextResponse.json(newTask, { status: 201 });
}

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { id: 'desc' }
  });
  return NextResponse.json(tasks);
}