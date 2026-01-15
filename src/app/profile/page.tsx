"use client";

import { useAuth } from "@/contexts/AuthContext";
import AuthGuard from "@/components/AuthGuard";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import { Email, Logout } from "@mui/icons-material";

export default function Profile() {
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
            Mi Perfil
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
            <Avatar
              sx={{ width: 100, height: 100, mb: 2 }}
              alt={user?.displayName || user?.email || "Usuario"}
              src={user?.photoURL || undefined}
            >
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {user?.displayName || "Usuario"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Email sx={{ mr: 1 }} />
                    <Typography variant="h6">Información de Contacto</Typography>
                  </Box>
                  <Typography variant="body1">
                    <strong>Email:</strong> {user?.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Verificado: {user?.emailVerified ? "Sí" : "No"}
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Cuenta
                  </Typography>
                  <Typography variant="body1">
                    <strong>ID de Usuario:</strong> {user?.uid}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Proveedor: {user?.providerData[0]?.providerId || "Desconocido"}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Logout />}
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