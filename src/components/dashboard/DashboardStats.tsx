
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

const StatsCard = ({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
}: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-medical-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <div className="flex items-center space-x-1">
            {trend && (
              <span
                className={
                  trend === "up"
                    ? "text-green-500"
                    : trend === "down"
                    ? "text-red-500"
                    : "text-gray-500"
                }
              >
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
                {trendValue && ` ${trendValue}`}
              </span>
            )}
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const DashboardStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Upcoming Appointments"
        value="3"
        icon={<span className="text-xl">🗓️</span>}
        description="Next: Tomorrow, 10:00 AM"
      />
      <StatsCard
        title="Active Prescriptions"
        value="2"
        icon={<span className="text-xl">💊</span>}
        description="2 medications to renew"
        trend="down"
        trendValue="1"
      />
      <StatsCard
        title="Recent Tests"
        value="1"
        icon={<span className="text-xl">🔬</span>}
        description="Last test: 3 days ago"
      />
      <StatsCard
        title="Medical Records"
        value="8"
        icon={<span className="text-xl">📋</span>}
        description="Updated 1 week ago"
        trend="up"
        trendValue="2"
      />
    </div>
  );
};
