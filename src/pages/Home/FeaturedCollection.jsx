import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import useSWR from "swr";
import InventoryItem from "../../components/InventoryItem";
import { Link as RouterLink } from "react-router-dom";

// helper
const fetcher = (url) => fetch(url).then((r) => r.json());

const FeaturedCollection = () => {
  const { data, error } = useSWR(
    "https://car-dealer-assignment.herokuapp.com/featured",
    fetcher
  );

  if (error)
    return (
      <Typography textAlign="center" p={4} variant="h4" color="secondary">
        Error while fetching data {error.message}
      </Typography>
    );

  if (!data)
    return (
      <Typography textAlign="center" variant="h1" color="primary">
        Loading ......
      </Typography>
    );
  return (
    <section>
      <Container maxWidth="lg" sx={{ padding: "4rem 0" }}>
        <Grid container spacing={4}>
          {data.map((car) => (
            <InventoryItem car={car} key={car._id} />
          ))}
        </Grid>

        <Grid container spacing={2} justifyContent="center" mt={4}>
          <Grid item>
            <Button
              component={RouterLink}
              variant="contained"
              size="large"
              to="/inventory"
            >
              Explore All
            </Button>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default FeaturedCollection;
