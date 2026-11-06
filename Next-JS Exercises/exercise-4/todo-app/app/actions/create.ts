"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTodo } from "../lib/todos";
import { TodoPriority } from "../types/todo";

type State = {
  error?: string;
};

export async function createTodoAction(
  prevState: State | null,
  formData: FormData
): Promise<State | null> {
  const title = formData.get("title");
  const priority = formData.get("priority");

  if (typeof title !== "string") {
    return { error: "Invalid title." };
  }

  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    return { error: "Please enter a todo title." };
  }

  if (trimmedTitle.length > 200) {
    return { error: "Todo title must be less than 200 characters." };
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
    return { error: "Please select a valid priority." };
  }

  const todoId = await createTodo({
    title: trimmedTitle,
    priority: priority as TodoPriority,
  });

  if (!todoId) {
    return { error: "Something went wrong. Please try again." };
  }

  revalidatePath("/");
  redirect("/?created=1");
}