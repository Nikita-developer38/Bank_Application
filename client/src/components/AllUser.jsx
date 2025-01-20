import React, { useContext } from "react";
import { Box, useMediaQuery } from "@mui/material";
import AdminSidebar from "./AdminSidebar";

import { authContext } from "../context/auth";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Drawer,
  Toolbar,
  IconButton,
  InputBase,
} from "@mui/material";
import { Menu, Search } from "@mui/icons-material";
import { CardMedia, Tooltip, Avatar } from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";

function AllUser() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const { allUser } = useContext(authContext);
  console.log(allUser);
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
          {/* Card List */}
          <Grid container spacing={2}>
            {allUser.map((user, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    maxWidth: 345,
                    borderRadius: 4,
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    transition: "transform 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  {/* Profile Image */}
                  <CardMedia
                    component="img"
                    height="140"
                    image={user.profileImage}
                    alt={`${user.name}'s profile`}
                  />

                  {/* Card Content */}
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar
                        src={user.profileImage}
                        alt={user.name}
                        sx={{
                          width: 56,
                          height: 56,
                          border: "2px solid #4caf50",
                          marginRight: 2,
                        }}
                      />
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        {user.name}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" mb={1}>
                      <Email
                        fontSize="small"
                        sx={{ marginRight: 1, color: "#1976d2" }}
                      />
                      {user.email}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={1}>
                      <Phone
                        fontSize="small"
                        sx={{ marginRight: 1, color: "#4caf50" }}
                      />
                      {user.phone}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      <LocationOn
                        fontSize="small"
                        sx={{ marginRight: 1, color: "#f44336" }}
                      />
                      {user.address}
                    </Typography>
                  </CardContent>

                  {/* Action Buttons */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    p={2}
                    bgcolor="#f9f9f9"
                  >
                    <Tooltip title="Send Email">
                      <IconButton href={`mailto:${user.email}`} color="primary">
                        <Email />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Call User">
                      <IconButton href={`tel:${user.phone}`} color="success">
                        <Phone />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Location">
                      <IconButton color="error">
                        <LocationOn />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default AllUser;
