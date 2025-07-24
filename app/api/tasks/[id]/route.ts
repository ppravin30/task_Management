import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/tasks/[id] - get a single task
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numId = Number(id);
    if (isNaN(numId)) {
      return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 });
    }
    
    const task = await prisma.task.findUnique({ where: { id: numId } });
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('Get task error:', error);
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 });
  }
}

// DELETE /api/tasks/[id] - delete a task
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numId = Number(id);
    if (isNaN(numId)) {
      return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 });
    }

    const existingTask = await prisma.task.findUnique({ where: { id: numId } });
    if (!existingTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    await prisma.task.delete({ where: { id: numId } });
    return NextResponse.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}

// PUT /api/tasks/[id] - update a task
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numId = Number(id);
    if (isNaN(numId)) {
      return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 });
    }

    const body = await request.json();
    const { name, dueDate, category } = body;
    
    if (!name || !dueDate || !category) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (name.trim().length === 0) {
      return NextResponse.json({ error: 'Task name cannot be empty' }, { status: 400 });
    }

    const parsedDate = new Date(dueDate);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json({ error: 'Invalid due date' }, { status: 400 });
    }

    const existingTask = await prisma.task.findUnique({ where: { id: numId } });
    if (!existingTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: numId },
      data: { 
        name: name.trim(), 
        dueDate: parsedDate, 
        category 
      },
    });
    
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Update task error:', error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}