import React from "react";

import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

const Subheader = ({ price, supplier, quantity }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <span>{price}</span>
      <span>{supplier}</span>
      <span>{quantity} items</span>
    </Box>
  );
};

const InventoryItem = ({ car }) => {
  const { name, price, image, quantity, supplier, shortDescription } = car;
  const navigate = useNavigate();

  // retrieve an inventory item
  const handleClickExploreButton = (id) => navigate("/inventory/" + id);
  return (
    <Grid item sm={6} md={4} lg={3}>
      <Card>
        <CardHeader
          title={name}
          subheader={
            <Subheader price={price} supplier={supplier} quantity={quantity} />
          }
        />
        <CardMedia component="img" height="300" image={image} alt={name} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {shortDescription}
          </Typography>
        </CardContent>

        <Box p={2}>
          <Button
            variant="outlined"
            onClick={() => handleClickExploreButton(car._id)}
          >
            Update Collection
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default InventoryItem;
