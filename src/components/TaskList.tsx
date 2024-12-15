import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteTask, useEditTask } from "@/hooks/TaskHooks.tsx";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/date";
import { Edit2, Trash2, MoreVertical } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { TaskModalForm } from "@/components/TaskModalForm.tsx";
import { Task } from "@/types/task.ts";
import { ConfirmationPrompt } from "@/components/confirmation-prompt.tsx";
import { GetTaskResponse } from "@/types/api.ts";
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

interface TaskListProps {
  data: GetTaskResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  data,
  isLoading,
  isError,
  refetch,
}) => {
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: editTask } = useEditTask();

  const handleEdit = (updatedTask: Partial<Task>) => {
    editTask(updatedTask, {
      onSuccess: async () => {
        await refetch();
      },
    });
  };

  const handleDelete = (taskId: number) => {
    deleteTask(taskId, {
      onSuccess: async () => {
        await refetch();
      },
    });
  };

  if (isError) {
    return (
      <div className="flex justify-center items-center h-full p-4 text-red-500 text-base">
        Error fetching tasks
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto border rounded-lg overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-gray-700 font-bold text-base">
                Title
              </TableHead>
              <TableHead className="text-gray-700 font-bold text-base">
                Start Time
              </TableHead>
              <TableHead className="text-gray-700 font-bold text-base">
                End Time
              </TableHead>
              <TableHead className="text-gray-700 font-bold text-base">
                Duration
              </TableHead>
              <TableHead className="text-gray-700 font-bold text-base">
                Priority
              </TableHead>
              <TableHead className="text-gray-700 font-bold text-base">
                Status
              </TableHead>
              <TableHead className="text-gray-700 font-bold text-base">
                Actions
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
                  No tasks found
                </TableCell>
              </TableRow>
            ) : (
              data?.data?.map((task) => (
                <TableRow
                  key={task.id}
                  className={cn(
                    "hover:bg-gray-50 transition-colors duration-200 text-base",
                    task.status === "finished"
                      ? "text-gray-500"
                      : "font-semibold",
                  )}
                >
                  <TableCell className="text-base">{task.title}</TableCell>
                  <TableCell className="text-base">
                    {formatDate(task.startTime, "PPp")}
                  </TableCell>
                  <TableCell className="text-base">
                    {formatDate(task.endTime, "PPp")}
                  </TableCell>
                  <TableCell className="text-base">
                    {task.totalTime} {task.totalTime === 1 ? "hour" : "hours"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-sm",
                        getPriorityColor(task.priority),
                      )}
                    >
                      Priority {task.priority}
                    </span>
                  </TableCell>
                  <TableCell className="text-base">
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <TaskModalForm
                        title={"Edit Task"}
                        taskId={task.id}
                        initialValues={task}
                        onSubmit={handleEdit}
                        trigger={
                          <button
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                            title="Edit Task"
                          >
                            <Edit2 size={20} />
                          </button>
                        }
                      />
                      <ConfirmationPrompt
                        title="Delete Task"
                        description="Are you sure you want to delete this task? This action cannot be undone."
                        confirmLabel="Delete"
                        onConfirm={() => handleDelete(task.id)}
                        trigger={
                          <button
                            className="text-red-500 hover:text-red-700 transition-colors"
                            title="Delete Task"
                          >
                            <Trash2 size={20} />
                          </button>
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile List View */}
      <div className="md:hidden">
        <div className="space-y-4">
          {isLoading ? (
            <Loader />
          ) : data?.data?.length === 0 ? (
            <div className="border rounded-lg p-4 text-center text-gray-500">
              No tasks found
            </div>
          ) : (
            data?.data?.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "border rounded-lg p-4 shadow-sm",
                  task.status === "finished"
                    ? "bg-gray-50 text-gray-500"
                    : "bg-white",
                )}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">{task.title}</h3>
                  <Drawer>
                    <DrawerTrigger asChild>
                      <button className="text-gray-500 hover:text-gray-700">
                        <MoreVertical size={20} />
                      </button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Task Actions</DrawerTitle>
                        <DrawerDescription>
                          Choose an action for this task
                        </DrawerDescription>
                      </DrawerHeader>
                      <DrawerFooter>
                        <TaskModalForm
                          title={"Edit Task"}
                          taskId={task.id}
                          initialValues={task}
                          onSubmit={handleEdit}
                          trigger={<Button variant="outline">Edit Task</Button>}
                        />
                        <ConfirmationPrompt
                          title="Delete Task"
                          description="Are you sure you want to delete this task? This action cannot be undone."
                          confirmLabel="Delete"
                          onConfirm={() => handleDelete(task.id)}
                          trigger={
                            <Button variant="destructive">Delete Task</Button>
                          }
                        />
                        <DrawerClose asChild>
                          <Button variant="secondary">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Time:</span>
                    <span className="font-medium">
                      {formatDate(task.startTime, "PPp")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Time:</span>
                    <span className="font-medium">
                      {formatDate(task.endTime, "PPp")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{task.totalTime} hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Priority:</span>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-sm",
                        getPriorityColor(task.priority),
                      )}
                    >
                      Priority {task.priority}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium">
                      {task.status.charAt(0).toUpperCase() +
                        task.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default TaskList;
