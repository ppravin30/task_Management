// lib/auth/getCurrentUser.ts
'use server';

import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });

  return user;
}
