import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Task } from "../../redux/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateTask, deleteTask } from "../../redux/tasksSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchCategories } from "../../redux/categoriesSlice";
import TaskFormFields from "./TaskFormFields";
import useTaskToast from "../../hooks/useTaskToast";

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onSave: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  isOpen,
  onClose,
  task,
  onSave,
  onDelete,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [editedTask, setEditedTask] = useState<Task | null>(task);
  const { categories, status: categoriesStatus } = useSelector(
    (state: RootState) => state.categoriesSlice
  );

  const { showToast } = useTaskToast();

  useEffect(() => {
    if (task) {
      setEditedTask(task);
    }
  }, [task]);

  useEffect(() => {
    if (isOpen && categoriesStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [isOpen, categoriesStatus, dispatch]);

  const handleInputChange = (field: keyof Task, value: any) => {
    setEditedTask((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSave = async () => {
    if (editedTask) {
      dispatch(updateTask(editedTask))
        .unwrap()
        .then((updatedTask) => {
          onSave(updatedTask);
          onClose();
          showToast({
            title: "Task Updated",
            description: "The task was successfully updated.",
            status: "success",
          });
        })
        .catch((error) => {
          console.error("Error saving task:", error);
          showToast({
            title: "Error",
            description: "Failed to update task. Please try again.",
            status: "error",
          });
        });
    }
  };

  const handleDelete = async () => {
    if (editedTask) {
      dispatch(deleteTask(editedTask.id))
        .unwrap()
        .then(() => {
          onDelete(editedTask.id);
          onClose();
          showToast({
            title: "Task Deleted",
            description: "The task was successfully deleted.",
            status: "success",
          });
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
          showToast({
            title: "Error",
            description: "Failed to delete task. Please try again.",
            status: "error",
          });
        });
    }
  };

  if (!editedTask) return null;

  return (
    <Modal
      size="lg"
      motionPreset="slideInTop"
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <TaskFormFields
            taskData={editedTask}
            categories={categories}
            handleInputChange={handleInputChange}
          />
        </ModalBody>

        <ModalFooter>
          <IconButton
            aria-label="Delete task"
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={handleDelete}
            mr="auto"
          />
          <Button variant="outline" onClick={onClose} colorScheme="gray" mr={3}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskDetailsModal;
