import { Container, Typography } from "@mui/material";
import React from "react";
import JSvsNode from "./Blog/JSvsNode";
import JWTToken from "./Blog/JWTToken";
import SqlvsNoSql from "./Blog/SqlvsNoSql";

const Blog = () => {
  return (
    <Container maxWidth="md" component="section" sx={{ padding: "4rem 0" }}>
      <Typography variant="h3" mb={4} textAlign="center">
        Conceptual Terms
      </Typography>

      <JSvsNode />
      <JWTToken />
      <SqlvsNoSql />
    </Container>
  );
};

export default Blog;
