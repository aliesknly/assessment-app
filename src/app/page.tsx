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

export default function Home() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthGuard>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Bienvenido a la Assessment App
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 4 }}>
            Hola, {user?.email}!
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              size="large"
            >
              Cerrar Sesión
            </Button>
          </Box>
        </Paper>
      </Container>
    </AuthGuard>
  );
}
