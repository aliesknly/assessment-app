"use client";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { ElementType } from "react";

interface MenuItemProps {
  open: boolean;
  label: string;
  Icon: ElementType;
  href: string;
}

export function MenuItem({ open, label, Icon, href }: MenuItemProps) {
  const router = useRouter();
  const path = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };
  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        onClick={() => {
          handleNavigation(href);
        }}
        selected={path.includes(href) ? true : false}
        sx={[
          {
            minHeight: 48,
            px: 2.5,
          },
          open
            ? {
                justifyContent: "initial",
              }
            : {
                justifyContent: "center",
              },
        ]}
      >
        <ListItemIcon
          sx={[
            {
              minWidth: 0,
              justifyContent: "center",
            },
            open
              ? {
                  mr: 3,
                }
              : {
                  mr: "auto",
                },
          ]}
        >
          <Icon />
        </ListItemIcon>
        <ListItemText
          primary={label}
          sx={[
            open
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 0,
                },
          ]}
        />
      </ListItemButton>
    </ListItem>
  );
}
