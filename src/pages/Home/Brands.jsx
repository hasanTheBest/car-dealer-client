import {
  Container,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import React from "react";

// images
import Toyota from "../../images/Toyota.svg";
import mitsubishi from "../../images/mitsubishi.svg";
import bmw from "../../images/bmw.svg";
import honda from "../../images/honda.svg";
import suzuki from "../../images/suzuki.svg";
import audi from "../../images/audi.svg";
import nissan from "../../images/nissan.png";
import tesla from "../../images/tesla.png";

const brands = [
  {
    name: "Toyota",
    image: Toyota,
    items: 10,
  },
  {
    name: "Mitsubishi",
    image: mitsubishi,
    items: 15,
  },
  {
    name: "Audi",
    image: audi,
    items: 20,
  },
  {
    name: "BMW",
    image: bmw,
    items: 10,
  },

  {
    name: "Suzuki",
    image: suzuki,
    items: 5,
  },
  {
    name: "Honda",
    image: honda,
    items: 18,
  },
  {
    name: "Nissan",
    image: nissan,
    items: 12,
  },
  {
    name: "Tesla",
    image: tesla,
    items: 3,
  },
];

const Brands = () => {
  return (
    <Container maxWidth="xl" component="section" sx={{ padding: "4rem 0" }}>
      <Typography variant="h3" mb={8} align="center">
        All Brands
      </Typography>
      <Grid container spacing={3}>
        {brands.map(({ name, image, items }, i) => (
          <Grid item sm={6} md={4} lg={3} xl={2}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={image}
                  alt={name}
                  sx={{ width: "100%", height: "auto", maxHeight: "120px" }}
                />
                <CardContent>
                  <Grid
                    container
                    spacing={2}
                    justifyContent="space-between"
                    py={1}
                  >
                    <Grid item>
                      <Typography variant="h6" component="h6">
                        {name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" component="h6">
                        {items}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Brands;
