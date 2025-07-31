"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/");
  }, [user, router]);

  // PUBLIC_INTERFACE
  async function handleLogin({ email, password }: { email: string; password: string }) {
    return await login(email.trim(), password);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <AuthForm mode="login" onSubmit={handleLogin} />
    </main>
  );
}
