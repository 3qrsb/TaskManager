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
  useColorModeValue,
  Badge,
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
import CustomDropdown from "../components/UI/CustomDropdown";
import SearchBar from "../components/SearchBar";

const Tasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, status, totalPages, totalCount, error } = useSelector(
    (state: RootState) => state.tasksSlice
  );
  const { categories } = useSelector(
    (state: RootState) => state.categoriesSlice
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [displayedTasks, setDisplayedTasks] = useState<Task[]>(tasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailsModalOpen, setIsTaskDetailsModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [pageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("created_at");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    dispatch(
      fetchTasks({
        page: currentPage,
        pageSize,
        categoryId: selectedCategory,
        ordering: sortBy,
      })
    ).then((response: any) => {
      setDisplayedTasks(response.payload.tasks || []);
    });
  }, [dispatch, currentPage, pageSize, selectedCategory, sortBy]);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories.length, dispatch]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    if (query) {
      dispatch(
        fetchTasks({
          page: 1,
          pageSize,
          search: query,
          categoryId: selectedCategory,
          ordering: sortBy,
        })
      ).then((response: any) => {
        setDisplayedTasks(response.payload.tasks || []);
      });
    } else {
      dispatch(
        fetchTasks({
          page: 1,
          pageSize,
          categoryId: selectedCategory,
          ordering: sortBy,
        })
      ).then((response: any) => {
        setDisplayedTasks(response.payload.tasks || []);
      });
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    handleSearch(""); // Clear search and fetch all tasks
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(
      fetchTasks({
        page,
        pageSize,
        categoryId: selectedCategory,
        ordering: sortBy,
      })
    ).then((response: any) => {
      setDisplayedTasks(response.payload.tasks || []);
    });
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
    ).then((response: any) => {
      setDisplayedTasks(response.payload.tasks || []);
    });
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
    ).then((response: any) => {
      setDisplayedTasks(response.payload.tasks || []);
    });
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
    ).then((response: any) => {
      setDisplayedTasks(response.payload.tasks || []);
    });
  };

  const handleCategoryChange = (categoryId: number | null) => {
    const finalCategoryId = categoryId !== -1 ? categoryId : null;
    setSelectedCategory(finalCategoryId);
    setCurrentPage(1);
    dispatch(
      fetchTasks({
        page: 1,
        pageSize,
        categoryId: finalCategoryId,
        ordering: sortBy,
      })
    ).then((response: any) => {
      setDisplayedTasks(response.payload.tasks || []);
    });
  };

  const handleSortChange = (sortOrder: string | null) => {
    const finalSortOrder = sortOrder || "created_at";
    setSortBy(finalSortOrder);
    setCurrentPage(1);
    dispatch(
      fetchTasks({
        page: 1,
        pageSize,
        categoryId: selectedCategory,
        ordering: finalSortOrder,
      })
    ).then((response: any) => {
      setDisplayedTasks(response.payload.tasks || []);
    });
  };

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h2" size="lg">
          Tasks
        </Heading>
        <SearchBar
          onSearch={handleSearch}
          onClearSearch={handleClearSearch}
          searchTerm={searchTerm}
        />
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          onClick={() => setIsCreateTaskModalOpen(true)}
        >
          Create Task
        </Button>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text color="gray.500">
          {searchTerm ? (
            <>
              <Badge colorScheme="teal" mr={2}>
                {totalCount} {totalCount === 1 ? "task" : "tasks"}
              </Badge>
              found based on your search
            </>
          ) : (
            <>
              <Badge colorScheme="teal">
                {totalCount} {totalCount === 1 ? "task" : "tasks"}
              </Badge>
            </>
          )}
        </Text>
        <Stack direction="row" spacing={4} align="center">
          <CustomDropdown<number>
            label="Category"
            items={[{ id: -1, title: "All" }, ...categories]}
            selectedItem={selectedCategory}
            onChange={(id) => handleCategoryChange(id !== -1 ? id : null)}
          />
          <CustomDropdown<string>
            label="Sort by"
            items={[
              { id: "created_at", title: "Created At" },
              { id: "completion_date", title: "Due Date" },
              { id: "title", title: "Title" },
            ]}
            selectedItem={sortBy}
            onChange={handleSortChange}
          />
        </Stack>
      </Flex>
      {status === "loading" && <Loader />}
      {status === "failed" && <ErrorMessage description={error} />}
      {status === "succeeded" && displayedTasks.length === 0 && (
        <Text>No tasks available.</Text>
      )}
      {status === "succeeded" && displayedTasks.length > 0 && (
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
              {displayedTasks.map((task: Task) => (
                <Tr
                  key={task.id}
                  onClick={() => handleRowClick(task)}
                  _hover={{ bg: hoverBg, cursor: "pointer" }}
                >
                  <Td>{truncateText(task.title, 20)}</Td>
                  <Td>{truncateText(task.description, 30)}</Td>
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
