import React from "react";
import { Grid, Typography, Container } from "@mui/material";
import LatestNewsCard from "./LatestNewsCard";

// images
import blog1 from "../../images/blog-1.jpg";
import blog2 from "../../images/blog-2.jpg";
import blog3 from "../../images/blog-3.jpg";
import blog4 from "../../images/blog-4.jpg";

const news = [
  {
    title:
      "Solterra and Forester Wilderness rekindled my love for Subaru | Opinion",
    image: blog1,
    date: "Dec 31, 2019",
    tag: "opinion",
    description:
      "BUCKEYE, Ariz. — When I was getting ready to get my driver’s license in the late 1990s, I was obsessed with the first-generation Subaru Outback. I already had a thing for wagons, it appeared, and an all-wheel-drive wagon only seemed cooler. I ended up with my sister’s S-10 Blazer, and later an XJ Cherokee, but my heart would still skip a beat when I saw those big windows perched on top of a layer cake of sheet metal and plastic cladding. It was in love.",
  },
  {
    title: "Dodge Hornet spy photos show close Alfa Romeo resemblance",
    image: blog2,
    date: "Jun 30, 2020",
    tag: "spy shots",
    description:
      "A few months ago, leaked photos showed that there would be a Dodge variant of the Alfa Romeo Tonale SUV. Now one of our spy photographers has caught a prototype that seems to verify the accuracy of those leaked images. Indeed, it appears the tentatively-called Dodge Hornet will basically be a Tonale with a Dodge face.",
  },
  {
    title: "Lucid is raising prices on its luxury Air EV by as much as 13%",
    image: blog3,
    date: "Feb 28, 2021",
    tag: "Official",
    description:
      "Lucid Group is the latest automaker to up the price of its electric vehicles. The company announced Thursday alongside its first-quarter earnings report that it was raising prices of the variants of its luxury Air sedan, beginning June 1. The price hikes push the base price of the Air sedan as much as 13%.",
  },
  {
    title: "Junkyard Gem: 1967 Rambler Rebel 770 Sedan",
    image: blog4,
    date: "May 31, 2021",
    tag: "vintage",
    description:
      "The American Motors Corporation, formed by the merger of Hudson and Nash in 1954, did fairly well by selling sensible (and mostly small) cars during the late 1950s and well into the following decade. By the middle 1960s, however, the Detroit Big Three were giving the Kenoshans a beating on the showroom floor and something had to be done to expand the product line. To claw back some sales from the hot-selling midsize Chevelles, Fairlanes and Belvederes, AMC designed an all-new intermediate platform for the 1967 model year; this car launched as the Rambler Rebel. Rebels have been all but absent from American roads for the last 40 years, but I managed to find this high-trim-level 770 in a self-service yard just south of Denver.",
  },
];

const LatestNews = () => {
  return (
    <Container maxWidth="lg" component="section" sx={{ padding: "4rem 0" }}>
      <Typography variant="h3" mb={8} align="center">
        Latest News
      </Typography>

      <Grid container spacing={3}>
        {news.map((article, i) => (
          <LatestNewsCard key={i} {...article} />
        ))}
      </Grid>
    </Container>
  );
};

export default LatestNews;
