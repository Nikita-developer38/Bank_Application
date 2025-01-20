import React, { useContext } from "react";
import { People, Assignment, CheckCircle } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

import "../CSS/sidebar.css";
import { useNavigate } from "react-router-dom";

function AdminSidebar() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // localStorage.removeItem("token");

      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "#E6E6E6",
        color: "white",
        padding: isMobile ? "0.5rem" : "1rem",
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        alignItems: "center",
        justifyContent: isMobile ? "space-around" : "flex-start",
        gridColumn: isMobile ? "1" : "auto",
        gridRow: isMobile ? "2" : "auto",
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          padding: 0,
        }}
      >
        <ListItem
          button
          component={Link}
          to="/adminDashboard"
          id="list"
          style={{ borderRadius: "16px" }}
          sx={{ justifyContent: isMobile ? "center" : "flex-start" }}
        >
          <ListItemIcon>
            <People sx={{ color: "Black" }} />
          </ListItemIcon>
          {!isMobile && (
            <ListItemText primary="Dashboard" sx={{ color: "Black" }} />
          )}
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/all_users"
          id="list"
          style={{ borderRadius: "16px" }}
          sx={{ justifyContent: isMobile ? "center" : "flex-start" }}
        >
          <ListItemIcon>
            <People sx={{ color: "Black" }} />
          </ListItemIcon>
          {!isMobile && (
            <ListItemText primary="Users" sx={{ color: "Black" }} />
          )}
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/new_account_request"
          style={{ borderRadius: "16px" }}
          sx={{ justifyContent: isMobile ? "center" : "flex-start" }}
        >
          <ListItemIcon>
            <Assignment sx={{ color: "Black" }} />
          </ListItemIcon>
          {!isMobile && (
            <ListItemText
              primary="New Account Requests"
              sx={{ color: "Black" }}
            />
          )}
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/approval_request"
          style={{ borderRadius: "16px" }}
          sx={{ justifyContent: isMobile ? "center" : "flex-start" }}
        >
          <ListItemIcon>
            <CheckCircle sx={{ color: "Black" }} />
          </ListItemIcon>
          {!isMobile && (
            <ListItemText primary="Approval Requests" sx={{ color: "Black" }} />
          )}
        </ListItem>

        <ListItem
          button
          sx={{ justifyContent: isMobile ? "center" : "flex-start" }}
          style={{ borderRadius: "16px" }}
          onClick={handleLogout}
        >
          <ListItemIcon>
            <LogoutIcon sx={{ color: "black" }} />
          </ListItemIcon>
          {!isMobile && (
            <ListItemText primary="Logout" sx={{ color: "black" }} />
          )}
        </ListItem>
      </List>
    </Box>
  );
}

export default AdminSidebar;
