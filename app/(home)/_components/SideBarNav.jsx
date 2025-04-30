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
import { usePathname } from "next/navigation"; // To get current route

const SideBarNav = () => {
  const drawerWidth = 250;
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { text: "Browse", href: "/browse" },
    { text: "Dashboard", href: "/dashboard" },
    { text: "Upgrade", href: "/upgrade" },
    { text: "NewsLetter", href: "/newsletter" },
  ];

  const pathname = usePathname(); // Use the current path for route highlighting

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
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={40}
            height={40}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Box>

        <List>
          {navItems.map((item, index) => (
            <ListItem disablePadding key={item.text}>
              <ListItemButton
                component={Link}
                href={item.href}
                selected={pathname === item.href} // Highlight the active route
                sx={{
                  backgroundColor:
                    pathname === item.href ? "#f0f0f0" : "transparent",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
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
