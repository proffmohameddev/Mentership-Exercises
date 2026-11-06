"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TodoSearchProps {
  defaultValue?: string;
}

export default function TodoSearch({
  defaultValue = "",
}: TodoSearchProps) {
  const router = useRouter();

  const [query, setQuery] = useState(defaultValue);

  function handleSearch(value: string) {
    setQuery(value);

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      router.replace("/", { scroll: false });
      return;
    }

    router.replace(
      `/?q=${encodeURIComponent(trimmedValue)}`,
      { scroll: false }
    );
  }

  return (
    <div className="relative w-full sm:w-64">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

      <input
        type="text"
        value={query}
        onChange={(event) =>
          handleSearch(event.target.value)
        }
        placeholder="Search todos..."
        className="h-9 w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-9 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-zinc-600"
      />

      {query && (
        <button
          type="button"
          onClick={() => handleSearch("")}
          className="absolute right-1.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}