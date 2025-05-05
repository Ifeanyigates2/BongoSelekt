import { useEffect } from "react";
import { HeroBanner } from "@/components/sections/hero-banner";
import { FeaturedCategories } from "@/components/sections/featured-categories";
import { TrendingProducts } from "@/components/sections/trending-products";
import { AIRecommendations } from "@/components/sections/ai-recommendations";
import { Features } from "@/components/sections/features";
import { CTASection } from "@/components/sections/cta-section";
import { useAuth } from "@/hooks/use-auth";

export default function HomePage() {
  // Set page title
  useEffect(() => {
    document.title = "Bongo Selekt - Premium Thrift Shopping in Nigeria";
  }, []);

  // Try to use useAuth to test if the context is working
  let user = null;
  try {
    const auth = useAuth();
    user = auth.user;
  } catch (error) {
    console.error("Auth context not available in HomePage:", error);
  }

  return (
    <>
      <HeroBanner />
      <FeaturedCategories />
      <TrendingProducts />
      <AIRecommendations />
      <Features />
      <CTASection />
    </>
  );
}
