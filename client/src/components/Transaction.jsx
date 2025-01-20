import React, { useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Sidebar from "./Sidebar";
import { authContext } from "../context/auth";
const drawerWidth = 240;

function Transaction() {
  const isMobile = useMediaQuery("(max-width:768px)");

  const { transactionData } = useContext(authContext);
  console.log(transactionData);

  return (
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
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            {/* Account Balance */}
            <Typography variant="h4">Transaction</Typography>

            {/* Action Buttons */}
            {/* <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
              <Button variant="contained">Transfer</Button>
              <Button variant="outlined">Make a Payment</Button>
            </Box> */}

            {/* Conditional Rendering for Content */}
            {transactionData && transactionData.length > 0 ? (
              <Grid container spacing={3} sx={{ mt: 3 }}>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Payment</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {transactionData.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {new Date(
                                row.transaction_Date
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </TableCell>
                            <TableCell>{row.paymentTo || "Self"}</TableCell>
                            <TableCell>
                              {row.type.charAt(0).toUpperCase() +
                                row.type.slice(1)}
                            </TableCell>
                            <TableCell>
                              ₹{row.amount.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            ) : (
              <Grid
                container
                spacing={2}
                sx={{ mt: 3, justifyContent: "center", textAlign: "center" }}
              >
                <Grid item xs={12} sm={8}>
                  <img
                    width={250}
                    src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSO5D2Cb0Fama9t4e43ifvVe6VGvU739AZfNZVkSVO-dPZHEoHV"
                    alt="No transactions"
                  />
                  <Typography variant="h6" gutterBottom>
                    Make a payment
                  </Typography>
                  <Typography variant="body1">
                    Start spending your funds and get a detailed list of
                    transactions for each account.
                  </Typography>
                  <Button variant="text" sx={{ mt: 2 }}>
                    Transfer your funds
                  </Button>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Transaction;
