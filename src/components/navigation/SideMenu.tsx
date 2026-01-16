"use client";

import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Drawer } from "./Drawer";
import { DrawerHeader } from "./DrawerHeader";
import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface SideMenuProps {
  open: boolean;
  handleDrawer(): void;
  children: ReactNode;
}
export default function SideMenu({
  open,
  handleDrawer,
  children,
}: SideMenuProps) {
  const theme = useTheme();
  const { user } = useAuth();
  //const isActive = (href: string) => pathname === href;
  if (!user) return null;
  else
    return (
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawer}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {children}
      </Drawer>
    );
}
