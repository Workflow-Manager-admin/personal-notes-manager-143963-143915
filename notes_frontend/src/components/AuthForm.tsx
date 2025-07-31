"use client";

import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

export type AuthMode = "login" | "register";

type Props = {
  mode: AuthMode;
  onSubmit: (data: { username?: string; email: string; password: string }) => Promise<string | null>;
};

export default function AuthForm({ mode, onSubmit }: Props) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  return (
    <form
      className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto"
      onSubmit={async e => {
        e.preventDefault();
        setError(null);
        setPending(true);
        const msg = await onSubmit(form);
        setPending(false);
        if (msg) setError(msg);
      }}
      aria-label={mode === "login" ? "Login form" : "Register form"}
    >
      <h2 className="text-xl font-bold text-center">{mode === "login" ? "Login" : "Create Account"}</h2>
      {mode === "register" && (
        <input
          type="text"
          className="border px-3 py-2 rounded"
          placeholder="Username"
          required
          value={form.username}
          onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
          aria-label="Username"
        />
      )}
      <input
        type="email"
        className="border px-3 py-2 rounded"
        placeholder="Email"
        required
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        aria-label="Email"
      />
      <input
        type="password"
        className="border px-3 py-2 rounded"
        placeholder="Password"
        required
        value={form.password}
        onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        aria-label="Password"
      />
      {error && <div className="rounded text-sm bg-red-100 p-2 text-red-600">{error}</div>}
      <button type="submit" className="mt-2 px-5 py-2 bg-primary text-white rounded hover:bg-primary/80 flex items-center justify-center gap-2" disabled={pending}>
        {pending ? <FaSpinner className="animate-spin" /> : (mode === "login" ? "Login" : "Register")}
      </button>
    </form>
  );
}
