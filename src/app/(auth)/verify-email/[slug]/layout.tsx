import { Container, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

export default function VerificationEmailLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = useTranslations();
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            {t("VerifyEmailPage.title")}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {t("VerifyEmailPage.welcome")}
          </Typography>
          {children}
        </Paper>
      </Container>
    </>
  );
}
