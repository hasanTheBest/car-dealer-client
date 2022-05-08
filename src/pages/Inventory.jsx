import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import useSWR from "swr";
import InventoryItem from "../components/InventoryItem";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// helper
const fetcher = (url) => fetch(url).then((r) => r.json());

const Inventory = () => {
  // Router
  const navigate = useNavigate();

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

  // handle click add one button
  const handleAddOneClick = () => navigate("/addItem");

  return (
    <section>
      <Container maxWidth="lg" sx={{ padding: "4rem 0" }}>
        <Typography text="secondary" variant="h2" pb={4} textAlign="center">
          All Cars |{" "}
          <Button
            variant="outlined"
            size="large"
            color="success"
            startIcon={<Add />}
            onClick={handleAddOneClick}
          >
            Add One
          </Button>
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

export default Inventory;
