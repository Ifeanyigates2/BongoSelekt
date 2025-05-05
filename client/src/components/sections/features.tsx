import { FeatureCard } from "@/components/ui/feature-card";
import { ShieldCheck, Tag, Recycle } from "lucide-react";

export function Features() {
  return (
    <section className="py-10 bg-light">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose Bongo Selekt</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={ShieldCheck} 
            title="Quality Verified" 
            description="All products are thoroughly inspected to ensure they meet our quality standards."
            color="bg-primary/10 text-primary"
          />
          
          <FeatureCard 
            icon={Tag} 
            title="Amazing Value" 
            description="Get premium products at a fraction of their original retail price."
            color="bg-secondary/10 text-secondary"
          />
          
          <FeatureCard 
            icon={Recycle} 
            title="Sustainable Shopping" 
            description="Shop secondhand to reduce waste and promote environmental sustainability."
            color="bg-accent/10 text-accent"
          />
        </div>
      </div>
    </section>
  );
}
