"use client";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase/client";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Container,
} from "@mui/material";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface RegisterFormState {
  email: string;
  password: string;
}

export default function RegisterForm() {
  const t = useTranslations();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [form, setForm] = useState<RegisterFormState>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  // Show loading while checking auth state
  if (loading) {
    return (
      <Container
        maxWidth="sm"
        sx={{ display: "flex", justifyContent: "center", mt: 4 }}
      >
        <CircularProgress />
      </Container>
    );
  }

  // Don't render login if already logged in
  if (user) {
    return null;
  }

  async function registerWithEmail(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      router.push("/");
    } catch (err: FirebaseError | unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError(t("Common.error"));
      }
    } finally {
      setIsLoading(false);
    }
  }
  function handleForm(e: ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <>
      <Box component="form" onSubmit={registerWithEmail} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label={t("Common.email")}
          type="email"
          name="email"
          value={form.email}
          onChange={handleForm}
          required
          disabled={isLoading}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label={t("Common.password")}
          type="password"
          name="password"
          value={form.password}
          onChange={handleForm}
          required
          disabled={isLoading}
          sx={{ mb: 3 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            t("RegisterPage.registerWithEmail")
          )}
        </Button>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
    </>
  );
}
