import React, { useState } from "react";
import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  async function SendOTP(e) {
    e.preventDefault();
    try {
      await axios.post(
        "https://bank-application-backend.onrender.com/PaySa/User/send-otp",
        {
          email,
        }
      );
      setOtpSent(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function Log(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://bank-application-backend.onrender.com/PaySa/User/Login",
        {
          email,
          otp,
          password,
        }
      );
      console.log(response);
      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          bgcolor: "white",
        }}
      >
        <Box display="flex" alignItems="center" marginBottom={4}>
          <Box
            bgcolor="#3b82f6"
            color="white"
            display="flex"
            alignItems="start"
            justifyContent="flex-start"
            borderRadius="50%"
            padding={1.5}
          >
            <AccountBalanceIcon />
          </Box>
          <Typography variant="h5" fontWeight="bold" marginLeft={2}>
            Paysa
          </Typography>
        </Box>
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Log in
          </Typography>

          <form onSubmit={Log}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            {!otpSent && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={SendOTP}
                disabled={!email}
              >
                Send OTP
              </Button>
            )}
            {otpSent && (
              <Box marginTop={3}>
                <TextField
                  fullWidth
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  variant="outlined"
                  label="OTP"
                />
              </Box>
            )}
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", my: 2 }}
            >
              {/* <Link href="#" underline="none">
              Recover password
            </Link> */}
            </Box>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              // Trigger the log function on click
              sx={{
                backgroundColor: " #007BFF",
                color: "white",
                //   "&:hover": { bgcolor: "darkblue" },
              }}
            >
              Sign in
            </Button>
          </form>
          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link to={"/"} underline="none">
              Create an account
            </Link>
          </Typography>
        </Box>
      </Grid>

      {/* Right Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          background: "linear-gradient(to bottom right, #00ff2a, #0072ff)",
          color: "white",
        }}
      >
        <Link
          to={"/adminLogin"}
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: "500",
            textAlign: "left",
          }}
        >
          Admin Log In
        </Link>
        <Box sx={{ maxWidth: 400, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            The latest financial insights and analysis
          </Typography>
          <Typography variant="body2" gutterBottom>
            Keep you up to date and ahead of the curve.
          </Typography>
          <Box
            sx={{
              mt: 4,
              p: 2,
              bgcolor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 2,
            }}
          >
            <img
              alt="img"
              style={{ width: "400px", borderRadius: "8px" }}
              src="https://womenofindia.org.in/register/login.png"
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
