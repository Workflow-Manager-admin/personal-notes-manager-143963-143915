"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full flex items-center px-6 py-3 shadow bg-white border-b sticky top-0 z-10">
      <nav className="flex-1 flex gap-4 items-center">
        <Link href="/" className="text-lg font-bold tracking-tight" style={{color: "var(--color-primary)"}}>
          NotesApp
        </Link>
        {user && (
          <>
            <Link
              href="/"
              className="text-sm hover:underline text-gray-700"
            >
              My Notes
            </Link>
            <Link
              href="/categories"
              className="text-sm hover:underline text-gray-700"
            >
              Categories
            </Link>
          </>
        )}
      </nav>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:inline-block">
              Hi, {user.username}
            </span>
            <button
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/login" className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded">
              Login
            </Link>
            <Link href="/register" className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 text-black rounded">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
