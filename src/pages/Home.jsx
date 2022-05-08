import React from "react";
import Banner from "./Home/Banner";
import Brands from "./Home/Brands";
import FeaturedCollection from "./Home/FeaturedCollection";
import LatestNews from "./Home/LatestNews";

const Home = () => {
  return (
    <main>
      <Banner />
      <FeaturedCollection />
      <Brands />
      <LatestNews />
    </main>
  );
};

export default Home;
