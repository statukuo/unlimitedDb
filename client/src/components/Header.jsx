import { Fragment, useState, React } from "react";
import {
  AppBar,
  IconButton,
  Avatar,
  List,
  ListSubheader,
  ListItemButton,
  Drawer,
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
  TopDrawer: styled(Drawer)`
    width: 100%;
    max-height: 400px !important;
    overflow: auto;
  `,
};

export default function Header() {
  const { isLoggedIn, account, logout } = useAuth();

  const [popover, setPopover] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [register, setRegister] = useState(false);

  const navigate = useNavigate();

  const openPopover = () => {
    setPopover(true);
  };

  const closePopover = () => {
    setPopover(false);
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

      <Styles.TopDrawer anchor="top" open={popover} onClose={closePopover}>
        <List style={{ minWidth: "100px" }}>
          <ListSubheader style={{ textAlign: "center" }}>
            Hello, {isLoggedIn ? account.username : "Guest"}
          </ListSubheader>
          <ListItemButton onClick={() => navigate("/")}>
            Hot decks
          </ListItemButton>
          {isLoggedIn ? (
            <ListItemButton onClick={() => navigate("/your/decks")}>
              Your decks
            </ListItemButton>
          ) : null}

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
      </Styles.TopDrawer>

      <AuthModal
        open={authModal}
        close={() => setAuthModal(false)}
        isRegisterMode={register}
        toggleRegister={() => setRegister((prev) => !prev)}
      />
    </Styles.Header>
  );
}
