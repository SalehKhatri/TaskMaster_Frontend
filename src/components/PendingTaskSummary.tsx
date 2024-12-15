import { usePendingTaskSummary } from "@/hooks/TaskHooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, AlertCircle, HourglassIcon } from "lucide-react";
import Loader from "@/components/Loader.tsx";

interface PendingTaskSummaryData {
  numberOfPendingTasks: number;
  totalTimeLapsed: number;
  totalEstimatedTimeToFinish: number;
}

const SummaryItem = ({
  icon,
  title,
  value,
  unit,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
  unit: string;
}) => (
  <div className="flex items-center space-x-4 bg-white rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-blue-50">
    <div className="p-2 md:p-3 bg-blue-100 text-blue-700 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm md:text-xl font-medium text-gray-500">{title}</p>
      <h4 className="text-xl font-bold text-gray-800">
        {value}{" "}
        <span className="text-sm md:text-lg font-normal text-gray-500">
          {unit}
        </span>
      </h4>
    </div>
  </div>
);

const PendingTaskSummary: React.FC = () => {
  const { data, isLoading, isError } = usePendingTaskSummary();

  if (isError)
    return (
      <div className="text-center text-red-500">
        Error fetching pending task summary
      </div>
    );

  const summary: PendingTaskSummaryData | null | undefined = data?.data;

  return (
    <Card className="w-full h-full max-w-3xl bg-gray-50 border-none shadow-lg">
      <CardHeader className="text-white bg-gradient-to-r from-zinc-700 to-gray-800 md:from-gray-800 md:to-zinc-700  rounded-t-lg p-4 md:p-6">
        <CardTitle className="text-xl md:text-3xl font-primary font-semibold text-center">
          Pending Task
        </CardTitle>
      </CardHeader>
      {isLoading ? (
        <CardContent
          className={"min-h-[400px] flex justify-center items-center"}
        >
          <Loader />
        </CardContent>
      ) : (
        <CardContent className="grid  gap-6 p-6 ">
          <div className="grid grid-cols-1 gap-5">
            <SummaryItem
              icon={<AlertCircle className="size-5 md:size-7" />}
              title="Pending Tasks"
              value={summary?.numberOfPendingTasks || 0}
              unit="tasks"
            />
            <SummaryItem
              icon={<Clock className="size-5 md:size-7" />}
              title="Time Elapsed"
              value={summary?.totalTimeLapsed || 0}
              unit="hours"
            />
            <SummaryItem
              icon={<HourglassIcon className="size-5 md:size-7" />}
              title="Estimated Time to Finish"
              value={summary?.totalEstimatedTimeToFinish || 0}
              unit="hours"
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default PendingTaskSummary;
