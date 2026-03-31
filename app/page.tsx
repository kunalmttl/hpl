import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-background">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-primary">
        Hindustan Pharma Logistics
      </h1>
      <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl">
        Professional Pharmaceutical C&F, Super Stockist, and Distribution services in Indore and across Madhya Pradesh.
      </p>
      <div className="flex items-center justify-center mt-10 gap-x-6">
        <Button size="lg" className="px-8">
          Our Services
        </Button>
        <Button variant="outline" size="lg" className="px-8">
          Contact Us
        </Button>
      </div>
      
      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {["C&F Agency", "Super Stockist", "Consignee Agent", "Direct Distribution"].map((service) => (
          <div key={service} className="p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
            <h3 className="font-semibold">{service}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
