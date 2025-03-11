import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "../hooks/useApi";

export enum Status {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  NONE = "NONE",
}

export type Task = {
  id: string;
  name: string;
  description: string;
  status: Status;
};

export const useTasksQuery = (status: Status) => {
  const { fetchData } = useApi();
  const queryClient = useQueryClient();

  const query = status !== Status.NONE ? { status } : null;

  const getTasks = useQuery<Task[]>({
    queryKey: ["tasks", status],
    queryFn: async () =>
      fetchData("tasks", {
        ...(query ? { queryParams: query } : {}),
      }),
    refetchOnWindowFocus: false,
  });
  const createTask = useMutation({
    mutationFn: async (body: Omit<Task, "id">) => {
      return fetchData(`/tasks`, { body, method: "POST" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", status] });
    },
  });

  const updateTask = useMutation({
    mutationFn: async (body: Task) => {
      const { id, ...rest } = body;
      return fetchData(`/tasks/${body.id}`, { body: rest, method: "PUT" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", status] });
    },
  });

  const deleteTask = useMutation({
    mutationFn: async (id: string) => {
      return fetchData(`/tasks/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", status] });
    },
  });

  return { getTasks, createTask, updateTask, deleteTask };
};
