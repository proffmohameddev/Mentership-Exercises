// types/taskflow.ts
import type { TaskStatus } from '@prisma/client';

export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  order: number;
  dayId: string;
  userId: string;
};

export type Day = {
  id: string;
  title: string;
  order: number;
  tasks: Task[];
};
