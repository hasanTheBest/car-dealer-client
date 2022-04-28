import React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import useSWR from "swr";
import { Typography } from "@mui/material";
const fetcher = (url) => fetch(url).then((r) => r.json());

const Banner = () => {
  const { data, error } = useSWR(
    "https://car-dealer-assignment.herokuapp.com/banner",
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
    <ImageListItem>
      <img src={data[0].image} alt={data[0].name} loading="lazy" />
      <ImageListItemBar
        title={
          <Typography variant="h2" mb={2}>
            {data[0].name}
          </Typography>
        }
        subtitle={
          <Typography variant="body1" noWrap>
            {data[0].shortDescription}
          </Typography>
        }
        sx={{
          textAlign: "center",
          maxWidth: "750px",
          margin: "0 auto",
          padding: "2rem 1rem",
        }}
      />
    </ImageListItem>
  );
};

export default Banner;
