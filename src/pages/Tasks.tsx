import { List } from "lucide-react";
import TaskList from "@/components/TaskList.tsx";
import { TaskModalForm } from "@/components/TaskModalForm.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useAddTask, useTasks } from "@/hooks/TaskHooks.tsx";
import { Task } from "@/types/task.ts";
import React, {useEffect, useState} from "react";
import { TaskFilter } from "@/components/TaskFilter.tsx";

const Tasks: React.FC = () => {
  const { mutate: addTask } = useAddTask();
  const [filters, setFilters] = useState({});
  const { data, isLoading, isError, refetch } = useTasks(filters);

    useEffect(() => {
        refetch()
    }, [filters, refetch]);

  const handleAdd = (newTask: Partial<Task>) => {
    addTask(newTask, {
      onSuccess: async () => {
        await refetch();
      },
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="font-primary flex items-center space-x-2 text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
          <List size={32} />
          <span>Tasks</span>
        </h1>
      <div className={"flex flex-col gap-4"}>
        <div className={"flex justify-between"}>
          <TaskFilter
            onFilterChange={(filters) => {
              setFilters(filters);
            }}
          />
          <TaskModalForm
            title={"Add Task"}
            onSubmit={handleAdd}
            trigger={
              <Button
                size={"lg"}
                variant={"default"}
                className={"font-secondary"}
              >
                Add Task
              </Button>
            }
          />
        </div>
        <TaskList
          data={data}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default Tasks;
