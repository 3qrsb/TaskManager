import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { Task } from "../../redux/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { createTask } from "../../redux/tasksSlice";
import { fetchCategories } from "../../redux/categoriesSlice";
import TaskFormFields from "./TaskFormFields";
import useTaskToast from "../../hooks/useTaskToast";
import Button from "../UI/Button";

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
    category: null,
    completion_date: "",
  });

  const { showToast } = useTaskToast();

  useEffect(() => {
    if (isOpen) {
      setNewTask({
        title: "",
        description: "",
        stage: "in_progress",
        category: null,
        completion_date: "",
      });
      dispatch(fetchCategories());
    }
  }, [isOpen, dispatch]);

  const handleInputChange = (field: keyof Task, value: any) => {
    setNewTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = async () => {
    if (!newTask.title || !newTask.description || !newTask.completion_date) {
      showToast({
        title: "Error",
        description: "All fields are required.",
        status: "error",
      });
      return;
    }

    try {
      const createdTask = await dispatch(createTask(newTask as Task)).unwrap();
      onCreate(createdTask);
      onClose();

      showToast({
        title: "Task Created",
        description: "Your new task was successfully created.",
        status: "success",
      });
    } catch (error) {
      console.error("Error creating task:", error);
      showToast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        status: "error",
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
        <ModalBody>
          <TaskFormFields
            taskData={newTask}
            categories={categories}
            handleInputChange={handleInputChange}
            isEditMode={false}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            text="Cancel"
            onClick={onClose}
            variant="outline"
            colorScheme="gray"
            mr={3}
          />
          <Button onClick={handleCreate} text="Create" />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateTaskModal;
