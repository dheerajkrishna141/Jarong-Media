import AwardsSection from "@/Components/About/AwardsSection";
import FeaturesGrid from "@/Components/About/FeaturesGrid";
import HeroCarousel from "@/Components/About/HeroCarousel";
import HistorySection from "@/Components/About/History";
import ImageGallery from "@/Components/About/ImageGallery";
import NavBar from "@/Components/User/Layout/NavBar";
import Footer from "@/Components/User/Layout/Footer";
import { Box } from "@chakra-ui/react";
import type { FC } from "react";

const AboutPage: FC = () => {
  return (
    <Box>
      <NavBar />
      <HeroCarousel />
      <HistorySection />
      <ImageGallery />
      <FeaturesGrid />
      <AwardsSection />
      <Footer />
    </Box>
  );
};

export default AboutPage;
