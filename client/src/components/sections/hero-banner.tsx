import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Premium Thrift Shopping, Curated Just For You</h1>
          <p className="text-lg mb-6">Discover handpicked secondhand treasures at a fraction of the original price.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/products">
              <Button className="bg-accent hover:bg-amber-600 text-white font-medium">
                Shop Now
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="outline" className="bg-white hover:bg-gray-100 text-primary font-medium">
                How It Works
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-1/3 h-full hidden lg:block">
        <svg viewBox="0 0 200 400" xmlns="http://www.w3.org/2000/svg" className="h-full w-full opacity-20">
          <path fill="#ffffff" d="M44.9,-76.2C59.7,-70.8,74.3,-60.9,81.8,-47.2C89.2,-33.4,89.5,-16.7,86.7,-1.6C83.9,13.5,77.9,27.1,70.3,40.2C62.6,53.4,53.3,66.3,40.4,73.2C27.6,80.1,11.3,81,-2.7,75.3C-16.6,69.6,-28.2,57.2,-38.5,45.9C-48.9,34.6,-57.9,24.5,-64.5,12.2C-71.1,-0.1,-75.3,-14.6,-73.2,-28.7C-71.1,-42.9,-62.8,-56.6,-50.3,-63.3C-37.8,-70,-19,-69.6,-1.8,-66.8C15.3,-64.1,30.2,-81.5,44.9,-76.2Z" transform="translate(100 200)" />
        </svg>
      </div>
    </section>
  );
}
