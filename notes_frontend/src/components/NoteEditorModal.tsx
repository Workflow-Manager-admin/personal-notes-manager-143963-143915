"use client";

import { useEffect, useRef, useState } from "react";
import { Note } from "@/app/types";

type Props = {
  open: boolean;
  note?: Note | null;
  onSave: (note: Partial<Note>) => void;
  onClose: () => void;
};

export default function NoteEditorModal({ open, note, onSave, onClose }: Props) {
  const [form, setForm] = useState<Partial<Note>>({ title: "", content: "", category: "" });
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (open) {
      setForm(note ? { ...note } : { title: "", content: "", category: "" });
      dialogRef.current?.showModal?.();
    } else {
      dialogRef.current?.close?.();
    }
  }, [open, note]);

  // Close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <dialog ref={dialogRef} className="w-full max-w-md p-0 rounded-lg shadow-lg border bg-white">
      <form
        method="dialog"
        className="flex flex-col gap-3 p-6"
        onSubmit={e => {
          e.preventDefault();
          // Minimal fields check
          if ((form.title || "").trim()) {
            onSave({ ...form });
          }
        }}
      >
        <h2 className="text-lg font-bold mb-2">{note?.id ? "Edit Note" : "New Note"}</h2>
        <input
          type="text"
          className="border px-3 py-2 rounded"
          placeholder="Title"
          value={form.title || ""}
          autoFocus
          aria-label="Note title"
          required
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
        />
        <textarea
          className="border px-3 py-2 rounded min-h-[90px]"
          placeholder="Content..."
          aria-label="Note content"
          value={form.content || ""}
          required
          onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
        />
        <input
          type="text"
          className="border px-3 py-2 rounded"
          placeholder="Category (optional)"
          value={form.category || ""}
          aria-label="Note category"
          onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
        />
        <div className="flex gap-3 mt-4 justify-between">
          <button
            type="submit"
            className="px-5 py-2 bg-primary text-white rounded hover:bg-primary/80 flex-1"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
}
