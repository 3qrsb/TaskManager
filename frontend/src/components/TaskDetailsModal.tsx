import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Box,
  Badge,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon, CalendarIcon } from "@chakra-ui/icons";

const TaskDetailsModal = ({ isOpen, onClose, task }: any) => {
  if (!task) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{task.title}</ModalHeader>
        <ModalBody>
          <Text mb={4}>
            <strong>Description:</strong> {task.description}
          </Text>
          <Flex mb={4}>
            <Box mr={4}>
              <Text>
                <strong>Stage:</strong>{" "}
                <Badge
                  colorScheme={task.stage === "completed" ? "green" : "blue"}
                >
                  {task.stage}
                </Badge>
              </Text>
            </Box>
            <Box>
              <Text>
                <strong>Category:</strong> {task.category}
              </Text>
            </Box>
          </Flex>
          <Flex mb={4}>
            <Box mr={4}>
              <Text>
                <CalendarIcon mr={2} />
                <strong>Created At:</strong>{" "}
                {new Date(task.created_at).toLocaleDateString()}
              </Text>
            </Box>
            <Box>
              <Text>
                <CalendarIcon mr={2} />
                <strong>Due Date:</strong>{" "}
                {new Date(task.completion_date).toLocaleDateString()}
              </Text>
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <IconButton
            icon={<DeleteIcon />}
            aria-label="Delete Task"
            colorScheme="red"
            onClick={() => console.log("Delete task")}
            mr="auto"
          />
          <Button
            colorScheme="gray"
            onClick={onClose}
            size="md"
            minWidth="100px"
          >
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => console.log("Save task")}
            size="md"
            ml={3}
            minWidth="100px"
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskDetailsModal;
