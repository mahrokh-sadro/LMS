"use client";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UpgradeIcon from "@mui/icons-material/WorkspacePremium";
const SideBarNav = () => {
  const drawerWidth = 250;
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { text: "Browse", href: "/browse", icon: <HomeIcon /> },
    { text: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
    { text: "Upgrade", href: "/upgrade", icon: <UpgradeIcon /> },
  ];
  const pathname = usePathname();

  return (
    <div>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          display: { xs: "none", md: "block" },
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            borderBottom: "1px solid #ddd",
            p: 2,
          }}
        >
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={60}
              height={60}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
              }}
              loading="lazy"
            />
          </Link>
        </Box>

        <List>
          {navItems.map((item, index) => (
            <ListItem disablePadding key={item.text}>
              <ListItemButton
                component={Link}
                href={item.href}
                selected={pathname === item.href}
                sx={{
                  backgroundColor:
                    pathname === item.href ? "#f0f0f0" : "transparent",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>

                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default SideBarNav;
