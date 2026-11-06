"use client";

import { useRouter, useSearchParams } from "next/navigation";

const options = [
  {
    value: "newest",
    label: "Newest",
  },
  {
    value: "oldest",
    label: "Oldest",
  },
  {
    value: "priority",
    label: "Priority",
  },
];

export default function TodoSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort =
    searchParams.get("sort") ?? "newest";

  function handleSort(value: string) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    const query = params.toString();

    router.replace(
      query ? `/?${query}` : "/",
      { scroll: false }
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-zinc-400 dark:text-zinc-500">
        Sort
      </span>

      <select
        value={currentSort}
        onChange={(event) =>
          handleSort(event.target.value)
        }
        className="h-8 rounded-lg border border-zinc-200 bg-white px-2.5 text-xs font-medium text-zinc-700 outline-none transition focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:focus:border-zinc-600"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}