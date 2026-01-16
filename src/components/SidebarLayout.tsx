"use client";

import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  IconButton,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  Description,
  Event,
  Assignment,
  Settings,
} from "@mui/icons-material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";

const drawerWidth = 280;

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    href: "/dashboard",
  },
  {
    text: "Assessments",
    icon: <AssessmentIcon />,
    href: "/assessments",
  },
  {
    text: "Results",
    icon: <Event />,
    href: "/results",
  },
  {
    text: "Reports",
    icon: <Description />,
    href: "/reports",
  },
  {
    text: "Settings",
    icon: <Settings />,
    href: "/settings",
  },
];

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Sidebar */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            {t("sidebar.menu")}
          </Typography>
        </Toolbar>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.href}
              disablePadding
              component={Link}
              href={item.href}
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                sx={{ 
                  color: isActive(item.href) ? "primary.main" : "inherit",
                  fontWeight: isActive(item.href) ? "bold" : "normal"
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)`, xs: "100%" },
        }}
      >
        {/* Mobile Menu Button */}
        <Box sx={{ display: { xs: "flex", sm: "none" }, mb: 2, ml: 2 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ minWidth: 150 }}
          >
            {t("sidebar.menu")}
          </IconButton>
        </Box>
        
        {children}
      </Box>
    </Box>
  );
}