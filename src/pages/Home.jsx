import React from "react";
import Banner from "./Home/Banner";
import FeaturedCollection from "./Home/FeaturedCollection";
import LatestNews from "./Home/LatestNews";

const Home = () => {
  return (
    <main>
      <Banner />
      <FeaturedCollection />
      <LatestNews />
    </main>
  );
};

export default Home;
