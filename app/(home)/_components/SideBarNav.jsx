"use client";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
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

const SideBarNav = () => {
  const drawerWidth = 200;
  const navItems = [
    { text: "Browse", href: "/browse" },
    { text: "Dashboard", href: "/dashboard" },
    { text: "Upgrade", href: "/upgrade" },
    { text: "NewsLetter", href: "/newsletter" },
  ];
  return (
    <div>
      {" "}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
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
            width={50}
            height={50}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Box>
        {/* <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider /> */}
        <List>
          {navItems.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <Link href={item.href} passHref legacyBehavior>
                <ListItemButton component="a">
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default SideBarNav;
