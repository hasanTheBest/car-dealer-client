import * as React from "react";
import {
  Grid,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Input,
  FormControl,
} from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import useSWR from "swr";
import { Box } from "@mui/system";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function InventoryItemUpdate() {
  const { id } = useParams();

  // get the specific item
  const { data, error } = useSWR(
    `https://car-dealer-assignment.herokuapp.com/inventory/${id}`,
    fetcher
  );

  if (error)
    return (
      <Typography textAlign="center" p={4} variant="h4" color="secondary">
        Error while fetching data, {error.message}
      </Typography>
    );

  if (!data)
    return (
      <Typography textAlign="center" variant="h3" color="primary" p={2}>
        Loading ......
      </Typography>
    );

  // handle click delivery button
  const handleDeliveryItem = (quantity) => {
    if (quantity === 1) {
      return;
    }
    const newQuantity = parseInt(quantity) - 1;
    console.log(quantity, newQuantity);

    fetch(`https://car-dealer-assignment.herokuapp.com/inventory/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQuantity }),
    })
      .then((r) => r.json())
      .then((data) => console.log(data));
  };

  // handle add item to stock
  const handleAddItem = (e, quantity) => {
    e.preventDefault();

    // console.log(e.target.quantity.value);
    const newQuantity = parseInt(e.target.quantity.value) + parseInt(quantity);

    fetch(`https://car-dealer-assignment.herokuapp.com/inventory/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQuantity }),
    })
      .then((r) => r.json())
      .then((data) => console.log(data));
  };

  return (
    <Grid container flexDirection="column" spacing={3}>
      <Grid item>
        <Box>
          <img
            src={data.image}
            alt={data.name}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
        <List sx={{ maxWidth: "750px", margin: "0 auto" }}>
          {Object.entries(data).map(([key, value]) => {
            if (key === "image") return;

            return (
              <ListItem key={key}>
                <ListItemAvatar sx={{ width: "25%" }}>
                  <Typography variant="body1">
                    {key === "_id" ? "ID" : key.toUpperCase()}
                  </Typography>
                </ListItemAvatar>
                <ListItemText primary={value} />
              </ListItem>
            );
          })}
        </List>
      </Grid>
      <Grid item>
        <Box
          sx={{
            maxWidth: "750px",
            margin: "0 auto",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            onClick={() => handleDeliveryItem(data.quantity)}
          >
            Delivery
          </Button>
          <Button variant="outlined" component={RouterLink} to="/inventory">
            Manage stock
          </Button>
          <FormControl
            sx={{
              flexDirection: "row",
              gap: ".5rem",
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
            component="form"
            onSubmit={(e) => handleAddItem(e, data.quantity)}
          >
            <Input
              id="increaseStock"
              type="number"
              placeholder="Increase stock"
              name="quantity"
              required
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
}
