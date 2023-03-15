import React from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Header() {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      py="16px"
      mb="24px"
      px='40px'
      boxShadow="2px 4px #eee"
    >
      <Typography fontSize="32px" fontFamily="Arial" fontWeight="600">
        Logo
      </Typography>
      <Box display="flex" alignItems="center">
        <Link
          href="/auth/login"
          sx={{
            mr: '24px'
          }}
        >
          <Button
            sx={{
              p: "12px",
              fontSize: "18px",
            }}
          >
            Sign In
          </Button>
        </Link>{" "}
        <NotificationsIcon />
      </Box>
    </Box>
  );
}
