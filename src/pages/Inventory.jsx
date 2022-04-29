import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import useSWR from "swr";
import InventoryItem from "../../components/InventoryItem";

// helper
const fetcher = (url) => fetch(url).then((r) => r.json());

const Inventory = () => {
  const { data, error } = useSWR(
    "https://car-dealer-assignment.herokuapp.com/inventory",
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
        <Typography text="secondary" variant="h2" my="4" textAlign="center">
          All Cars
        </Typography>
        <Grid container spacing={4}>
          {data.map((car) => (
            <InventoryItem car={car} />
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default Inventory;