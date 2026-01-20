"use client";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/client";
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
  Divider,
} from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LinkMaterial from "@/components/navigation/LinkMaterial";
import Link from "next/link";

interface FormState {
  email: string;
  password: string;
}

export default function Login() {
  const t = useTranslations();
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
        setError(t("Common.error"));
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
        setError(t("Common.error"));
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {t("LoginPage.title")}
        </Typography>
        <Box component="form" onSubmit={loginWithEmail} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label={t("Common.email")}
            type="email"
            name="email"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
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
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
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
              t("LoginPage.loginWithEmail")
            )}
          </Button>
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        <Box sx={{ mt: 2 }}>
          <Divider sx={{ mb: 2 }}>{t("Common.or")}</Divider>
          <Button
            fullWidth
            variant="outlined"
            onClick={loginWithGoogle}
            disabled={isLoading}
            sx={{ mb: 2 }}
            startIcon={
              <Image
                src="/500px-google.png"
                width={16}
                height={16}
                alt="google icon"
              />
            }
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              t("LoginPage.loginWithGoogle")
            )}
          </Button>
          <Typography variant="body2" color="textSecondary" align="center">
            {t("LoginPage.registerQuestion")}{" "}
            <LinkMaterial component={Link} href="/register">
              {t("LoginPage.registerLink")}
            </LinkMaterial>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
