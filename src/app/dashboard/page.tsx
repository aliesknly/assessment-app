"use client";
import { useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import { ActivityItem, Stats } from "@/types";
import AssessmentCard from "@/components/AssessmentCard";
import StatsCard from "@/components/StatsCard";
import { useAuth } from "@/contexts/AuthContext";
import AuthGuard from "@/components/AuthGuard";

const mockActivity: ActivityItem[] = [
  {
    id: "1",
    title: "JavaScript Assessment",
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: "2",
    title: "React Programming Test",
    date: "2024-01-14",
    status: "reviewed",
  },
  {
    id: "3",
    title: "CSS Assessment",
    date: "2024-01-13",
    status: "pending",
  },
];

export default function Dashboard() {
  const t = useTranslations();
  const { user } = useAuth();
  const [recentActivity] = useState<Array<ActivityItem>>(mockActivity);
  const [stats] = useState<Stats>({
    totalAssessments: 12,
    completed: 8,
    inProgress: 3,
    averageScore: 85,
  });

  return (
    <AuthGuard>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t("Dashboard.welcome")}, {user?.displayName || user?.email}
        </Typography>

        <Grid container spacing={3}>
          {/* Stats Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title={t("Dashboard.totalAssessments")}
              value={stats.totalAssessments}
              color="primary"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title={t("Dashboard.completed")}
              value={stats.completed}
              color="success"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title={t("Dashboard.inProgress")}
              value={stats.inProgress}
              color="warning"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title={t("Dashboard.averageScore")}
              value={`${stats.averageScore}%`}
              color="info"
            />
          </Grid>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t("Dashboard.recentActivity")}
          </Typography>

          {recentActivity.map((activity) => (
            <AssessmentCard
              key={activity.id}
              title={activity.title}
              date={activity.date}
              status={activity.status}
            />
          ))}
        </Grid>

        {/* Placeholder for Assessments List */}
        <Grid item xs={12} sx={{ mt: 4 }}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              {t("Dashboard.assessments")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("Dashboard.workInProgress")}
            </Typography>
          </Paper>
        </Grid>
      </Box>
    </AuthGuard>
  );
}
