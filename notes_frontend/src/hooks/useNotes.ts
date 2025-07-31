"use client";

import { useCallback, useEffect, useState } from "react";
import { Note } from "@/app/types";
import { apiRequest } from "@/app/api";

export function useNotes(userId: string | null) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all notes for user
  const fetchNotes = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const data: Note[] = await apiRequest(`/notes?userId=${encodeURIComponent(userId)}`);
      setNotes(data);
    } catch (e) {
      if (typeof e === "object" && e !== null && "message" in e) {
        setError((e as { message: string }).message || "Failed to load notes.");
      } else {
        setError("Failed to load notes.");
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // PUBLIC_INTERFACE
  const createNote = useCallback(
    async (payload: Partial<Note>): Promise<Note> => {
      const note: Note = await apiRequest(`/notes`, {
        method: "POST",
        body: JSON.stringify({ ...payload, userId }),
      });
      setNotes((n) => [note, ...n]);
      return note;
    },
    [userId]
  );

  // PUBLIC_INTERFACE
  const updateNote = useCallback(
    async (id: string, payload: Partial<Note>): Promise<Note> => {
      const note: Note = await apiRequest(`/notes/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      setNotes((n) => n.map((n_) => (n_.id === id ? note : n_)));
      return note;
    },
    []
  );

  // PUBLIC_INTERFACE
  const deleteNote = useCallback(
    async (id: string): Promise<boolean> => {
      await apiRequest(`/notes/${id}`, { method: "DELETE" });
      setNotes((n) => n.filter((n_) => n_.id !== id));
      return true;
    },
    []
  );

  useEffect(() => {
    fetchNotes();
    // Note: don’t include fetchNotes directly in deps to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return { notes, fetchNotes, createNote, updateNote, deleteNote, loading, error, setNotes };
}
