
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const HealthMetric = ({
  title,
  value,
  max,
  unit,
  progress,
  status,
}: {
  title: string;
  value: number;
  max: number;
  unit: string;
  progress: number;
  status: "normal" | "warning" | "alert";
}) => {
  const statusColor =
    status === "normal"
      ? "text-green-600"
      : status === "warning"
      ? "text-amber-600"
      : "text-red-600";

  const progressColor =
    status === "normal"
      ? "bg-green-600"
      : status === "warning"
      ? "bg-amber-500"
      : "bg-red-500";

  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{title}</span>
        <span className={`text-sm font-medium ${statusColor}`}>
          {value} {unit}
        </span>
      </div>
      <Progress value={progress} max={100} className={progressColor} />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export const HealthStatus = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-xl">Health Metrics</CardTitle>
        <CardDescription>Your recent health measurements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <HealthMetric
          title="Blood Pressure"
          value={120}
          max={200}
          unit="mmHg"
          progress={60}
          status="normal"
        />
        <HealthMetric
          title="Heart Rate"
          value={75}
          max={220}
          unit="bpm"
          progress={35}
          status="normal"
        />
        <HealthMetric
          title="Blood Sugar"
          value={140}
          max={300}
          unit="mg/dL"
          progress={45}
          status="warning"
        />
        <HealthMetric
          title="Cholesterol"
          value={180}
          max={300}
          unit="mg/dL"
          progress={60}
          status="normal"
        />

        <div className="pt-4">
          <a
            href="/profile/health"
            className="text-sm text-medical-primary hover:underline flex justify-center"
          >
            View Full Health Report
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
