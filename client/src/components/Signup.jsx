import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HomeIcon from "@mui/icons-material/Home";
import LockIcon from "@mui/icons-material/Lock";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const GradientBox = styled(Box)({
  background: "linear-gradient(to bottom right, #00ff2a, #0072ff)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "2rem",
  borderRadius: "8px",
});

export default function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  async function SendOTP(e) {
    e.preventDefault();
    try {
      await axios.post("https://localhost:4000/PaySa/User/send-otp", {
        email,
      });
      setOtpSent(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function Register(e) {
    e.preventDefault();
    await axios.post("https://localhost:4000/PaySa/User/Registration", {
      name,
      email,
      password,
      phone,
      dob,
      address,
      otp,
    });
    setName("");
    setPassword("");
    setPhone("");
    setDob("");
    setAddress("");
    setEmail("");
    setOtp("");
  }

  return (
    <Grid container style={{ minHeight: "100vh" }}>
      {/* Left Section */}
      <Grid
        item
        xs={12}
        md={6}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          padding: "2rem",
        }}
      >
        <Container maxWidth="xs">
          <Box display="flex" alignItems="center" marginBottom={4}>
            <Box
              bgcolor="#3b82f6"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              padding={1.5}
            >
              <AccountBalanceIcon />
            </Box>
            <Typography variant="h5" fontWeight="bold" marginLeft={2}>
              Paysa
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight="bold" marginBottom={2}>
            Sign up
          </Typography>

          <form onSubmit={Register}>
            <Box marginBottom={3}>
              <TextField
                fullWidth
                id="name"
                type="text"
                placeholder="John Doe"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setName(e.target.value)}
                label="Name"
              />
            </Box>
            <Box marginBottom={3}>
              <TextField
                fullWidth
                id="phone"
                type="tel"
                placeholder="123-456-7890"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
                label="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Box>
            <Box marginBottom={3}>
              <TextField
                fullWidth
                id="dob"
                type="date"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon />
                    </InputAdornment>
                  ),
                }}
                label="Date of Birth"
                onChange={(e) => setDob(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box marginBottom={3}>
              <TextField
                fullWidth
                id="address"
                type="text"
                placeholder="123 Main Street, City, State"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon />
                    </InputAdornment>
                  ),
                }}
                label="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Box>
            <Box marginBottom={3}>
              <TextField
                fullWidth
                id="email"
                type="email"
                placeholder="catherine.shaw@example.com"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                label="Email"
              />
            </Box>
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
            <Box marginBottom={3} marginTop={3}>
              <TextField
                fullWidth
                id="password"
                type="password"
                placeholder="Enter your password"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>

            <Button
              fullWidth
              variant="contained"
              type="submit"
              color="primary"
              size="large"
              style={{ marginTop: "1.5rem", backgroundColor: " #007BFF" }}
            >
              Registration
            </Button>
          </form>
          <Typography variant="body2" color="textSecondary" marginTop={3}>
            Already registered? <Link to={"/login"}>Log in</Link>
          </Typography>
        </Container>
      </Grid>

      {/* Right Section */}
      <Grid
        item
        md={6}
        style={{ GradientBox }}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <GradientBox>
          <Box>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/man-opening-bank-account-illustration-download-in-svg-png-gif-file-formats--registration-online-banking-and-finance-pack-business-illustrations-3783942.png?f=webp"
              alt="Financial transactions illustration"
              style={{ width: "400px", borderRadius: "8px" }}
            />
            <Typography variant="h5" fontWeight="bold" marginTop={2}>
              Paysa is the technology and innovation that aims to compete with
              traditional financial methods.
            </Typography>
            <Typography variant="body1" marginTop={1}>
              --
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              Nikita Murmure
            </Typography>
            <Typography variant="body2">Financial Officer</Typography>
          </Box>
        </GradientBox>
      </Grid>
    </Grid>
  );
}
