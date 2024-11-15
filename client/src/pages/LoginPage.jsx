import React, { Fragment, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { BasePage } from "./BasePage";
import styled from "styled-components";

const Styles= {
  LoginContainer: styled(Stack)`
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)';
    min-height: '100%';
    padding: 10px;
  `
};

const textFieldSx = { mx: 2, my: 0.5 };

export function LoginPage({ registerMode }) {
  const { login, register } = useAuth();

  const [isRegisterMode, setRegisterMode] = useState(registerMode);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setRegisterMode(registerMode);
  }, [registerMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clickSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      isRegisterMode ? await register(formData) : await login(formData);
      close();
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  const disabledLoginButton = !formData["email"] || !formData["password"];
  const disabledRegisterButton = !formData["username"] || !formData["email"]|| !formData["password"];

  return (
    <BasePage>
      <Styles.LoginContainer direction="column">
        {isRegisterMode ? (
          <RegisterForm formData={formData} handleChange={handleChange} />
        ) : (
          <LoginForm formData={formData} handleChange={handleChange} />
        )}

        {error && <span className="error">{error}</span>}

        {loading ? (
          <center>
            <CircularProgress color="inherit" />
          </center>
        ) : (
          <Button
            onClick={clickSubmit}
            disabled={
              isRegisterMode ? disabledRegisterButton : disabledLoginButton
            }
          >
            {isRegisterMode ? "Register" : "Login"}
          </Button>
        )}

        <Button onClick={() => setRegisterMode(!isRegisterMode)}>
          {isRegisterMode
            ? "I already have an account"
            : "I don't have an account"}
        </Button>
      </Styles.LoginContainer>
    </BasePage>
  );
}

function LoginForm({ formData, handleChange }) {
  return (
    <Fragment>
      <h1>Login to your account</h1>

      <TextField
        label="Email"
        name="email"
        type="text"
        value={formData["email"] || ""}
        onChange={handleChange}
        variant="filled"
        sx={textFieldSx}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData["password"] || ""}
        onChange={handleChange}
        variant="filled"
        sx={textFieldSx}
        required
      />
    </Fragment>
  );
}

function RegisterForm({ formData, handleChange }) {
  return (
    <Fragment>
      <h1>Create a new account</h1>

      <TextField
        label="Username"
        name="username"
        type="text"
        value={formData["username"] || ""}
        onChange={handleChange}
        variant="filled"
        sx={textFieldSx}
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData["email"] || ""}
        onChange={handleChange}
        variant="filled"
        sx={textFieldSx}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData["password"] || ""}
        onChange={handleChange}
        variant="filled"
        sx={textFieldSx}
        required
      />
    </Fragment>
  );
}
