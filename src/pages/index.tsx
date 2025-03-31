import React from "react";
import Layout from "@/components/layout/Layout";
import Banner from "@/components/layout/Banner";
import SponsorIcons from "@/components/containers/SponsorIcons";
import About from "@/components/containers/About";
import Service from "@/components/containers/Service";
import Features from "@/components/containers/Features";
import Contact from "@/components/containers/Contact";

const Home = () => {
  return (
    <Layout>
      <Banner />
      <SponsorIcons />
      <About />
      <Service />
      <Features />
      <Contact />
    </Layout>
  );
};

export default Home;
