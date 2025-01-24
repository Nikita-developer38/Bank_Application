import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, Grid, Button } from "@mui/material";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";

function AccountRequest() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [notifications, setNotifications] = useState([]); // Notifications data
  const [userIds, setUserIds] = useState([]); // Extracted user IDs
  const [accountMapping, setAccountMapping] = useState({}); // Mapping of userId to account details

  // Extract user IDs from notifications
  const extractUserIds = (notifications) => {
    return notifications.map((notification) => {
      const match = notification.message.match(/User ID: (\w+)/);
      return match ? match[1] : null; // Return user ID or null if not found
    });
  };

  // Fetch notifications and extract user IDs
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "https://localhost:4000/PaySa/Admin/getAll"
      );
      const notifications = response.data[0]?.notifications || [];
      setNotifications(notifications);

      // Extract User IDs and fetch account details
      const ids = extractUserIds(notifications);
      setUserIds(ids);
      fetchAccounts(ids);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    }
  };

  // Fetch accounts and map user IDs to account details
  const fetchAccounts = async (userIds) => {
    try {
      const response = await axios.get(
        "https://localhost:4000/PaySa/Account/getAll"
      );
      const accounts = response.data?.account || [];
      const mapping = {};

      // Map user IDs to their corresponding unapproved account details
      userIds.forEach((userId) => {
        const userAccounts = accounts.filter(
          (acc) => acc.userId === userId && !acc.approvedByAdmin
        );
        mapping[userId] = userAccounts;
        console.log(userAccounts.length);
        // Map to unapproved accounts
      });

      setAccountMapping(mapping);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  // Approve an account
  const approveAccount = async (accountId) => {
    try {
      const response = await axios.patch(
        `https://localhost:4000/PaySa/Account/${accountId}`
      );
      console.log(response.data.message);
      alert(`Account ${accountId} approved successfully!`);
      fetchNotifications(); // Refresh notifications and account details after approval
    } catch (error) {
      console.error(
        "Error approving account:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Box
      display="grid"
      sx={{
        height: "100vh",
        gridTemplateColumns: isMobile ? "1fr" : "20% 80%",
        gridTemplateRows: isMobile ? "auto 10%" : "1fr",
      }}
    >
      <AdminSidebar />
      {/* Main Content Area */}
      <Box
        sx={{
          backgroundColor: "#F9F9F9",
          padding: "30px",
          overflowY: isMobile ? "auto" : "hidden",
          gridColumn: "auto",
          gridRow: isMobile ? "1" : "auto",
        }}
      >
        {Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((notification, index) => {
            const userId = userIds[index];
            const accounts = accountMapping[userId] || [];

            // Skip rendering if no unapproved accounts
            if (accounts.length === 0) {
              return null;
            }

            return (
              <div key={index} style={{ marginBottom: "20px" }}>
                <Grid item style={{ width: "300px", marginBottom: "30px" }}>
                  <Box
                    sx={{
                      p: 2,
                      border: "1px solid lightgray",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h6">Approvals</Typography>
                    <Typography variant="h5" color="warning.main">
                      {accounts.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pending approvals this month
                    </Typography>
                  </Box>
                </Grid>
                <Typography variant="h6" gutterBottom>
                  {notification.message}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  User ID: {userId || "Not Found"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Unapproved Accounts:
                  {accounts.map((account) => (
                    <div key={account._id} style={{ marginTop: "10px" }}>
                      Account ID: {account._id}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => approveAccount(account._id)}
                        style={{ marginLeft: "10px" }}
                      >
                        Approve
                      </Button>
                      <hr />
                    </div>
                  ))}
                </Typography>
              </div>
            );
          })
        ) : (
          <Typography variant="body1">No notifications available.</Typography>
        )}
      </Box>
    </Box>
  );
}

export default AccountRequest;
