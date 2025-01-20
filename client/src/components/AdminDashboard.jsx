import React, { useContext } from "react";
import { Box, Typography, Grid } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useMediaQuery } from "@mui/material";
import AdminSidebar from "./AdminSidebar";
import { authContext } from "../context/auth";
function AdminDashboard() {
  const isMobile = useMediaQuery("(max-width:768px)");

  const { allUser, allTransaction } = useContext(authContext);
  const transactionData = [
    { month: "Jan", successful: 50, pending: 10 },
    { month: "Feb", successful: 60, pending: 5 },
    { month: "Mar", successful: 70, pending: 15 },
    { month: "Apr", successful: 80, pending: 20 },
    { month: "May", successful: 90, pending: 10 },
    { month: "Jun", successful: 85, pending: 12 },
    { month: "Jul", successful: 95, pending: 8 },
    { month: "Aug", successful: 100, pending: 5 },
    { month: "Sep", successful: 110, pending: 6 },
    { month: "Oct", successful: 120, pending: 7 },
    { month: "Nov", successful: 115, pending: 9 },
    { month: "Dec", successful: 130, pending: 4 },
  ];
  return (
    <>
      <Box
        display="grid"
        sx={{
          height: "100%",

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
          // className="border rounded"
        >
          <Typography variant="h4" gutterBottom>
            Welcome, Admin!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Here's an overview of platform activities.
          </Typography>

          {/* Cards Section */}
          <Grid container spacing={1} sx={{ my: 1 }}>
            <Grid item xs={12} md={3}>
              <Box
                sx={{ p: 2, border: "1px solid lightgray", borderRadius: 2 }}
              >
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h5" color="primary">
                  {allUser.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active users in the system
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box
                sx={{ p: 2, border: "1px solid lightgray", borderRadius: 2 }}
              >
                <Typography variant="h6">Transactions</Typography>
                <Typography variant="h5" color="success.main">
                  {allTransaction.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total transactions
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Transactions Chart */}
          <Box sx={{ height: 400, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Transactions Overview
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transactionData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="successful"
                  fill="#82ca9d"
                  name="Successful Transactions"
                />
                <Bar
                  dataKey="pending"
                  fill="#8884d8"
                  name="Pending Transactions"
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AdminDashboard;
