"use client";
import { useState, ReactNode } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { DrawerHeader } from "../navigation/DrawerHeader";
import Header from "../navigation/Header";
import SideMenu from "../navigation/SideMenu";
import MenuItems from "@/components/navigation/MenuListItems";

export default function MainLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header isDrawerOpen={open} handleDrawerOpen={handleDrawer} />
      <SideMenu open={open} handleDrawer={handleDrawer}>
        <MenuItems open={open} />
      </SideMenu>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
