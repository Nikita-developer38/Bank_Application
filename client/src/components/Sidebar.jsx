import React, { useContext } from "react";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";

import LogoutIcon from "@mui/icons-material/Logout";
import SyncAltRoundedIcon from "@mui/icons-material/SyncAltRounded";
import CallMissedOutgoingRoundedIcon from "@mui/icons-material/CallMissedOutgoingRounded";
import TimelapseRoundedIcon from "@mui/icons-material/TimelapseRounded";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../CSS/sidebar.css";

function Sidebar() {
  const isMobile = useMediaQuery("(max-width:768px)");

  const navigate = useNavigate(); // React Router v6 hook
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
          to="/dashboard"
          id="list"
          style={{ borderRadius: "16px" }}
          sx={{ justifyContent: isMobile ? "center" : "flex-start" }}
        >
          <ListItemIcon>
            <TimelapseRoundedIcon sx={{ color: "Black" }} />
          </ListItemIcon>
          {!isMobile && (
            <ListItemText primary="Dashboard" sx={{ color: "Black" }} />
          )}
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/accounts"
          style={{ borderRadius: "16px" }}
          sx={{ justifyContent: isMobile ? "center" : "flex-start" }}
        >
          <ListItemIcon>
            <AccountBalanceRoundedIcon sx={{ color: "Black" }} />
          </ListItemIcon>
          {!isMobile && (
            <ListItemText primary="Account" sx={{ color: "Black" }} />
          )}
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/transaction"
          style={{ borderRadius: "16px" }}
          sx={{ justifyContent: isMobile ? "center" : "flex-start" }}
        >
          <ListItemIcon>
            <SyncAltRoundedIcon sx={{ color: "Black" }} />
          </ListItemIcon>
          {!isMobile && (
            <ListItemText primary="Transaction" sx={{ color: "Black" }} />
          )}
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/payment"
          style={{ borderRadius: "16px" }}
          sx={{ justifyContent: isMobile ? "center" : "flex-start" }}
        >
          <ListItemIcon>
            <CallMissedOutgoingRoundedIcon sx={{ color: "Black" }} />
          </ListItemIcon>
          {!isMobile && (
            <ListItemText primary="Payment" sx={{ color: "Black" }} />
          )}
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/report"
          style={{ borderRadius: "16px" }}
          sx={{ justifyContent: isMobile ? "center" : "flex-start" }}
        >
          <ListItemIcon>
            <EqualizerRoundedIcon sx={{ color: "Black" }} />
          </ListItemIcon>
          {!isMobile && (
            <ListItemText primary="Reports" sx={{ color: "Black" }} />
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

export default Sidebar;
