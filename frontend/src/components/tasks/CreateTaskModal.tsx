import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Task } from "../../redux/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { createTask } from "../../redux/tasksSlice";
import { fetchCategories } from "../../redux/categoriesSlice";
import TaskFormFields from "./TaskFormFields";

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
  const categories = useSelector(
    (state: RootState) => state.categoriesSlice.categories
  );
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    stage: "in_progress",
    category: "",
    completion_date: "",
  });
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      setNewTask({
        title: "",
        description: "",
        stage: "in_progress",
        category: "",
        completion_date: "",
      });
      dispatch(fetchCategories());
    }
  }, [isOpen, dispatch]);

  const handleInputChange = (field: keyof Task, value: any) => {
    setNewTask((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleCreate = async () => {
    if (!newTask.title || !newTask.description || !newTask.completion_date) {
      toast({
        title: "Error",
        description: "All fields are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const createdTask = await dispatch(createTask(newTask as Task)).unwrap();
      onCreate(createdTask);
      onClose();

      toast({
        title: "Task Created",
        description: "Your new task was successfully created.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
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
