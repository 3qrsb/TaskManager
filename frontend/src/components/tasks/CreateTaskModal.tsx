import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  Textarea,
  Select,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import api from "../../utils/api";
import { Task } from "../../redux/tasksSlice";

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
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    stage: "in_progress",
    category: "",
    completion_date: "",
  });

  const handleInputChange = (field: keyof Task, value: any) => {
    setNewTask((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleCreate = async () => {
    try {
      const createdTask = await api.post<Task, Partial<Task>>(
        "/tasks/",
        newTask
      );
      onCreate(createdTask);
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Task</ModalHeader>
        <ModalBody>
          <Grid templateColumns="150px 1fr" gap={4}>
            <GridItem>Title:</GridItem>
            <GridItem>
              <Input
                value={newTask.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </GridItem>

            <GridItem>Description:</GridItem>
            <GridItem>
              <Textarea
                value={newTask.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </GridItem>

            <GridItem>Stage:</GridItem>
            <GridItem>
              <Select
                value={newTask.stage || ""}
                onChange={(e) => handleInputChange("stage", e.target.value)}
              >
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </Select>
            </GridItem>

            <GridItem>Category:</GridItem>
            <GridItem>
              <Input
                value={newTask.category || ""}
                onChange={(e) => handleInputChange("category", e.target.value)}
              />
            </GridItem>

            <GridItem>Due Date:</GridItem>
            <GridItem>
              <Input
                type="date"
                value={
                  newTask.completion_date
                    ? new Date(newTask.completion_date)
                        .toISOString()
                        .substr(0, 10)
                    : ""
                }
                onChange={(e) =>
                  handleInputChange("completion_date", e.target.value)
                }
              />
            </GridItem>
          </Grid>
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
