import { Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <Typography variant="subtitle2" py={2} textAlign="center">
        &copy; CarDealer, {new Date().getFullYear()} | All rights reserved
      </Typography>
    </footer>
  );
};

export default Footer;
