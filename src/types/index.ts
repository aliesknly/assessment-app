export interface Assessment {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed" | "in_review";
  dueDate: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  date: string;
  status: "pending" | "completed" | "in_review";
}

export interface Stats {
  totalAssessments: number;
  completed: number;
  inProgress: number;
  averageScore: number;
}