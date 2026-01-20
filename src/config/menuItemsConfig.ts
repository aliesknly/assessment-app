import {
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  Description,
  Event,
  Settings,
} from "@mui/icons-material";

export const menuItems = [
  {
    text: "Dashboard",
    icon: DashboardIcon,
    href: "/dashboard",
    langCode: "",
  },
  {
    text: "Assessments",
    icon: AssessmentIcon,
    href: "/assessments",
    langCode: "",
  },
  {
    text: "Results",
    icon: Event,
    href: "/results",
    langCode: "",
  },
  {
    text: "Reports",
    icon: Description,
    href: "/reports",
    langCode: "",
  },
  {
    text: "Settings",
    icon: Settings,
    href: "/settings",
    langCode: "",
  },
];
