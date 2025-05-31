import Articles from "@/shared/Articles";
import StockDashboard from "@/shared/StockDashboard";
import FinancialFlowDiagram from "./_components/Tree";

const page = () => {
  return (
    <div>
      <div className="container h-[1000px] mx-auto mt-10">
        <FinancialFlowDiagram />
      </div>

      <Articles />

      <StockDashboard />
    </div>
  );
};

export default page;
