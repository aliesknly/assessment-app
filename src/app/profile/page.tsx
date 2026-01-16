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
import { useTranslations } from "next-intl";

export default function Profile() {
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
            {t("ProfilePage.title")}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 2 }}
              alt={user?.displayName || user?.email || "Usuario"}
              src={user?.photoURL || undefined}
            >
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {user?.displayName || t("ProfilePage.userFullName")}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Email sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      {t("ProfilePage.contactInfo")}
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    <strong>{t("Common.email")}:</strong> {user?.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("ProfilePage.verified")}:{" "}
                    {user?.emailVerified
                      ? t("Common.verified")
                      : t("Common.notVerified")}
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t("ProfilePage.account")}
                  </Typography>
                  <Typography variant="body1">
                    <strong>{t("ProfilePage.userId")}:</strong> {user?.uid}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("ProfilePage.provider")}:{" "}
                    {user?.providerData[0]?.providerId ||
                      t("ProfilePage.unknown")}
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
              {t("Common.logout")}
            </Button>
          </Box>
        </Paper>
      </Container>
    </AuthGuard>
  );
}
