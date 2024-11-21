import { Fragment, useState, React } from "react";
import {
  AppBar,
  IconButton,
  Avatar,
  Popover,
  List,
  ListSubheader,
  ListItemButton,
} from "@mui/material";
import OnlineIndicator from "./OnlineIndicator";
import AuthModal from "./AuthModal";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Styles = {
  Header: styled(AppBar)`
    width: 100% !important;
    padding: 0 1rem !important;
    background-color: whitesmoke !important;
    color: black !important;

    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
  `,
};

export default function Header() {
  const { isLoggedIn, account, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const [popover, setPopover] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [register, setRegister] = useState(false);

  const navigate = useNavigate();

  const openPopover = (e) => {
    setPopover(true);
    setAnchorEl(e.currentTarget);
  };

  const closePopover = () => {
    setPopover(false);
    setAnchorEl(null);
  };

  const clickCollection = () => {
    navigate("/collection");
  };

  const clickLogin = () => {
    navigate("/login");
  };

  const clickRegister = () => {
    navigate("/register");
  };

  return (
    <Styles.Header className="header" position="static">
      <h1>UnlimitedDB</h1>

      <IconButton onClick={openPopover}>
        <OnlineIndicator online={isLoggedIn}>
          <Avatar src={account?.username || ""} alt={account?.username || ""} />
        </OnlineIndicator>
      </IconButton>

      <Popover
        anchorEl={anchorEl}
        open={popover}
        onClose={closePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <List style={{ minWidth: "100px" }}>
          <ListSubheader style={{ textAlign: "center" }}>
            Hello, {isLoggedIn ? account.username : "Guest"}
          </ListSubheader>
          <ListItemButton onClick={() => navigate("/")}>Home</ListItemButton>

          <ListItemButton onClick={() => navigate("/cards")}>
            Cards
          </ListItemButton>

          {isLoggedIn ? (
            <Fragment>
              <ListItemButton onClick={clickCollection}>
                Collection
              </ListItemButton>
              <ListItemButton onClick={logout}>Logout</ListItemButton>
            </Fragment>
          ) : (
            <Fragment>
              <ListItemButton onClick={clickLogin}>Login</ListItemButton>
              <ListItemButton onClick={clickRegister}>Register</ListItemButton>
            </Fragment>
          )}
        </List>
      </Popover>

      <AuthModal
        open={authModal}
        close={() => setAuthModal(false)}
        isRegisterMode={register}
        toggleRegister={() => setRegister((prev) => !prev)}
      />
    </Styles.Header>
  );
}
