"use client";

import { Card, CardContent, Typography, Box } from "@mui/material";
import { Assessment as AssessmentIcon } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { Assessment } from "@/types";

interface AssessmentCardProps {
  assessment: Assessment;
}

export default function AssessmentCard({ assessment }: AssessmentCardProps) {
  const t = useTranslations();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent sx={{ p: 2, flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <AssessmentIcon sx={{ fontSize: 48, color: "primary.main", mr: 2 }} />
          <Box>
            <Typography variant="h6" component="h2">
              {assessment?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {assessment?.description}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: "auto", display: "flex", gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {t("Assessments.date")}: {assessment?.dueDate}
          </Typography>
          <Typography variant="body2" color="primary.main">
            {t("Assessments.status", { status: assessment?.status })}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
