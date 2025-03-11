import { useMutation, useQuery } from "@tanstack/react-query";
import useApi from "../hooks/useApi";

export enum Status {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

type Task = {
  id?: string;
  name: string;
  description: string;
  status: Status;
};

export const useTasksQuery = (queryParams: { status: Status }) => {
  const { fetchData } = useApi();

  const getTasks = useQuery({
    queryKey: ["tasks"],
    queryFn: async () =>
      fetchData("tasks", {
        queryParams,
      }),
  });

  const createTask = useMutation({
    mutationFn: async (body: Task) => {
      const { id, ...rest } = body;
      return fetchData(`/tasks`, { body: rest, method: "POST" });
    },
  });

  const updateTask = useMutation({
    mutationFn: async (body: Task) => {
      const { id, ...rest } = body;
      return fetchData(`/tasks/${body.id}`, { body: rest, method: "PUT" });
    },
  });

  const deleteTask = useMutation({
    mutationFn: async (id: string) => {
      return fetchData(`/tasks/${id}`, { method: "DELETE" });
    },
  });

  return { getTasks, createTask, updateTask, deleteTask };
};
