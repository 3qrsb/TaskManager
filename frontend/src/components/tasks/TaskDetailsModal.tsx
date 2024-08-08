import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
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
        })
        .catch((error) => {
          console.error("Error saving task:", error);
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
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
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
        <ModalHeader>{editedTask.title}</ModalHeader>
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
