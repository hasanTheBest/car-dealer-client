import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import useSWR from "swr";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import InventoryItem from "../components/InventoryItem";

// helper
const fetcher = (url) => fetch(url).then((r) => r.json());

const MyItems = () => {
  // Authentication
  const [user, loading, errorAuth] = useAuthState(auth);

  const { data, error } = useSWR(
    `https://car-dealer-assignment.herokuapp.com/myItems?user=${user?.email}`,
    fetcher
  );

  if (error || errorAuth)
    return (
      <Typography textAlign="center" p={4} variant="h4" color="secondary">
        Error while fetching data {error.message}
      </Typography>
    );

  if (!data || loading)
    return (
      <Typography textAlign="center" variant="h1" color="primary">
        Loading ......
      </Typography>
    );
  return (
    <section>
      <Container maxWidth="lg" sx={{ padding: "4rem 0" }}>
        <Typography variant="h4" mb={6} align="center">
          Welcome{" "}
          <Typography variant="h4" component="span" color="primary">
            {user.displayName ? user.displayName : user.email.split("@")[0]}
          </Typography>
          , Your Collection
        </Typography>

        <Grid container spacing={4}>
          {data.map((car) => (
            <InventoryItem car={car} key={car._id} />
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default MyItems;
