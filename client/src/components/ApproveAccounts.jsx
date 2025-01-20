import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, useMediaQuery } from "@mui/material";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";

function ApproveAccounts() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [approvedAccounts, setApprovedAccounts] = useState([]);

  // Fetch accounts where `approvedByAdmin` is true
  const fetchApprovedAccounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/PaySa/Account/getAll"
      );
      const accounts = response.data?.account || [];
      const approved = accounts.filter((acc) => acc.approvedByAdmin === true); // Filter approved accounts
      setApprovedAccounts(approved);
    } catch (error) {
      console.error("Error fetching approved accounts:", error);
      setApprovedAccounts([]);
    }
  };

  useEffect(() => {
    fetchApprovedAccounts();
  }, []);

  return (
    <>
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
            overflowY: "auto",
            gridColumn: "auto",
            gridRow: isMobile ? "1" : "auto",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Approved Accounts
          </Typography>
          <Grid item style={{ width: "300px", marginBottom: "30px" }}>
            <Box
              sx={{
                p: 2,
                border: "1px solid lightgray",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6">Pending Requests</Typography>
              <Typography variant="h5" color="error.main">
                {approvedAccounts.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                approval requests
              </Typography>
            </Box>
          </Grid>
          {approvedAccounts.length > 0 ? (
            approvedAccounts.map((account) => (
              <Box
                key={account._id}
                sx={{
                  marginBottom: "20px",
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                }}
              >
                <Typography variant="body1">
                  <strong>Account ID:</strong> {account._id}
                </Typography>
                <Typography variant="body1">
                  <strong>User ID:</strong> {account.userId}
                </Typography>
                <Typography variant="body1">
                  <strong>Account Type:</strong> {account.accountType}
                </Typography>
                <Typography variant="body1">
                  <strong>Balance:</strong> {account.balance}
                </Typography>
                <Typography variant="body1">
                  <strong>Created At:</strong>{" "}
                  {new Date(account.createdAt).toLocaleString()}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body1">
              No approved accounts available.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}

export default ApproveAccounts;
