import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { Task } from "../../redux/tasksSlice";
import { useDispatch } from "react-redux";
import { createTask } from "../../redux/tasksSlice";
import { AppDispatch } from "../../redux/store";
import api from "../../utils/api";
import TaskFormFields from "./TaskFormFields";

interface Category {
  id: string;
  title: string;
}

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (task: Task) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    stage: "in_progress",
    category: "",
    completion_date: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (isOpen) {
      setNewTask({
        title: "",
        description: "",
        stage: "in_progress",
        category: "",
        completion_date: "",
      });
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      const response = await api.get<Category[]>("/categories/");
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInputChange = (field: keyof Task, value: any) => {
    setNewTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = async () => {
    dispatch(createTask(newTask as Task))
      .unwrap()
      .then((createdTask) => {
        onCreate(createdTask);
        onClose();
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
  };

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
        <ModalHeader>Create New Task</ModalHeader>
        <ModalBody>
          <TaskFormFields
            taskData={newTask}
            categories={categories}
            handleInputChange={handleInputChange}
            isEditMode={false}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={onClose} colorScheme="gray" mr={3}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleCreate}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateTaskModal;
