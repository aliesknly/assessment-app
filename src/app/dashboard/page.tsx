import { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import { Assessment, ActivityItem, Stats } from "@/types";
import {
  AssessmentCard,
  RecentActivity,
  StatsCard,
} from "@/components";
import { Dashboard as DashboardIcon } from "@mui/icons-material";
import SidebarLayout from "@/components/SidebarLayout";

export default function Dashboard() {
  const { t } = useTranslations();
  const [recentActivity] = useState<Array<ActivityItem>>([]);
  const [stats] = useState<Stats>({
    totalAssessments: 12,
    completed: 8,
    inProgress: 3,
    averageScore: 85,
  });

  useEffect(() => {
    // Simulate fetching recent activity data
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
    setRecentActivity(mockActivity);
  }, []);

  return (
    <SidebarLayout>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t("dashboard.welcome")}, {user?.displayName || user?.email}
        </Typography>
        
        <Grid container spacing={3}>
          {/* Stats Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title={t("dashboard.totalAssessments")}
              value={stats.totalAssessments}
              color="primary"
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title={t("dashboard.completed")}
              value={stats.completed}
              color="success"
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title={t("dashboard.inProgress")}
              value={stats.inProgress}
              color="warning"
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title={t("dashboard.averageScore")}
              value={`${stats.averageScore}%`}
              color="info"
            />
          </Grid>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t("dashboard.recentActivity")}
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
              {t("dashboard.assessments")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("dashboard.workInProgress")}
            </Typography>
          </Paper>
        </Grid>
      </Box>
    </SidebarLayout>
  );
}