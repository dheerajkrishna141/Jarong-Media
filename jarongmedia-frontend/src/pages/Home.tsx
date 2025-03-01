"use client";

import { Header } from "@/Components/User/Home/Header";
import { HeroSection } from "@/Components/User/Home/HeroSection";
import { InspirationBanner } from "@/Components/User/Home/InspirationBanner";
import { JourneyQuote } from "@/Components/User/Home/JourneyQuote";
import { SocialConnect } from "@/Components/User/Home/SocialConnect";
import { StatsSection } from "@/Components/User/Home/StatsSection";
import Footer from "@/Components/User/Layout/Footer";
import { Box, Container } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box as="main">
      <Header />
      <Container maxW="container.xl" py={8}>
        <HeroSection />
      </Container>
      <Container maxW="container.xl" py={16}>
        <InspirationBanner />
      </Container>
      <Container maxW="container.xl" py={16}>
        <StatsSection />
      </Container>
      <Container maxW="container.xl" py={16}>
        <JourneyQuote />
      </Container>
      <Footer />
    </Box>
  );
};

export default Home;
