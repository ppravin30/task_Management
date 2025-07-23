import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { task, dueDate, category } = body;

    if (!task || !dueDate || !category) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (task.trim().length === 0) {
      return NextResponse.json({ error: 'Task name cannot be empty' }, { status: 400 });
    }

    const parsedDate = new Date(dueDate);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json({ error: 'Invalid due date' }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: {
        name: task.trim(),
        dueDate: parsedDate,
        category,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Create task error:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { id: 'desc' }
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}