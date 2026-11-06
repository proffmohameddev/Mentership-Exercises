"use client";

import { useRouter, useSearchParams } from "next/navigation";

const filters = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "low",
    label: "Low",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "high",
    label: "High",
  },
];

export default function TodoFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentFilter =
    searchParams.get("priority") ?? "all";

  function handleFilter(value: string) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value === "all") {
      params.delete("priority");
    } else {
      params.set("priority", value);
    }

    const query = params.toString();

    router.replace(
      query ? `/?${query}` : "/",
      { scroll: false }
    );
  }

  return (
    <div className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-zinc-900">
      {filters.map((filter) => {
        const active =
          currentFilter === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => handleFilter(filter.value)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              active
                ? "bg-white text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}