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

const InventoryItem = ({ car }) => {
  return (
    <Grid item sm={6} md={4} lg={3} key={car._id}>
      <Card>
        <CardHeader title={car.name} subheader={car.price} />
        <CardMedia
          component="img"
          height="300"
          image={car.image}
          alt={car.name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {car.shortDescription}
          </Typography>
        </CardContent>

        <Box p={2}>
          <Button variant="contained" mx="auto">
            Explore
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default InventoryItem;
