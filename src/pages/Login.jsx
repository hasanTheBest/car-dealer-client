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

    const [email, password] = [
      emailRef.current.value,
      passwordRef.current.value,
    ];

    if (!email) {
      emailRef.current.focus();
      return;
    }

    if (!password) {
      passwordRef.current.focus();
      return;
    }

    signInWithEmailAndPassword(email, password);
  };

  // handle login with google
  const handleLoginWithGoogle = () => signInWithGoogle();

  // handle sending password reset email
  const handleResetPassword = () => {
    if (!emailRef.current.value) {
      emailRef.current.focus();
      return;
    }

    sendPasswordResetEmail(emailRef.current.value);
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
    <Container maxWidth="sm" component="form" onSubmit={handleLoginFormSubmit}>
      <Typography variant="h3" textAlign="center" mt={3}>
        Login
      </Typography>
      <Grid container spacing={4} flexDirection="column" py={4}>
        {/* Email */}
        <Grid item>
          <TextField
            // error
            id="outlined-error-helper-text"
            label="Email"
            placeholder="Your email address"
            // helperText="Incorrect entry."
            type="email"
            ref={emailRef}
            required
            fullWidth
          />
        </Grid>
        {/* Password */}
        <Grid item>
          <TextField
            // error
            id="outlined-error-helper-text"
            label="Password"
            placeholder="Enter Your Password"
            // helperText="Incorrect entry."
            type="password"
            ref={passwordRef}
            required
            fullWidth
          />
        </Grid>
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
  );
};

export default Login;
