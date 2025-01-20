import React, { useState } from "react";
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import Sidebar from "./Sidebar"; // Assume Sidebar is another component
import axios from "axios";

const Payment = () => {
  const [hasPayments, setHasPayments] = useState(false);
  const [activeForm, setActiveForm] = useState("");
  const [fromAccount, setFromaccount] = useState("");
  const [toAccount, setToaccount] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fromAccount || !amount || !pin) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (amount <= 0) {
      setErrorMessage("Amount must be greater than zero");
      return;
    }
    const pinInt = parseInt(pin);

    try {
      let response;
      if (activeForm === "deposit") {
        response = await axios.post(
          "http://localhost:4000/PaySa/Transaction/deposit",
          {
            accountNumber: fromAccount,
            amount: amount,
            setPin: pinInt,
          }
        );
      } else if (activeForm === "withdraw") {
        response = await axios.post(
          "http://localhost:4000/PaySa/Transaction/withdraw",
          {
            accountNumber: fromAccount,
            amount: amount,
            setPin: pinInt,
          }
        );
      } else if (activeForm === "transfer") {
        response = await axios.post(
          "http://localhost:4000/PaySa/Transaction/transfer",
          {
            fromAccountNumber: fromAccount,
            toAccountNumber: toAccount,
            amount: amount,
            setPin: pinInt,
          }
        );
      }

      setSuccessMessage(response.data.message);
      setErrorMessage(""); // Clear any previous error messages
      setActiveForm(""); // Reset the form after successful submission
      setFromaccount(""); // Clear from account input
      setToaccount(""); // Clear to account input
      setAmount(""); // Clear amount input
      setPin(""); // Clear pin input
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "An error occurred");
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  const renderForm = () => {
    switch (activeForm) {
      case "withdraw":
        return (
          <form onSubmit={handleSubmit}>
            <Card sx={{ p: 3, width: "100%", maxWidth: 400, mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Withdraw Funds
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Account Number"
                  onChange={(e) => setFromaccount(e.target.value)}
                  type="text"
                  fullWidth
                />
                <TextField
                  label="Amount to Withdraw"
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Pin"
                  onChange={(e) => setPin(e.target.value)}
                  fullWidth
                />
                <Button variant="contained" type="submit" color="primary">
                  Submit
                </Button>
              </Stack>
            </Card>
          </form>
        );
      case "deposit":
        return (
          <form onSubmit={handleSubmit}>
            <Card sx={{ p: 3, width: "100%", maxWidth: 400, mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Deposit Funds
              </Typography>
              <Stack spacing={2}>
                <TextField
                  type="text"
                  label="Account Number"
                  onChange={(e) => setFromaccount(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Amount to Deposit"
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  fullWidth
                />
                <TextField
                  label="Pin"
                  type="text"
                  onChange={(e) => setPin(e.target.value)}
                  fullWidth
                />
                <Button variant="contained" type="submit" color="secondary">
                  Submit
                </Button>
              </Stack>
            </Card>
          </form>
        );
      case "transfer":
        return (
          <form onSubmit={handleSubmit}>
            <Card sx={{ p: 3, width: "100%", maxWidth: 400, mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Transfer Funds
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Account Number from Transfer"
                  onChange={(e) => setFromaccount(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Account Number to Transfer"
                  onChange={(e) => setToaccount(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Amount to Transfer"
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Pin"
                  onChange={(e) => setPin(e.target.value)}
                  fullWidth
                />
                <Button variant="contained" type="submit" color="success">
                  Submit
                </Button>
              </Stack>
            </Card>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      display="grid"
      sx={{
        height: "100vh",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "20% 80%",
        },
        gridTemplateRows: {
          xs: "auto 10%",
          sm: "1fr",
        },
      }}
    >
      <Sidebar />

      <Box
        sx={{
          backgroundColor: "#F9F9F9",
          padding: "1rem",
          overflowY: { xs: "auto", sm: "hidden" },
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
          {!hasPayments ? (
            <Box textAlign="center">
              <img
                alt="img"
                width={350}
                src="https://static.vecteezy.com/system/resources/previews/035/795/155/non_2x/make-payments-isolated-cartoon-illustrations-vector.jpg"
              />
              <Typography variant="h5" gutterBottom>
                Add First Payment
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Start spending your funds and get a detailed list of
                transactions for each account.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setHasPayments(true)}
              >
                Make a Payment
              </Button>
            </Box>
          ) : (
            <Stack spacing={2} alignItems="center">
              <Typography variant="h5">Manage Payments</Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setActiveForm("withdraw")}
                >
                  Withdraw
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setActiveForm("deposit")}
                >
                  Deposit
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setActiveForm("transfer")}
                >
                  Transfer
                </Button>
              </Stack>

              {/* Display success and error messages */}
              {successMessage && (
                <Typography variant="body1" color="success">
                  {successMessage}
                </Typography>
              )}
              {errorMessage && (
                <Typography variant="body1" color="error">
                  {errorMessage}
                </Typography>
              )}

              {renderForm()}
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Payment;
