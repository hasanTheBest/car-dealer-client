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
import { useParams } from "react-router-dom";
import useSWR from "swr";
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

// helper
const fetcher = (url) => fetch(url).then((r) => r.json());

const ManageItem = () => {
  // Authentication
  const [user, loading, errorAuth] = useAuthState(auth);

  // id
  const { id } = useParams();

  // Reference to DOM elements
  const nameRef = useRef("");
  const priceRef = useRef("");
  const quantityRef = useRef("");
  const descRef = useRef("");
  const supplierRef = useRef("");
  const imageRef = useRef("");

  const { data, error } = useSWR(
    `https://car-dealer-assignment.herokuapp.com/inventory/${id}`,
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

  const handleSubmitUpdateItem = (e) => {
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
    // fetch(`https://car-dealer-assignment.herokuapp.com/manageItem/${id}`, {
    fetch(`http://localhost:5000/manageItem/${id}`, {
      method: "PUT",
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
        if (data?.modifiedCount) {
          toast.success("Item Successfully Updated");
        }
      })
      .catch((err) => toast.error(err.message));

    // Reset Input Field
    e.target.reset();
  };

  return (
    <>
      <Typography variant="h3" textAlign="center" mt={3}>
        Update Item: {data.name}
      </Typography>
      <Container
        maxWidth="sm"
        component="form"
        onSubmit={handleSubmitUpdateItem}
      >
        <Grid container spacing={4} flexDirection="column" py={4}>
          {/* Name */}
          <Grid item>
            <TextField
              id="outlined-error-helper-text-1"
              label="Name"
              placeholder="Name your service"
              defaultValue={data.name}
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
                <MenuItem key={img} value={img} defaultValue={data.image}>
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
              defaultValue={data.price}
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
              defaultValue={data.quantity}
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
              defaultValue={data.supplier}
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
              defaultValue={data.shortDescription}
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
                Update
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ManageItem;
