import { Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../firebase.init";

function RequireAuth({ children }) {
  const [user, loading, error] = useAuthState(auth);
  let location = useLocation();

  if (error) {
    return (
      <Typography variant="h3" color="secondary" textAlign="center">
        {error.message}
      </Typography>
    );
  }

  if (loading) {
    return (
      <Typography variant="h3" color="primary" textAlign="center">
        Loading...
      </Typography>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
