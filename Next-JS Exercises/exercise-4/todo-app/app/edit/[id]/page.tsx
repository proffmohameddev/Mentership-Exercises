import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  CircleAlert,
} from "lucide-react";

import { fetchTodoById } from "../../lib/todos";
import { updateTodoAction } from "../../actions/update";

interface EditTodoPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTodoPage({
  params,
}: EditTodoPageProps) {
  const { id } = await params;

  const todo = await fetchTodoById(id);

  if (!todo) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 lg:py-12">

        {/* Back */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Todos
        </Link>

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            Edit todo
          </h1>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Update your task.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <form
            action={updateTodoAction}
            className="p-5 sm:p-6"
          >
            <input
              type="hidden"
              name="id"
              value={todo._id}
            />

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Todo title
              </label>

              <input
                type="text"
                id="title"
                name="title"
                defaultValue={todo.title}
                placeholder="What do you need to get done?"
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
                required
                maxLength={200}
                autoFocus
              />
            </div>

            {/* Priority */}
            <fieldset className="mt-7">
              <legend className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Priority
              </legend>

              <div className="grid grid-cols-3 gap-2.5">

                {/* Low */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value="low"
                    defaultChecked={todo.priority === "low"}
                    className="peer sr-only"
                  />

                  <div className="rounded-xl border border-zinc-200 p-3 transition hover:bg-zinc-50 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50 dark:peer-checked:border-emerald-500 dark:peer-checked:bg-emerald-950/20">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />

                      <span className="text-sm font-medium text-zinc-900 dark:text-white">
                        Low
                      </span>
                    </div>
                  </div>
                </label>

                {/* Medium */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value="medium"
                    defaultChecked={todo.priority === "medium"}
                    className="peer sr-only"
                  />

                  <div className="rounded-xl border border-zinc-200 p-3 transition hover:bg-zinc-50 peer-checked:border-amber-500 peer-checked:bg-amber-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50 dark:peer-checked:border-amber-500 dark:peer-checked:bg-amber-950/20">
                    <div className="flex items-center gap-2">
                      <CircleAlert className="h-4 w-4 text-amber-500" />

                      <span className="text-sm font-medium text-zinc-900 dark:text-white">
                        Medium
                      </span>
                    </div>
                  </div>
                </label>

                {/* High */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value="high"
                    defaultChecked={todo.priority === "high"}
                    className="peer sr-only"
                  />

                  <div className="rounded-xl border border-zinc-200 p-3 transition hover:bg-zinc-50 peer-checked:border-red-500 peer-checked:bg-red-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50 dark:peer-checked:border-red-500 dark:peer-checked:bg-red-950/20">
                    <div className="flex items-center gap-2">
                      <CircleAlert className="h-4 w-4 text-red-500" />

                      <span className="text-sm font-medium text-zinc-900 dark:text-white">
                        High
                      </span>
                    </div>
                  </div>
                </label>

              </div>
            </fieldset>

            {/* Status */}
            <div className="mt-7">
              <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Status
              </p>

              <div className="flex items-center gap-3 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                {todo.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                ) : (
                  <Circle className="h-5 w-5 text-zinc-400" />
                )}

                <span className="text-sm text-zinc-600 dark:text-zinc-300">
                  {todo.completed ? "Completed" : "In progress"}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-7 flex gap-3">
              <Link
                href="/"
                className="flex-1 rounded-xl border border-zinc-200 px-4 py-2.5 text-center text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="flex-1 rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}