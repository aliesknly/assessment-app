"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  Divider,
  ListItemText,
} from "@mui/material";
import { AccountCircle, Logout, Settings } from "@mui/icons-material";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const t = useTranslations();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const handleNavigation = (path: string) => {
    handleMenuClose();
    router.push(path);
  };

  const isActivePath = (path: string) => pathname === path;

  return (
    <AppBar
      position="static"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        {/* Left side - App Name */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            "&:hover": {
              textDecoration: "none",
              opacity: 0.8,
            },
          }}
          onClick={() => handleNavigation("/")}
        >
          Job Assessments
        </Typography>

        {/* Right side - User Menu */}
        {user && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              onClick={handleMenuOpen}
              aria-controls="user-menu"
              aria-haspopup="true"
              sx={{ ml: 2, p: 1 }}
            >
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt={user.displayName || user.email || "User"}
                src={user.photoURL || undefined}
              >
                {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
              </Avatar>
            </IconButton>

            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              slotProps={{
                paper: {
                  elevation: 3,
                  sx: {
                    overflow: "visible",
                    mt: 1,
                    minWidth: 200,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => handleNavigation("/profile")}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText>{t("Common.profile")}</ListItemText>
              </MenuItem>

              <MenuItem
                onClick={() => handleNavigation("/settings")}
                sx={{ opacity: 0.6 }}
              >
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText>{t("Common.settings")}</ListItemText>
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText>{t("Common.logout")}</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
