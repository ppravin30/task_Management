import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/tasks/[id] - get a single task
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
  return NextResponse.json(task);
}

// DELETE /api/tasks/[id] - delete a task
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }
  await prisma.task.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

// PUT /api/tasks/[id] - update a task (optional)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const body = await request.json();
  const { name, dueDate, category } = body;
  if (!name || !dueDate || !category) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const updatedTask = await prisma.task.update({
    where: { id },
    data: { name, dueDate: new Date(dueDate), category },
  });
  return NextResponse.json(updatedTask);
}
