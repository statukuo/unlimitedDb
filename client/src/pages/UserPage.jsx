import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button, Stack, Typography } from "@mui/material";
import { BasePage } from "./BasePage";
import styled from "styled-components";

const Styles = {
  LoginContainer: styled(Stack)`
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)";
    min-height: "100%";
    padding: 10px;
  `,
};

export function UserPage() {
  const { account, logout } = useAuth();

  return (
    <BasePage>
      <Styles.LoginContainer direction="column">
        <h2>Username</h2>
        <Typography>{account.username}</Typography>

        <h2>Email</h2>
        <Typography>{account.email}</Typography>
        <h2>Role</h2>
        <Typography>{account.role}</Typography>
        <h2>Created at</h2>
        <Typography>{account.createdAt}</Typography>

        <Button onClick={logout}>Logout</Button>
      </Styles.LoginContainer>
    </BasePage>
  );
}
