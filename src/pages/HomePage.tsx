import {
  Button,
  Container,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Status, Task, useTasksQuery } from "../api/tasks";
import TaskCard from "../components/Card";
import ModalForm from "../components/ModalForm";

const HomePage: React.FC = () => {
  const [status, setStatus] = useState<Task["status"]>(Status.NONE);
  const [modalOpen, setModalOpen] = useState(false);

  const [activeEditingTask, setActiveEditingTask] = useState<Task>();

  const { getTasks, createTask, deleteTask, updateTask } =
    useTasksQuery(status);

  const handleDelete = (task: Task) => {
    deleteTask.mutate(task.id);
  };

  const handleOpenModal = (task?: Task) => {
    setModalOpen(true);
    if (task) {
      setActiveEditingTask(task);
    } else {
      setActiveEditingTask(undefined);
    }
  };

  const handleUpdate = (task: Task) => {
    updateTask.mutate(task);
    setModalOpen(false);
  };

  const handleCreate = (task: Omit<Task, "id">) => {
    createTask.mutate(task);
    setModalOpen(false);
  };

  const handleSubmit = (task: Omit<Task, "id">) => {
    if (activeEditingTask) {
      handleUpdate({ ...task, id: activeEditingTask.id });
    } else {
      handleCreate(task);
    }
  };

  return (
    <div className="wrapper">
      <Container maxWidth="sm">
        <div className="todo-container">
          <div className="flex justify-between px-6 h-10">
            <Button
              variant="outlined"
              href="#outlined-buttons"
              onClick={() => handleOpenModal()}
            >
              Create Task
            </Button>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              displayEmpty
            >
              <MenuItem value={Status.NONE}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={Status.DONE}>Done</MenuItem>
              <MenuItem value={Status.IN_PROGRESS}>In progress</MenuItem>
              <MenuItem value={Status.TO_DO}>To do</MenuItem>
            </Select>
          </div>
          <div className="flex justify-center flex-col gap-5">
            {getTasks.data &&
              getTasks.data.map((task, index) => (
                <TaskCard
                  key={index}
                  data={task}
                  onDeleteClick={() => handleDelete(task)}
                  onEditClick={() => handleOpenModal(task)}
                />
              ))}
          </div>
        </div>
      </Container>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalForm
          onSave={(data) => handleSubmit(data)}
          data={activeEditingTask}
        />
      </Modal>
    </div>
  );
};

export default HomePage;
