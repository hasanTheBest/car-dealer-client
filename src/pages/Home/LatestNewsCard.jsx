import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";

export default function LatestNewsCard({
  title,
  image,
  date,
  description,
  tag,
}) {
  return (
    <Grid item xs sm={6} md={4} lg={3}>
      <Card>
        <CardActionArea>
          <CardMedia component="img" height="140" image={image} alt={title} />
          <CardContent>
            <Grid container spacing={2} justifyContent="space-between" py={1}>
              <Grid item>
                <Typography variant="subtitle2" component="span">
                  {date}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" component="span">
                  {tag.toUpperCase()}
                </Typography>
              </Grid>
            </Grid>
            <Typography gutterBottom variant="h6" component="h6" title={title}>
              {title.slice(0, 50) + "..."}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description.slice(0, 200) + "..."}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
