"use client";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase-client";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useAuth } from "@/contexts/AuthContext";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";

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
    return (
      <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
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

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={loginWithEmail} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            required
            disabled={isLoading}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            name="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            required
            disabled={isLoading}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mb: 2 }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Login con Email"}
          </Button>
        </Box>
        <Button
          fullWidth
          variant="outlined"
          onClick={loginWithGoogle}
          disabled={isLoading}
          sx={{ mb: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Login con Google"}
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Paper>
    </Container>
  );
}