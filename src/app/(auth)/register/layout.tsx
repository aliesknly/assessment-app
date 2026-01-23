import LinkMaterial from "@/components/navigation/LinkMaterial";
import { Container, Divider, Link, Paper, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

interface RegisterLayoutProps {
  children: ReactNode;
}
export default function RegisterLayout({ children }: RegisterLayoutProps) {
  const t = useTranslations();
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {t("RegisterPage.title")}
        </Typography>
        {children}
        <Divider sx={{ mb: 2, mt: 2 }}>{t("Common.or")}</Divider>
        <Typography variant="body2" color="textSecondary" align="center">
          {t("RegisterPage.loginQuestion")}{" "}
          <LinkMaterial component={Link} href="/login">
            {t("RegisterPage.loginLink")}
          </LinkMaterial>
        </Typography>
      </Paper>
    </Container>
  );
}
