"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { updateTodo } from "../lib/todos";
import { TodoPriority } from "../types/todo";

export async function updateTodoAction(formData: FormData) {
  const id = formData.get("id");
  const title = formData.get("title");
  const priority = formData.get("priority");

  if (typeof id !== "string" || !id) {
    return;
  }

  if (typeof title !== "string") {
    return;
  }

  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    return;
  }

  if (trimmedTitle.length > 200) {
    return;
  }

  const validPriorities: TodoPriority[] = [
    "low",
    "medium",
    "high",
  ];

  if (
    typeof priority !== "string" ||
    !validPriorities.includes(priority as TodoPriority)
  ) {
    return;
  }

  const updated = await updateTodo(id, {
    title: trimmedTitle,
    priority: priority as TodoPriority,
  });

  if (!updated) {
    return;
  }

  revalidatePath("/");
  revalidatePath(`/edit/${id}`);

  redirect("/");
}