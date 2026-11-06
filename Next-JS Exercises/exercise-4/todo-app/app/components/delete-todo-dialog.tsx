"use client";

import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteTodo } from "../actions/delete";

interface DeleteTodoDialogProps {
  todoId: string;
  todoTitle: string;
}

export default function DeleteTodoDialog({
  todoId,
  todoTitle,
}: DeleteTodoDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        type="button"
        title="Delete todo"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-red-600 dark:hover:bg-zinc-800 dark:hover:text-red-400"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </AlertDialogTrigger>

      <AlertDialogContent className="border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-zinc-950 dark:text-white">
            Delete todo?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-zinc-500 dark:text-zinc-400">
            Are you sure you want to delete{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-200">
              “{todoTitle}”
            </span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">
            Cancel
          </AlertDialogCancel>

          <form action={deleteTodo.bind(null, todoId)}>
            <AlertDialogAction
              type="submit"
              className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}