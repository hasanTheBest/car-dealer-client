import * as React from "react";
import {
  Grid,
  IconButton,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { Box } from "@mui/system";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function InventoryItemUpdate() {
  const { id } = useParams();

  const { data, error } = useSWR(
    `https://car-dealer-assignment.herokuapp.com/inventory/${id}`,
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
      <Typography textAlign="center" variant="h3" color="primary" p={2}>
        Loading ......
      </Typography>
    );

  return (
    <Grid container flexDirection="column" spacing={3}>
      <Grid item>
        {/* sx={{ mt: 4, mb: 2, width: "100%", height: "300px" }} */}
        <Box>
          <img
            src={data.image}
            alt={data.name}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
        <List sx={{ maxWidth: "750px", margin: "0 auto" }}>
          {Object.entries(data).map(([key, value]) => {
            if (key === "image") return;

            return (
              <ListItem key={key}>
                <ListItemAvatar sx={{ width: "25%" }}>
                  <Typography variant="body1">
                    {key === "_id" ? "ID" : key.toUpperCase()}
                  </Typography>
                </ListItemAvatar>
                <ListItemText primary={value} />
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
}
