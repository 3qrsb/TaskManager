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
  Stack,
  MenuItem,
  MenuButton,
  Menu,
  MenuList,
} from "@chakra-ui/react";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
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
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("created_at");

  useEffect(() => {
    if (status === "idle") {
      dispatch(
        fetchTasks({
          page: currentPage,
          pageSize,
          categoryId: selectedCategory,
          ordering: sortBy,
        })
      );
    }
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [
    status,
    categories.length,
    dispatch,
    currentPage,
    pageSize,
    selectedCategory,
    sortBy,
  ]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(
      fetchTasks({
        page,
        pageSize,
        categoryId: selectedCategory,
        ordering: sortBy,
      })
    );
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
    dispatch(
      fetchTasks({
        page: currentPage,
        pageSize,
        categoryId: selectedCategory,
        ordering: sortBy,
      })
    );
  };

  const handleSave = (updatedTask: Task) => {
    console.log("Task saved:", updatedTask);
    dispatch(
      fetchTasks({
        page: currentPage,
        pageSize,
        categoryId: selectedCategory,
        ordering: sortBy,
      })
    );
  };

  const handleDelete = (taskId: number) => {
    console.log("Task deleted:", taskId);
    dispatch(
      fetchTasks({
        page: currentPage,
        pageSize,
        categoryId: selectedCategory,
        ordering: sortBy,
      })
    );
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    dispatch(fetchTasks({ page: 1, pageSize, categoryId, ordering: sortBy }));
  };

  const handleSortChange = (sortOrder: string) => {
    setSortBy(sortOrder);
    setCurrentPage(1);
    dispatch(
      fetchTasks({
        page: 1,
        pageSize,
        categoryId: selectedCategory,
        ordering: sortOrder,
      })
    );
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
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text color="gray.500" mb={4}>
          {totalCount} tasks
        </Text>
        <Stack direction="row" spacing={4} align="center">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="outline"
              borderRadius="md"
              boxShadow="sm"
              _hover={{ boxShadow: "md" }}
              _focus={{ boxShadow: "md", borderColor: "teal.500" }}
              size="sm"
              maxWidth="200px"
            >
              Category: {getCategoryTitle(categories, selectedCategory)}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleCategoryChange(null)}>
                All Categories
              </MenuItem>
              {categories.map((category) => (
                <MenuItem
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.title}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="outline"
              borderRadius="md"
              boxShadow="sm"
              _hover={{ boxShadow: "md" }}
              _focus={{ boxShadow: "md", borderColor: "teal.500" }}
            >
              Sort by: {sortBy === "created_at" ? "Created At" : "Due Date"}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleSortChange("created_at")}>
                Created At
              </MenuItem>
              <MenuItem onClick={() => handleSortChange("completion_date")}>
                Due Date
              </MenuItem>
              <MenuItem onClick={() => handleSortChange("title")}>
                Title
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
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
                <Tr
                  key={task.id}
                  onClick={() => handleRowClick(task)}
                  _hover={{ bg: "gray.100", cursor: "pointer" }}
                >
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
