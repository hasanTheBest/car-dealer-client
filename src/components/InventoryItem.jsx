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

import { Box } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

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
  const handleClickUpdateStock = (id) => navigate("/inventory/" + id);

  // dele an item
  const handleClickDeleteItem = (id) => {
    setLoadingDelete(true);

    // const willDelete = window.confirm(
    //   "Are you sure? You want to delete the item."
    // );

    // if (!willDelete) return;

    fetch(`https://car-dealer-assignment.herokuapp.com/inventory/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
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

  // handle click manage item
  const handleClickManage = (id) => navigate(`/manageItem/${id}`);

  return (
    <>
      <Grid item md={6} lg={4}>
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

          {pathname === "/myItems" && (
            <Box
              p={2}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="outlined"
                onClick={() => handleClickManage(car._id)}
              >
                Manage
              </Button>
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
            </Box>
          )}

          {pathname === "/inventory" && (
            <Box p={2} sx={{ display: "flex", justifyContent: "center" }}>
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
            </Box>
          )}

          {pathname === "/" && (
            <Box p={2} sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="outlined"
                onClick={() => handleClickUpdateStock(car._id)}
              >
                Update Stock
              </Button>
            </Box>
          )}
        </Card>
      </Grid>
    </>
  );
};

export default InventoryItem;
