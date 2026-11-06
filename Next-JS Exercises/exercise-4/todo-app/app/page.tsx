import { fetchTodos } from "./lib/todos";
import { toggleTodo } from "./actions/toggle";
import DeleteTodoDialog from "./components/delete-todo-dialog";
import TodoSearch from "./components/todo-search";
import TodoFilter from "./components/todo-filter";
import TodoSort from "./components/todo-sort";
import RelativeTime from "./components/relative-time";


import Link from "next/link";
import { Check, Circle, Pencil, Plus } from "lucide-react";

import ThemeToggle from "./components/theme-toggle";

interface HomeProps {
  searchParams: Promise<{
    q?: string;
    priority?: string;
    sort?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const todos = await fetchTodos();


  // Search + Filter + Sort

  const { q, priority, sort } = await searchParams;

  const searchQuery = q?.trim().toLowerCase() ?? "";

  const filteredTodos = todos
    .filter((todo) => {
      const matchesSearch = todo.title.toLowerCase().includes(searchQuery);

      const matchesPriority =
        !priority || priority === "all" || todo.priority === priority;

      return matchesSearch && matchesPriority;
    })
    .sort((a, b) => {
      if (sort === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }

      if (sort === "priority") {
        const priorityOrder = {
          high: 0,
          medium: 1,
          low: 2,
        };

        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  // Completed Todos
  const completedTodos = todos.filter((todo) => todo.completed).length;

  const remainingTodos = todos.length - completedTodos;

  const priorityStyles = {
    low: {
      label: "Low",
      className: "text-emerald-600 dark:text-emerald-400",
    },
    medium: {
      label: "Medium",
      className: "text-amber-600 dark:text-amber-400",
    },
    high: {
      label: "High",
      className: "text-red-600 dark:text-red-400",
    },
  };

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Header */}
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
              Todos
            </h1>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Stay organized and get things done.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Link
              href="/new"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              <Plus className="h-4 w-4" />

              <span className="hidden sm:inline">New Todo</span>

              <span className="sm:hidden">New</span>
            </Link>
          </div>
        </header>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-3 border-y border-zinc-200 dark:border-zinc-800">
          <div className="px-3 py-4 sm:px-5">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Total</p>

            <p className="mt-1 text-xl font-semibold text-zinc-950 dark:text-white">
              {todos.length}
            </p>
          </div>

          <div className="border-x border-zinc-200 px-3 py-4 dark:border-zinc-800 sm:px-5">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Completed
            </p>

            <p className="mt-1 text-xl font-semibold text-zinc-950 dark:text-white">
              {completedTodos}
            </p>
          </div>

          <div className="px-3 py-4 sm:px-5">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Remaining
            </p>

            <p className="mt-1 text-xl font-semibold text-zinc-950 dark:text-white">
              {remainingTodos}
            </p>
          </div>
        </div>

        {/* Section heading + Search */}
        <div className="mb-6 flex flex-col gap-4">
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
      All todos
    </h2>

    <div className="flex w-full items-center gap-2 sm:w-auto">
      <div className="min-w-0 flex-1 sm:w-64 sm:flex-none">
        <TodoSearch defaultValue={q ?? ""} />
      </div>

      <TodoSort />
    </div>
  </div>

  <TodoFilter />
</div>

        {/* Empty state */}
        {todos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-700">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No todos yet.
            </p>

            <Link
              href="/new"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-900 hover:underline dark:text-white"
            >
              <Plus className="h-4 w-4" />
              Create your first todo
            </Link>
          </div>
        ) : filteredTodos.length === 0 ? (
          /* No search results */
          <div className="rounded-2xl border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-700">
            <p className="text-sm font-medium text-zinc-900 dark:text-white">
              No todos found
            </p>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Try searching with a different title.
            </p>
          </div>
        ) : (
          /* Todo grid */
          <div className="grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-3">
            {filteredTodos.map((todo) => {
              const priority =
                priorityStyles[todo.priority] ?? priorityStyles.medium;

              return (
                <article
                  key={todo._id}
                  className="group flex min-h-[160px] flex-col rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 sm:p-5"
                >
                  {/* Top */}
                  <div className="flex items-start justify-between gap-2">
                    <form action={toggleTodo.bind(null, todo._id)}>
                      <button
                        type="submit"
                        title={
                          todo.completed
                            ? "Mark as incomplete"
                            : "Mark as complete"
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                      >
                        {todo.completed ? (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                            <Check className="h-3 w-3" />
                          </span>
                        ) : (
                          <Circle className="h-5 w-5" />
                        )}
                      </button>
                    </form>

                    <div className="flex items-center opacity-60 transition group-hover:opacity-100">
                      <Link
                        href={`/edit/${todo._id}`}
                        title="Edit"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>

                      <DeleteTodoDialog
                        todoId={todo._id}
                        todoTitle={todo.title}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-4 flex-1">
                    <h3
                      className={`line-clamp-2 text-sm font-medium leading-5 sm:text-[15px] ${
                        todo.completed
                          ? "text-zinc-400 line-through dark:text-zinc-500"
                          : "text-zinc-900 dark:text-zinc-100"
                      }`}
                    >
                      {todo.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <span className={`font-medium ${priority.className}`}>
                        {priority.label}
                      </span>

                      <span className="text-zinc-300 dark:text-zinc-700">
                        /
                      </span>

                      <span className="text-zinc-400 dark:text-zinc-500">
                        {todo.completed ? "Done" : "In progress"}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
                    <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
  <RelativeTime date={todo.createdAt} />
</span>

                    <Link
                      href={`/edit/${todo._id}`}
                      className="text-[11px] font-medium text-zinc-400 transition hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white"
                    >
                      Open
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
