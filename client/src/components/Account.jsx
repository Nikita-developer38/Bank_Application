import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import { Box, Typography, Button } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Grid, Paper, Divider } from "@mui/material";
import axios from "axios";
import { authContext } from "../context/auth";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
const theme = createTheme({
  spacing: 8, // Set spacing scale for the theme
  shape: {
    borderRadius: 8,
  },
});

function Account() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const { transactionData } = useContext(authContext);
  const [open, setOpen] = useState(false);
  const [pin, setPin] = useState("");

  const { account } = useContext(authContext);

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  // Handlers to open/close the dialog
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token = localStorage.getItem("token");

  console.log(account);

  const generateBankStatement = () => {
    const doc = new jsPDF();

    // Add bank statement title
    doc.setFontSize(16);
    doc.text("Bank Statement", 105, 20, { align: "center" });

    // Add account details
    doc.setFontSize(12);
    doc.text(`Account Holder: ${account.userId.name}`, 10, 40);
    doc.text(`Account Number: ${account._id}`, 10, 50);
    doc.text(
      `Statement Period: Jan 01 2025 - ${formatDate(Date.now())}`,
      10,
      60
    );

    console.log(transactionData);

    // Add transactions table
    autoTable(doc, {
      startY: 70,
      head: [["Date", "Type", "Description", "Amount"]],
      body: transactionData.map((txn) => [
        formatDate(txn.transaction_Date),
        txn.type,
        txn.description,
        txn.amount > 0 ? ` ${txn.amount}` : ` ${Math.abs(txn.amount)}`,
      ]),
    });

    // Check if autoTableEndY exists and add total balance below the table
    const yPosition = doc.autoTableEndY ? doc.autoTableEndY + 10 : 160; // Use a fallback value of 160 if autoTableEndY is not available

    doc.text(`Total Balance:  ${account.balance}`, 10, yPosition);

    // Save the PDF
    doc.save("Bank_Statement.pdf");
  };
  async function CreateAcc(e) {
    e.preventDefault();
    try {
      await axios.post(
        "https://localhost:4000/PaySa/Account/Create",
        {
          setPin: pin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        }
      );
      setPin("");
    } catch (error) {
      console.log(
        "Error creating account:",
        error.response?.data || error.message
      );
    }
  }
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
            {!account ? (
              <>
                <img
                  src="https://neuroprofiler.com/wp-content/uploads/2022/07/undraw_Projections_re_ulc6-882x660.png"
                  style={{ width: "350px" }}
                  alt="img"
                />

                <Typography variant="h4" gutterBottom>
                  Open a bank account
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Apply today and start using our banking app after document
                  confirmation.
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleClickOpen}
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Open an account
                </Button>

                {/* Dialog */}

                <Dialog open={open} onClose={handleClose}>
                  <form onSubmit={CreateAcc}>
                    <DialogTitle>
                      <Typography variant="h5" component="div" color="primary">
                        Create Account
                      </Typography>
                    </DialogTitle>
                    <DialogContent>
                      <Box>
                        <Typography variant="body1" gutterBottom>
                          Hello User, your documents have been approved. Please
                          set a PIN for your transactions.
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        <TextField
                          margin="normal"
                          label="Set PIN"
                          type="number"
                          fullWidth
                          value={pin}
                          onChange={(e) => setPin(e.target.value)}
                        />
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        color="secondary"
                        variant="outlined"
                      >
                        Cancel
                      </Button>
                      <Button variant="contained" type="submit" color="primary">
                        Create Account
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>
              </>
            ) : (
              // Display account details if user has an account
              <ThemeProvider theme={theme}>
                <Box p={2} width={750}>
                  <Grid container spacing={3}>
                    {/* Card Details Section */}
                    <Grid item xs={12} md={8}>
                      <Paper
                        style={{
                          padding: theme.spacing(3),
                          backgroundColor: "#ffffff",
                          borderRadius: theme.shape.borderRadius,
                        }}
                        elevation={3}
                      >
                        <Divider />
                        <Box
                          mt={2}
                          style={{
                            width: "400px",
                            height: "200px",
                            background:
                              "linear-gradient(30deg, #1becd0, #0565b9)",
                            color: "white",
                            padding: theme.spacing(3),
                            borderRadius: "16px",
                          }}
                        >
                          <div
                            className="d-flex flex-row justify-content-end fw-bold  fs-5"
                            style={{
                              fontStyle: "italic",
                            }}
                          >
                            <span style={{ backgroundColor: "#063d6d" }}>
                              VISA
                            </span>
                          </div>
                          <Typography variant="h5">
                            3400 **** **** 3002
                          </Typography>
                          <div>Card Number</div>
                          <div className="d-flex flex-row justify-content-between mt-3">
                            <div>
                              <Typography variant="subtitle1">
                                ${account.balance}
                              </Typography>
                              <div>Card Balance</div>
                            </div>
                            <div>
                              <Typography variant="subtitle1">06/30</Typography>
                              <div>Valid</div>
                            </div>
                          </div>
                        </Box>
                        <Box mt={2}>
                          <Typography variant="body1">
                            Card name: American Express
                          </Typography>
                          <hr />
                          <Typography variant="body1">
                            Account Number: {account._id}
                          </Typography>
                          <hr />
                          <Typography variant="body1">
                            Account Holder: {account.userId.name}
                          </Typography>
                          <hr />
                          <Typography variant="body1">
                            Download Statement:
                            <Button onClick={generateBankStatement}>
                              download
                            </Button>
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              </ThemeProvider>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Account;
