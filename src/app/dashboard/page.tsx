import { EarningsChart } from "./_components/earnings-chart";
import { MetricCard } from "./_components/metric-card";
import PathTracker from "./_components/PathTracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersChart } from "./_components/users-chart";

const page = () => {
  return (
    <div>
      <div className="mb-8">
        <PathTracker />
      </div>

      <div>
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <MetricCard
            title="Total Earnings"
            value="$75,000"
            percentageChange={10}
            changeValue="+$150 today"
          />
          <MetricCard
            title="Total User"
            value="22,300"
            percentageChange={10}
            changeValue="+200 today"
          />
          <MetricCard
            title="Paid User"
            value="11,300"
            percentageChange={10}
            changeValue="+120 today"
          />
          <MetricCard
            title="Unpaid User"
            value="11,300"
            percentageChange={10}
            changeValue="+120 today"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border border-gray-300">
            <CardHeader>
              <CardTitle>Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <EarningsChart />
            </CardContent>
          </Card>

          <Card className="border border-gray-300">
            <CardHeader>
              <CardTitle>User</CardTitle>
            </CardHeader>
            <CardContent>
              <UsersChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
