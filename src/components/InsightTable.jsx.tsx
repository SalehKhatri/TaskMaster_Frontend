import React from "react";
import { useInsights } from "@/hooks/TaskHooks.tsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Loader from "@/components/Loader.tsx";

const getPriorityColor = (priority: number) => {
  switch (priority) {
    case 1:
      return "bg-red-50 text-red-800";
    case 2:
      return "bg-orange-50 text-orange-800";
    case 3:
      return "bg-yellow-50 text-yellow-800";
    case 4:
      return "bg-blue-50 text-blue-800";
    case 5:
      return "bg-green-50 text-green-800";
    default:
      return "bg-gray-50 text-gray-800";
  }
};

const InsightTable: React.FC = () => {
  const { data, isLoading, isError } = useInsights();

  if (isError)
    return (
      <div className="flex justify-center items-center h-full p-4 text-red-500 text-base">
        Error fetching task data
      </div>
    );


  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <Table>
        <TableCaption className="bg-gray-100 p-2 text-gray-600 text-base">
          Pending Tasks Summary
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[100px] text-gray-700 font-bold text-base">
              Priority
            </TableHead>
            <TableHead className="text-gray-700 font-bold text-base">
              Pending Tasks
            </TableHead>
            <TableHead className="text-gray-700 font-bold text-base">
              Total Time Lapsed
            </TableHead>
            <TableHead className="text-gray-700 font-bold text-base">
              Est. Time to Finish
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                <Loader />
              </TableCell>
            </TableRow>
          ) : data?.data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500">
                No pending tasks
              </TableCell>
            </TableRow>
          ) : (
            data?.data?.map((item) => (
              <TableRow
                key={item.priority}
                className={cn(
                  "hover:bg-gray-50 transition-colors duration-200 text-base",
                  item.numberOfPendingTasks > 0
                    ? "font-semibold"
                    : "text-gray-500",
                )}
              >
                <TableCell>
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-sm",
                      getPriorityColor(item.priority),
                    )}
                  >
                    Priority {item.priority}
                  </span>
                </TableCell>
                <TableCell className="text-base">
                  {item.numberOfPendingTasks > 0
                    ? item.numberOfPendingTasks
                    : "No pending tasks"}
                </TableCell>
                <TableCell className="text-base">
                  {item.totalTimeLapsed > 0
                    ? `${item.totalTimeLapsed.toFixed(2)} hrs`
                    : "—"}
                </TableCell>
                <TableCell className="text-base">
                  {item.totalEstimatedTimeToFinish > 0
                    ? `${item.totalEstimatedTimeToFinish.toFixed(2)} hrs`
                    : "—"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default InsightTable;
