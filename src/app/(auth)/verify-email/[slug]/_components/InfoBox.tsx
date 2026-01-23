import { Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

interface InfoBoxProps {
  children: ReactNode;
  title: string;
}

export function InfoBox({ children, title }: InfoBoxProps) {
  return (
    <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" color="info" sx={{ mt: 2 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}
