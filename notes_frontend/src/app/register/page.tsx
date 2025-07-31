"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function RegisterPage() {
  const { user, register } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/");
  }, [user, router]);

  // PUBLIC_INTERFACE
  async function handleRegister({
    username,
    email,
    password,
  }: {
    username?: string;
    email: string;
    password: string;
  }) {
    // username can be undefined, provide empty string as fallback
    return await register((username ?? "").trim(), email.trim(), password);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <AuthForm mode="register" onSubmit={handleRegister} />
    </main>
  );
}
