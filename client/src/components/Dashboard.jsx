import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import CallReceivedRoundedIcon from "@mui/icons-material/CallReceivedRounded";
import CallMadeRoundedIcon from "@mui/icons-material/CallMadeRounded";
import Sidebar from "./Sidebar";
import { useMediaQuery } from "@mui/material";
import { authContext } from "../context/auth";

function Dashboard() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const {
    moneyOutTransactions,
    moneyInTransactions,
    totalMoneyOut,
    totalMoneyIn,
    account = {},
  } = useContext(authContext);
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
          <Box sx={{ margin: "30px" }}>
            <Typography variant="h4">Dashboard</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h2">₹ {account?.balance || 0}</Typography>
                <Typography sx={{ color: "#BBBBBB" }}>Total Balance</Typography>
              </Box>
              <Link
                style={{
                  color: "black",
                  listStyle: "none",
                  textDecoration: "none",
                }}
              >
                <ControlPointRoundedIcon />
                Deposite Money
              </Link>
            </Box>
            <Box container spacing={2} sx={{ marginTop: "20px" }}>
              <Box
                sx={{
                  display: "flex",
                  // flexDirection: "row",
                  justifyContent: "space-between",
                }}
                row
                xs={12}
                md={6}
                // className="col-md-12 col-lg-12  g-2"
              >
                <div className="col-md-12 col-lg-6 col-sm-12  mb-3  ">
                  <div className="card p-3 bg-light">
                    <div className="d-flex flex-row justify-content-between">
                      <h5 className="card-title">Income</h5>
                      <CallReceivedRoundedIcon style={{ color: "#23e33e" }} />
                    </div>
                    <h3 className="text" style={{ color: "#23e33e" }}>
                      ₹ {totalMoneyIn}
                    </h3>
                    <p className="text-muted">
                      {moneyInTransactions} Transactions
                    </p>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6 col-sm-12  mb-3 g-2">
                  <div className="card p-3 bg-light">
                    <div className="d-flex flex-row justify-content-between">
                      <h5 className="card-title">Spending</h5>
                      <CallMadeRoundedIcon style={{ color: "s" }} />
                    </div>
                    <h3 className="text" style={{ color: "#FF4D4D" }}>
                      ₹ {totalMoneyOut}
                    </h3>
                    <p className="text-muted">
                      {" "}
                      {moneyOutTransactions} Transactions
                    </p>
                  </div>
                </div>
              </Box>
              <Box
                xs={12}
                md={6}
                // className="col-md-12 col-lg-12 col-sm-12"
              >
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-row justify-content-between">
                      <h5 className="card-title ">Latest Transactions</h5>
                      <CallMadeRoundedIcon style={{ color: "black" }} />
                    </div>
                    <ul className="list-group">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Online purchase at eBay.com
                        <span className="text" style={{ color: "#FF4D4D" }}>
                          - $10,480.00
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        ATM Cash withdrawal
                        <span className="text" style={{ color: "#FF4D4D" }}>
                          - $201.50
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Income payment for projects
                        <span className="text" style={{ color: "#3deb12" }}>
                          + $3,000.00
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Groceries store
                        <span className="text" style={{ color: "#FF4D4D" }}>
                          - $400.00
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
