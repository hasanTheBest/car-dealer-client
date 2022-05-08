import {
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../firebase.init";

const images = [
  "https://www.autosbangla.com/images/nissan/nissan-xtrail-img1.jpg",
  "https://www.autosbangla.com/images/honda/honda-hrv-img1.jpg",
  "https://www.autosbangla.com/images/mitsubishi/mitsubish-outlander-img1.jpg",
  "https://www.autosbangla.com/images/toyota/toyota-rav4-img1.jpg",
  "https://www.autosbangla.com/images/mitsubishi/mitsubish-pajero-sport-img1.jpg",
  "https://www.autosbangla.com/images/toyota/toyota-prado-img1.jpg",
  "https://www.autosbangla.com/images/audi/audi-q7-img1.jpg",
];

const AddItem = () => {
  // Authentication
  const [user, loading, error] = useAuthState(auth);
  let location = useLocation();

  // Reference to DOM elements
  const nameRef = useRef("");
  const priceRef = useRef("");
  const quantityRef = useRef("");
  const descRef = useRef("");
  const supplierRef = useRef("");
  const imageRef = useRef("");

  const handleSubmitAddItem = (e) => {
    e.preventDefault();

    const [
      nameInputRef,
      imageInputRef,
      priceInputRef,
      quantityInputRef,
      supplierInputRef,
      descInputRef,
    ] = [
      nameRef.current.lastElementChild.firstElementChild,
      imageRef.current.lastElementChild.children[1],
      priceRef.current.lastElementChild.firstElementChild,
      quantityRef.current.lastElementChild.firstElementChild,
      supplierRef.current.lastElementChild.firstElementChild,
      descRef.current.lastElementChild.firstElementChild,
    ];

    const [name, image, price, quantity, supplier, desc] = [
      nameInputRef.value,
      imageInputRef.value,
      priceInputRef.value,
      quantityInputRef.value,
      supplierInputRef.value,
      descInputRef.value,
    ];

    // send data to server
    // fetch("http://localhost:5000/addItem", {
    fetch("https://car-dealer-assignment.herokuapp.com/addItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        image,
        price,
        quantity,
        supplier,
        email: user?.email,
        shortDescription: desc,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.insertedId) {
          toast.success("Item Successfully Added");
        }
      })
      .catch((err) => toast.error(err.message));

    // Reset Input Field
    e.target.reset();
  };

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

  return (
    <>
      <Typography variant="h3" textAlign="center" mt={3}>
        Add Item
      </Typography>
      <Container maxWidth="sm" component="form" onSubmit={handleSubmitAddItem}>
        <Grid container spacing={4} flexDirection="column" py={4}>
          {/* Name */}
          <Grid item>
            <TextField
              id="outlined-error-helper-text-1"
              label="Name"
              placeholder="Name your service"
              type="text"
              ref={nameRef}
              required
              fullWidth
            />
          </Grid>
          {/* Name */}
          <Grid item>
            <TextField
              label="Email"
              type="email"
              value={user?.email}
              disabled
              fullWidth
            />
          </Grid>
          {/* Image */}
          <Grid item>
            <TextField
              id="outlined-select-currency"
              label="Image"
              ref={imageRef}
              select
              required
              fullWidth
            >
              {images.map((img) => (
                <MenuItem key={img} value={img} defaultValue="Select">
                  {img}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* price */}
          <Grid item>
            <TextField
              id="outlined-error-helper-text-2"
              label="Price"
              placeholder="Price"
              type="text"
              ref={priceRef}
              required
              fullWidth
            />
          </Grid>

          {/* Quantity */}
          <Grid item>
            <TextField
              id="outlined-error-helper-text-3"
              label="Quantity"
              placeholder="Quantity"
              type="number"
              ref={quantityRef}
              required
              fullWidth
            />
          </Grid>

          {/* Supplier */}
          <Grid item>
            <TextField
              id="outlined-error-helper-text-4"
              label="Supplier"
              placeholder="Brand"
              type="text"
              ref={supplierRef}
              required
              fullWidth
            />
          </Grid>

          {/* desc */}
          <Grid item>
            <TextField
              id="outlined-error-helper-text-5"
              label="Short description"
              placeholder="Write brief summary"
              ref={descRef}
              rows={4}
              multiline
              required
              fullWidth
            />
          </Grid>

          {/* Submit Button */}
          <Grid item container spacing={2} alignItems="center">
            <Grid item>
              <Button type="submit" variant="contained" size="large">
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AddItem;
