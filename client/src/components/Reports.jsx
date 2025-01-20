import React, { useContext } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Sidebar from "./Sidebar";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { authContext } from "../context/auth";

const drawerWidth = 240;
function Reports() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { totalMoneyOut, totalMoneyIn, account = {} } = useContext(authContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const options = {
    chart: {
      type: "column", // Column chart
    },
    title: {
      text: "Transaction Summary", // Chart title
    },
    xAxis: {
      categories: ["Transactions"], // X-axis categories
      title: {
        text: "Type", // X-axis title
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Amount", // Y-axis title
      },
    },
    series: [
      {
        name: "Money In",
        data: [totalMoneyIn], // Dynamic "Money In" data
        color: "#2b908f", // Green
      },
      {
        name: "Money Out",
        data: [totalMoneyOut], // Dynamic "Money Out" data
        color: "#f45b5b", // Red
      },
    ],
  };

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
        <Sidebar />
        {/* Main Content Area */}
        <Box
          sx={{
            backgroundColor: "#F9F9F9",
            padding: "1rem",
            overflowY: isMobile ? "auto" : "hidden",
            gridColumn: "auto",
            gridRow: isMobile ? "1" : "auto",
          }}
          // className="border rounded"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "80vh",
            }}
          >
            <Grid container spacing={3} sx={{ my: 3 }}>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{ p: 2, border: "1px solid lightgray", borderRadius: 2 }}
                >
                  <Typography variant="h6">Balance</Typography>
                  <Typography variant="h5" color="primary">
                    ₹ {account?.balance || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total remaining balance
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{ p: 2, border: "1px solid lightgray", borderRadius: 2 }}
                >
                  <Typography variant="h6">Money In</Typography>
                  <Typography variant="h5" color="#23e33e">
                    ₹ {totalMoneyIn}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total amount you gained
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{ p: 2, border: "1px solid lightgray", borderRadius: 2 }}
                >
                  <Typography variant="h6">Money Out</Typography>
                  <Typography variant="h5" color="#FF4D4D">
                    ₹ {totalMoneyOut}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total amount you spent
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ height: "400px", width: "100%", marginTop: "50px" }}>
              <HighchartsReact highcharts={Highcharts} options={options} />{" "}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Reports;
