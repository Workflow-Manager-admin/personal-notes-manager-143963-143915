"use client";

import { Note } from "@/app/types";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

type Props = {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  onSelect: (note: Note) => void;
  activeNoteId?: string;
};

export default function NoteList({ notes, onEdit, onDelete, onSelect, activeNoteId }: Props) {
  if (notes.length === 0) return <p className="text-gray-400 px-4 py-12 text-center">No notes found.</p>;
  return (
    <ul className="flex flex-col gap-2">
      {notes.map((note) => (
        <li
          key={note.id}
          className={`flex items-center p-3 bg-white rounded shadow-sm border hover:border-primary cursor-pointer transition min-h-[66px] ${note.id === activeNoteId ? "border-primary" : ""}`}
          tabIndex={0}
          aria-current={note.id === activeNoteId}
          onClick={() => onSelect(note)}
          onKeyPress={(e) => {
            if (e.key === "Enter") onSelect(note);
          }}
        >
          <div className="flex-1">
            <div className="font-semibold text-lg truncate">{note.title}</div>
            <div className="text-xs text-gray-500 truncate">{note.content.slice(0, 80)}{note.content.length > 80 && "..."}</div>
            <div className="text-xs text-gray-400">{new Date(note.updatedAt).toLocaleString()}</div>
          </div>
          <div className="flex gap-2 ml-2 items-center">
            <button
              type="button"
              title="Edit"
              onClick={e => { e.stopPropagation(); onEdit(note); }}
              className="p-2 rounded hover:bg-blue-100 focus:bg-blue-200"
            >
              <FaEdit className="text-blue-600"/>
            </button>
            <button
              type="button"
              title="Delete"
              onClick={e => { e.stopPropagation(); onDelete(note); }}
              className="p-2 rounded hover:bg-red-100 focus:bg-red-200"
            >
              <FaTrashAlt className="text-red-600"/>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
