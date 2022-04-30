import React, { useState } from "react";

import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

import { Box } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

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
  const [loadingDelete, setLoadingDelete] = useState(false);

  const { name, price, image, quantity, supplier, shortDescription } = car;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // retrieve an inventory item
  const handleClickExploreButton = (id) => navigate("/inventory/" + id);

  // dele an item
  const handleClickDeleteItem = (id) => {
    setLoadingDelete(true);

    fetch(`https://car-dealer-assignment.herokuapp.com/inventory/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setLoadingDelete(false);
        if (data.deletedCount === 1) {
          toast.success("Successfully deleted one document.");
        } else {
          toast.error("No document is deleted. try after reloading the page");
        }
      })
      .catch((err) => {
        toast.error(err.message);
        setLoadingDelete(false);
      });
  };

  return (
    <>
      <Grid item sm={6} md={4} lg={3}>
        <Card>
          <CardHeader
            title={name}
            subheader={
              <Subheader
                price={price}
                supplier={supplier}
                quantity={quantity}
              />
            }
          />
          <CardMedia component="img" height="300" image={image} alt={name} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {shortDescription}
            </Typography>
          </CardContent>

          <Box p={2}>
            {pathname === "/inventory" ? (
              <LoadingButton
                color="error"
                onClick={() => handleClickDeleteItem(car._id)}
                loading={loadingDelete}
                loadingPosition="start"
                startIcon={<DeleteIcon />}
                variant="outlined"
              >
                Delete
              </LoadingButton>
            ) : (
              <Button
                variant="outlined"
                onClick={() => handleClickExploreButton(car._id)}
              >
                Update
              </Button>
            )}
          </Box>
        </Card>
      </Grid>
      <Toaster />
    </>
  );
};

export default InventoryItem;
