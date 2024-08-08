import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchTasks, Task } from "../redux/tasksSlice";
import { fetchCategories } from "../redux/categoriesSlice";
import Pagination from "../components/UI/Pagination";
import TaskDetailsModal from "../components/tasks/TaskDetailsModal";
import CreateTaskModal from "../components/tasks/CreateTaskModal";
import Loader from "../components/UI/Loader";
import ErrorMessage from "../components/UI/ErrorMessage";
import {
  getStageIcon,
  getStageBadge,
  truncateText,
  getCategoryTitle,
} from "../utils/taskUtils";

const Tasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, status, totalPages, totalCount, error } = useSelector(
    (state: RootState) => state.tasksSlice
  );
  const { categories } = useSelector(
    (state: RootState) => state.categoriesSlice
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailsModalOpen, setIsTaskDetailsModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [pageSize] = useState(10);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks({ page: currentPage, pageSize }));
    }
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [status, categories.length, dispatch, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(fetchTasks({ page, pageSize }));
  };

  const handleRowClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailsModalOpen(true);
  };

  const handleCloseTaskDetailsModal = () => {
    setIsTaskDetailsModalOpen(false);
    setSelectedTask(null);
  };

  const handleCloseCreateTaskModal = () => {
    setIsCreateTaskModalOpen(false);
  };

  const handleCreateTask = (newTask: Task) => {
    console.log("Task created:", newTask);
    dispatch(fetchTasks({ page: currentPage, pageSize }));
  };

  const handleSave = (updatedTask: Task) => {
    console.log("Task saved:", updatedTask);
    dispatch(fetchTasks({ page: currentPage, pageSize }));
  };

  const handleDelete = (taskId: number) => {
    console.log("Task deleted:", taskId);
    dispatch(fetchTasks({ page: currentPage, pageSize }));
  };

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h2" size="lg">
          Tasks
        </Heading>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          onClick={() => setIsCreateTaskModalOpen(true)}
        >
          Create Task
        </Button>
      </Flex>
      <Text color="gray.500" mb={4}>
        {totalCount} tasks
      </Text>
      {status === "loading" && <Loader />}
      {status === "failed" && <ErrorMessage description={error} />}
      {status === "succeeded" && tasks.length === 0 && (
        <Text>No tasks available.</Text>
      )}
      {status === "succeeded" && tasks.length > 0 && (
        <>
          <Table variant="simple" mt={4} size="sm">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Stage</Th>
                <Th>Category</Th>
                <Th>Created At</Th>
                <Th>Due Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tasks.map((task: Task) => (
                <Tr key={task.id} onClick={() => handleRowClick(task)}>
                  <Td>
                    <Text isTruncated>{truncateText(task.title, 30)}</Text>
                  </Td>
                  <Td>
                    <Text isTruncated>
                      {truncateText(task.description, 30)}
                    </Text>
                  </Td>
                  <Td>
                    <Flex align="center">
                      {getStageIcon(task.stage)}
                      <Text ml={2}>{getStageBadge(task.stage)}</Text>
                    </Flex>
                  </Td>
                  <Td>{getCategoryTitle(categories, task.category)}</Td>
                  <Td>{new Date(task.created_at).toLocaleDateString()}</Td>
                  <Td>{new Date(task.completion_date).toLocaleDateString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      <TaskDetailsModal
        isOpen={isTaskDetailsModalOpen}
        onClose={handleCloseTaskDetailsModal}
        task={selectedTask}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={handleCloseCreateTaskModal}
        onCreate={handleCreateTask}
      />
    </Box>
  );
};

export default Tasks;
