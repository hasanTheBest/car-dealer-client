import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useSWR from "swr";

// helper
const fetcher = (url) => fetch(url).then((r) => r.json());

const FeaturedCollection = () => {
  const { data, error } = useSWR(
    "https://car-dealer-assignment.herokuapp.com/featured",
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
        <Grid container spacing={4}>
          {data.map((car) => (
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
                  </Button>{" "}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default FeaturedCollection;
