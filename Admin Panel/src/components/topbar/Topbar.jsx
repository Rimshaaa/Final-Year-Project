import React from "react";
import "./topbar.css";
import { Settings } from "@mui/icons-material";
import { Link, Navigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/auth";

export default function Topbar() {
  const user = useSelector((state) => state.authReducer.activeUser);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    handleCloseUserMenu();
    <Navigate to="/" />;
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/admin" className="logo">
            Admin
          </Link>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div> */}
          <div className="topbarIconContainer">
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Logout">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Settings />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Account</Typography>
                </MenuItem> */}
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </div>

          <img
            src="/protection.png"
            alt="avatar"
            className="topAvatar"
            style={{ objectFit: "cover", cursor: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}
