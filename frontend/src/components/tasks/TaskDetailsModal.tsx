import React, { useState, useEffect } from "react";
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
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import api from "../../utils/api";
import { Task } from "../../redux/tasksSlice";

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
  const [editedTask, setEditedTask] = useState<Task | null>(task);

  useEffect(() => {
    if (task) {
      setEditedTask(task);
    }
  }, [task]);

  const handleInputChange = (field: keyof Task, value: any) => {
    setEditedTask((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSave = async () => {
    if (editedTask) {
      try {
        const updatedTask = await api.put<Task, Task>(
          `/tasks/${editedTask.id}/`,
          editedTask
        );
        onSave(updatedTask);
        onClose();
      } catch (error) {
        console.error("Error saving task:", error);
      }
    }
  };

  const handleDelete = async () => {
    if (editedTask) {
      try {
        await api.delete<void>(`/tasks/${editedTask.id}/`);
        onDelete(editedTask.id);
        onClose();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
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
          <Grid templateColumns="150px 1fr" gap={4}>
            <GridItem>Title:</GridItem>
            <GridItem>
              <Input
                value={editedTask.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </GridItem>

            <GridItem>Description:</GridItem>
            <GridItem>
              <Textarea
                value={editedTask.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </GridItem>

            <GridItem>Stage:</GridItem>
            <GridItem>
              <Select
                value={editedTask.stage || ""}
                onChange={(e) => handleInputChange("stage", e.target.value)}
              >
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </Select>
            </GridItem>

            <GridItem>Category:</GridItem>
            <GridItem>
              <Input
                value={editedTask.category || ""}
                onChange={(e) => handleInputChange("category", e.target.value)}
              />
            </GridItem>

            <GridItem>Due Date:</GridItem>
            <GridItem>
              <Input
                type="date"
                value={
                  editedTask.completion_date
                    ? new Date(editedTask.completion_date)
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
