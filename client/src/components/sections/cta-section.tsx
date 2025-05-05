import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-10 bg-dark text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Ready to start selling?</h2>
            <p className="text-gray-300">Turn your unused items into cash. Listing is quick and easy!</p>
          </div>
          <Link href="/sell">
            <Button className="bg-accent hover:bg-amber-600 text-white font-medium py-3 px-8">
              Start Selling
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
