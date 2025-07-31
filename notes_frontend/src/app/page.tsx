"use client";
import { useState, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNotes } from "@/hooks/useNotes";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import NoteList from "@/components/NoteList";
import NoteEditorModal from "@/components/NoteEditorModal";
import Link from "next/link";
import { Note } from "@/app/types";

export default function HomePage() {
  const { user, loading: loadingUser } = useAuth();
  const { notes, createNote, updateNote, deleteNote, fetchNotes } = useNotes(user?.id || null);

  // UI state
  const [searchQ, setSearchQ] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    notes.forEach(n => {
      const cat = n.category?.trim() || "Uncategorized";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [notes]);

  // Filtered notes
  const filteredNotes = useMemo(() => {
    let n = notes;
    if (category) {
      n = n.filter((note) => (note.category || "Uncategorized") === category);
    }
    if (searchQ) {
      n = n.filter(note =>
        note.title.toLowerCase().includes(searchQ.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQ.toLowerCase())
      );
    }
    return n;
  }, [notes, category, searchQ]);

  // App is loading or user not logged in
  if (loadingUser) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-6">
        <Header />
        <div className="flex flex-col items-center gap-4 p-8 rounded shadow-md bg-white max-w-md mt-20">
          <h2 className="text-2xl font-bold mb-4">Welcome to NotesApp!</h2>
          <div className="flex gap-4">
            <Link href="/login" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
              Login
            </Link>
            <Link href="/register" className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded">
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Handlers
  function onEdit(note: Note) {
    setSelectedNote(note);
    setModalOpen(true);
  }
  function onDelete(note: Note) {
    if (window.confirm("Delete this note?")) {
      deleteNote(note.id);
      if (selectedNote?.id === note.id) setSelectedNote(null);
    }
  }
  function onSelect(note: Note) {
    setSelectedNote(note);
    setModalOpen(false); // Just select for now
  }
  function onNewNote() {
    setSelectedNote(null);
    setModalOpen(true);
  }
  async function handleSaveNote(note: Partial<Note>) {
    if (note.id) {
      await updateNote(note.id, note);
    } else {
      await createNote(note);
    }
    setModalOpen(false);
    fetchNotes();
  }

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <div className="flex flex-col sm:flex-row max-w-6xl mx-auto px-2 py-6 gap-6">
        <div className="flex-[0_0_220px] w-full sm:w-56">
          <Sidebar categories={categoryCounts} current={category} setCategory={setCategory} />
          <button onClick={onNewNote} className="mt-4 px-4 py-2 w-full bg-accent text-black rounded font-bold hover:bg-primary/10 transition">
            + New Note
          </button>
        </div>
        <main className="flex-1 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3 mb-2">
            <SearchBar value={searchQ} onChange={setSearchQ} />
          </div>
          <NoteList
            notes={filteredNotes}
            onEdit={onEdit}
            onDelete={onDelete}
            onSelect={onSelect}
            activeNoteId={selectedNote?.id}
          />
        </main>
      </div>
      <NoteEditorModal open={modalOpen} note={selectedNote} onSave={handleSaveNote} onClose={() => setModalOpen(false)} />
    </div>
  );
}
