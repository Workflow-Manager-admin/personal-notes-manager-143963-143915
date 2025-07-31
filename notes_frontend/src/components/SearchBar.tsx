"use client";

import { useState } from "react";

type Props = {
  value?: string;
  onChange: (q: string) => void;
};

export default function SearchBar({ value = "", onChange }: Props) {
  const [q, setQ] = useState(value);

  return (
    <form
      className="relative flex items-center w-full"
      onSubmit={e => { e.preventDefault(); onChange(q); }}
      role="search"
      aria-label="Search notes"
    >
      <input
        type="text"
        className="rounded border border-gray-300 px-3 py-2 w-full focus:outline-primary"
        placeholder="Search notes..."
        value={q}
        onChange={e => {
          setQ(e.target.value);
          if (e.target.value === "") onChange("");
        }}
        aria-label="Note search"
      />
      {q.length > 0 && (
        <button
          type="button"
          className="absolute right-3 text-gray-400"
          aria-label="Clear search"
          onClick={() => { setQ(""); onChange(""); }}
        >
          ×
        </button>
      )}
    </form>
  );
}
