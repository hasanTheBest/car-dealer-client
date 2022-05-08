import {
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";

import toast from "react-hot-toast";

import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const Login = () => {
  // Reference to DOM elements
  const emailRef = useRef("");
  const passwordRef = useRef("");

  // Social login
  const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] =
    useSignInWithGoogle(auth);

  // password reset email sending
  const [sendPasswordResetEmail, sendingReset, errorReset] =
    useSendPasswordResetEmail(auth);

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const [signInWithEmailAndPassword, userLogin, loadingLogin, errorLogin] =
    useSignInWithEmailAndPassword(auth);

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();

    const [emailInputRef, passwordInputRef] = [
      emailRef.current.lastElementChild.firstElementChild,
      passwordRef.current.lastElementChild.firstElementChild,
    ];

    const [email, password] = [emailInputRef.value, passwordInputRef.value];

    if (!email) {
      emailInputRef.focus();
      return;
    }

    if (!password) {
      passwordInputRef.focus();
      return;
    }
    signInWithEmailAndPassword(email, password);
  };

  // handle login with google
  const handleLoginWithGoogle = () => signInWithGoogle();

  // handle sending password reset email
  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!emailRef.current.lastElementChild.firstElementChild.value) {
      emailRef.current.lastElementChild.firstElementChild.focus();
      return;
    }

    sendPasswordResetEmail(
      emailRef.current.lastElementChild.firstElementChild.value
    );
  };

  // if user exist go to the target page
  if (userLogin || userGoogle) {
    navigate(from, { replace: true });
  }
  // password reset error
  if (errorReset) {
    toast.error(errorReset.message);
  }
  // password reset email sending
  if (sendingReset) {
    toast.success("Password reset email is sent.");
  }
  return (
    <section>
      <Typography variant="h3" textAlign="center" mt={3}>
        Login
      </Typography>
      <Container
        maxWidth="sm"
        component="form"
        onSubmit={handleLoginFormSubmit}
      >
        <Grid container spacing={4} flexDirection="column" py={4}>
          {/* Email */}
          <Grid item>
            <TextField
              id="outlined-error-helper-text-1"
              label="Email"
              placeholder="Your email address"
              type="email"
              ref={emailRef}
              required
              fullWidth
            />
          </Grid>
          {/* Password */}
          <Grid item>
            <TextField
              id="outlined-error-helper-text-2"
              label="Password"
              placeholder="Enter Your Password"
              type="password"
              ref={passwordRef}
              required
              fullWidth
            />
          </Grid>
          {/* error message */}
          {errorLogin && (
            <Grid item>
              <Typography paragraph my={-2} color="red">
                {errorLogin.message}
              </Typography>
            </Grid>
          )}

          {/* Submit Button */}
          <Grid item container spacing={2} alignItems="center">
            <Grid item>
              <Button type="submit" variant="contained" size="large">
                Login
              </Button>
            </Grid>
            <Grid item>
              <Typography paragraph mb={0}>
                New User?
                <Button variant="text" component={RouterLink} to="/register">
                  Register
                </Button>
              </Typography>
            </Grid>
          </Grid>
          <Grid item my={-2}>
            <Typography paragraph mb={0}>
              Forget Password?
              <Button variant="text" onClick={handleResetPassword}>
                Reset
              </Button>
            </Typography>
          </Grid>

          <Grid item>
            <Divider />
          </Grid>

          {errorGoogle && (
            <Grid item>
              <Typography paragraph my={-2} color="red">
                {errorGoogle.message}
              </Typography>
            </Grid>
          )}
          <Grid item>
            <Button
              type="submit"
              variant="outlined"
              onClick={handleLoginWithGoogle}
            >
              Login with Google
            </Button>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Login;
