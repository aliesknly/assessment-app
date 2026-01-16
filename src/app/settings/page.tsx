"use client";

import { Box, Typography, Container, Paper } from "@mui/material";
import { Build } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import AuthGuard from "@/components/AuthGuard";

export default function SettingsPage() {
  const t = useTranslations();

  return (
    <AuthGuard>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            {t("Common.settings")}
          </Typography>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Paper elevation={3} sx={{ p: 4, maxWidth: 400 }}>
              <Build sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
              <Typography variant="h6">{t("Settings.comingSoon")}</Typography>
              <Typography variant="body2" color="text.secondary">
                {t("Settings.workInProgress")}
              </Typography>
            </Paper>
          </Box>
        </Paper>
      </Container>
    </AuthGuard>
  );
}
