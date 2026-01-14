"use client";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase-client";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useAuth } from "@/contexts/AuthContext";

interface FormState {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  // Show loading while checking auth state
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Don't render login if already logged in
  if (user) {
    return null;
  }

  async function loginWithEmail(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      // Auth state will be updated automatically by the context
      router.push("/");
    } catch (err: FirebaseError | unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function loginWithGoogle() {
    setIsLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err: FirebaseError | unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleForm({ target }: ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginWithEmail}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={form.email}
          onChange={handleForm}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          name="password"
          placeholder="contraseña"
          value={form.password}
          onChange={handleForm}
          required
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Cargando..." : "Login con Email"}
        </button>
      </form>
      <button onClick={loginWithGoogle} disabled={isLoading}>
        {isLoading ? "Cargando..." : "Login con Google"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}