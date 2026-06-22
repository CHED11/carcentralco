import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { PopularProducts } from "@/components/home/PopularProducts";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { DivisionsSection } from "@/components/home/DivisionsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { AboutSection } from "@/components/home/AboutSection";
import { SocialProof } from "@/components/home/SocialProof";
import { ComingSoonSection } from "@/components/home/ComingSoonSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CarCentralCo — Automotive Art For Enthusiasts" },
      {
        name: "description",
        content:
          "Premium collector-grade posters inspired by the world's most legendary performance cars. Discover the Porsche 918 Spyder collector edition.",
      },
      { property: "og:title", content: "CarCentralCo — Automotive Art For Enthusiasts" },
      {
        property: "og:description",
        content:
          "Premium collector-grade posters inspired by the world's most legendary performance cars.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <PopularProducts />
      <FeaturedProduct />
      <DivisionsSection />
      <WhyChooseUs />
      <AboutSection />
      <SocialProof />
      <ComingSoonSection />
    </>
  );
}
