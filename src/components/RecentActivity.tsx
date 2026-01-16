"use client";

import { Card, CardContent, Typography, Box } from "@mui/material";
import { Assignment as ActivityIcon } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { ActivityItem } from "@/types";

interface RecentActivityProps {
  activity: ActivityItem;
}

export default function RecentActivity({ activity }: RecentActivityProps) {
  const t = useTranslations();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "success.main";
      case "in_review": return "warning.main";
      case "pending": return "info.main";
      default: return "text.secondary";
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardContent sx={{ p: 2, flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ActivityIcon sx={{ fontSize: 32, color: getStatusColor(activity.status) }} />
          <Box>
            <Typography variant="h6" component="h2">
              {activity.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("dashboard.activity.date")}: {activity.date}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {t("dashboard.activity.status", { status: activity.status })}
        </Typography>
      </CardContent>
    </Card>
  );
}