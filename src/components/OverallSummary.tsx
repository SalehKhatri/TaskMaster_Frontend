import { useSummary } from "@/hooks/TaskHooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, ListTodo, AlertCircle } from "lucide-react";
import Loader from "@/components/Loader.tsx";

interface SummaryData {
  totalTasks: number;
  completedPercentage: number;
  pendingPercentage: number;
  averageTimePerCompletedTask: number;
}

const SummaryItem = ({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  description?: string;
}) => (
  <div className="flex items-center space-x-4 bg-white rounded-lg p-3 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-blue-50">
    <div className="p-2 md:p-3 bg-blue-100 text-blue-700 rounded-full">
      {icon}
    </div>
    <div>
      <h4 className="text-2xl font-bold text-gray-800 mb-1">
        {value}
        {description && (
          <span className="text-base font-normal text-gray-500 ml-1">
            ({description})
          </span>
        )}
      </h4>
      <p className="text-sm font-medium text-gray-500">{title}</p>
    </div>
  </div>
);

const OverallSummary:React.FC = () => {
  const { data, isLoading, isError } = useSummary();

  if (isError)
    return (
      <Card className="w-full max-w-3xl">
        <CardContent className="p-6 text-center text-destructive">
          Error fetching summary data
        </CardContent>
      </Card>
    );

  const summary: SummaryData | null |undefined = data?.data;

  return (
    <Card className="w-[100%] max-w-3xl bg-gray-50 border-none shadow-lg">
      <CardHeader className=" text-white bg-gradient-to-r from-zinc-700 to-gray-800  rounded-t-lg p-4 md:p-6">
        <CardTitle className=" text-xl md:text-3xl font-primary font-semibold text-center">
          Task Overview
        </CardTitle>
      </CardHeader>
      {isLoading?
          <CardContent className={'min-h-[400px] flex justify-center items-center'}>
            <Loader />
          </CardContent>
          :<CardContent className="grid gap-8 p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SummaryItem
            icon={<ListTodo className="h-6 w-6" />}
            title="Total Tasks"
            value={summary?.totalTasks ?? 0}
          />
          <SummaryItem
            icon={<Clock className="h-6 w-6" />}
            title="Average Time per Task"
            value={`${summary?.averageTimePerCompletedTask?.toFixed(2) ?? "0.00"}`}
            description="hours"
          />
        </div>
        <Separator className="bg-blue-200" />
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-700">
            Task Completion
          </h3>
          <div className="flex flex-row  justify-between items-center bg-white rounded-lg px-3 md:px-6 py-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-full">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg  md:text-2xl font-bold text-gray-800">
                  {summary?.completedPercentage?.toFixed(2) ?? "0.00"}%
                </p>
                <p className="text-sm font-medium text-gray-500">Completed</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg  md:text-2xl font-bold text-gray-800">
                  {summary?.pendingPercentage?.toFixed(2) ?? "0.00"}%
                </p>
                <p className="text-sm font-medium text-gray-500">Pending</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Progress
              value={summary?.completedPercentage ?? 0}
              className="h-3  bg-gray-200"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </CardContent>}
    </Card>
  );
};

export default OverallSummary;
