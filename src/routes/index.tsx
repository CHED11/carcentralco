import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { PopularProducts } from "@/components/home/PopularProducts";
import { DivisionsSection } from "@/components/home/DivisionsSection";
import { ComingSoonSection } from "@/components/home/ComingSoonSection";
import { AboutSection } from "@/components/home/AboutSection";
import { SocialProof } from "@/components/home/SocialProof";

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
      {/* A guided journey: arrival → philosophy → the artifact → the
          collection → the signature cross-over → what's next → who we are. */}
      <Hero />
      <Manifesto />
      <FeaturedProduct />
      <WhyChooseUs />
      <PopularProducts />
      <DivisionsSection />
      <ComingSoonSection />
      <AboutSection />
      <SocialProof />
    </>
  );
}
