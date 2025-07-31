"use client";

import { CategoryCounts } from "@/app/types";

type Props = {
  categories: CategoryCounts;
  current: string;
  setCategory: (category: string) => void;
};

export default function Sidebar({ categories, current, setCategory }: Props) {
  return (
    <aside className="w-full sm:w-48 bg-secondary/30 p-4 rounded-lg flex flex-col gap-2 shadow-sm mb-4 sm:mb-0">
      <h3 className="mb-2 font-semibold text-gray-800">Categories</h3>
      <button
        className={`py-2 text-left rounded px-3 ${!current ? "bg-primary/30 font-bold text-primary" : "hover:bg-primary/10"}`}
        onClick={() => setCategory("")}
      >
        All Notes <span className="text-xs text-gray-500">({Object.values(categories).reduce((a, b) => a + b, 0)})</span>
      </button>
      {Object.keys(categories).map((cat) => (
        <button
          key={cat}
          className={`py-2 text-left rounded px-3 ${current === cat ? "bg-accent/30 font-bold text-accent" : "hover:bg-accent/10"}`}
          onClick={() => setCategory(cat)}
        >
          {cat} <span className="text-xs text-gray-500">({categories[cat]})</span>
        </button>
      ))}
    </aside>
  );
}
