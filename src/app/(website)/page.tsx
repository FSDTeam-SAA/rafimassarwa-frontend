import Hero from "@/components/HomePage/Hero";
import StockSearchSection from "@/components/HomePage/StockSearchSection";
import Services from "@/components/HomePage/Services";
import StockDashboard from "@/components/HomePage/StockDashboard";
import PortfolioGrowth from "@/components/HomePage/PortfolioGrowth";
import Article from "@/components/HomePage/Articles";

export default function Home() {
  return (
    <div className="">
      <div>
        <Hero />
      </div>
      <div>
        <StockSearchSection />
      </div>
      <div>
        <Services />
      </div>

      <div>
        <PortfolioGrowth />
      </div>
      <div>
        <StockDashboard />
      </div>

      <div>
        <Article />
      </div>
    </div>
  );
}
