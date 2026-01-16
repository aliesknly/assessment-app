import { MenuItem } from "@/components/navigation/MenuItem";
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
interface MenuItemsProp {
  open: boolean;
}
export default function MenuItems({ open }: MenuItemsProp) {
  return (
    <>
      {menuItems.map((item) => {
        return (
          <MenuItem
            key={item.href}
            label={item.text}
            Icon={item.icon}
            href={item.href}
            open={open}
          />
        );
      })}
    </>
  );
}
