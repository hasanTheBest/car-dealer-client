import React from "react";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { Container, Grid, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Container maxWidth="sm" component="section" sx={{ padding: "4rem 0" }}>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item md={6} textAlign="center">
          <ReportGmailerrorredIcon sx={{ fontSize: "12rem" }} />
        </Grid>
        <Grid item md={6}>
          <Typography variant="h1" component="h6" mb={2}>
            404
          </Typography>
          <Typography variant="h4" component="h6">
            Page Not Found
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;
