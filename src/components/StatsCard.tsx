"use client";

import { Card, CardContent, Typography, Box } from "@mui/material";

interface StatsCardProps {
  title: string;
  value: string | number;
  color?: string;
  icon?: React.ReactNode;
}

export default function StatsCard({
  title,
  value,
  color = "default",
  icon,
}: StatsCardProps) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 2, flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          {icon || <Box sx={{ width: 40, height: 40 }} />}
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" component="h3">
              {title}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h4" color={color}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

