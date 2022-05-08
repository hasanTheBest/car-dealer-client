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
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const Register = () => {
  // Reference to DOM elements
  const emailRef = useRef("");
  const passwordRef = useRef("");

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  // Social
  const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] =
    useSignInWithGoogle(auth);

  // create user with email and password
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

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
    createUserWithEmailAndPassword(email, password);
  };

  // handle login with google
  const handleLoginWithGoogle = () => signInWithGoogle();

  // if user exist go to the target page
  if (user) {
    toast.success("Verification Email sent");
    // user.emailVerified ? navigate(from, { replace: true }) : navigate("/verify")
    console.log(user);
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
          {error && (
            <Grid item>
              <Typography paragraph my={-2} color="red">
                {error.message}
              </Typography>
            </Grid>
          )}

          {/* Submit Button */}
          <Grid item container spacing={2} alignItems="center">
            <Grid item>
              <Button type="submit" variant="contained" size="large">
                Register
              </Button>
            </Grid>
            <Grid item>
              <Typography paragraph mb={0}>
                Already a User?
                <Button variant="text" component={RouterLink} to="/login">
                  Login
                </Button>
              </Typography>
            </Grid>
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
              Register with Google
            </Button>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Register;
