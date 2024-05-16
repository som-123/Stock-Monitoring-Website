import React from "react";
import { AppBar, Toolbar, Typography, Button, Link } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Stock Monitoring Platform
        </Typography>
        {user ? (
          <div>
            <Typography variant="body1" sx={{ marginRight: "10px" }}>
              Logged in as {user.username}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Link
            component={RouterLink}
            to="/login"
            color="inherit"
            sx={{ textDecoration: "none" }}
          >
            <Button color="inherit">Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
