"use client";

import { useAuth } from "@/contexts/AuthContext";
import AuthGuard from "@/components/AuthGuard";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Person, Logout } from "@mui/icons-material";
import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error closing session:", error);
    }
  };

  return (
    <AuthGuard>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            {t('HomePage.title')}
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 4 }}>
            {t('HomePage.subtitle', { email: user?.email || '' })}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Person />}
              component={Link}
              href="/profile"
              size="large"
            >
              {t('HomePage.viewProfile')}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Logout />}
              onClick={handleLogout}
              size="large"
            >
              {t('Common.logout')}
            </Button>
          </Box>
        </Paper>
      </Container>
    </AuthGuard>
  );
}
