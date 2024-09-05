import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  useColorModeValue,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import { HiFlag } from "react-icons/hi";
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
  getPriorityLabel,
  getPriorityColorScheme,
} from "../utils/taskUtils";
import TaskControlBar from "../components/tasks/TaskControlBar";

const Tasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, status, totalPages, totalCount, error }: any = useSelector(
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
  const [pageSize] = useState(15);
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

  const fetchAndSetTasks = (options = {}) => {
    const {
      page = 1,
      pageSize = 15,
      search = "",
      categoryId = null,
      ordering = "created_at",
    }: any = options;
    dispatch(fetchTasks({ page, pageSize, search, categoryId, ordering })).then(
      (response: any) => setDisplayedTasks(response.payload.tasks || [])
    );
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    fetchAndSetTasks({
      search: query,
      categoryId: selectedCategory,
      ordering: sortBy,
    });
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    handleSearch("");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchAndSetTasks({ page, categoryId: selectedCategory, ordering: sortBy });
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
      <TaskControlBar
        totalCount={totalCount}
        searchTerm={searchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        sortBy={sortBy}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onCreateTask={() => setIsCreateTaskModalOpen(true)}
      />
      {status === "loading" && <Loader />}
      {status === "failed" && <ErrorMessage description={error} />}
      {status === "succeeded" && (
        <Box overflowX="auto">
          <Table variant="simple" mt={4} size="sm">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Category</Th>
                <Th>Stage</Th>
                <Th>Created At</Th>
                <Th>Due Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {displayedTasks.map((task) => (
                <Tr
                  key={task.id}
                  onClick={() => handleRowClick(task)}
                  _hover={{ bg: hoverBg, cursor: "pointer" }}
                >
                  <Td>
                    <Flex align="center">
                      <Text>{truncateText(task.title, 20)}</Text>
                      {task.priority && (
                        <Tooltip label="Task's Priority" openDelay={700}>
                          <Badge
                            ml={2}
                            colorScheme={getPriorityColorScheme(task.priority)}
                            fontSize="x-small"
                          >
                            {getPriorityLabel(task.priority)}
                          </Badge>
                        </Tooltip>
                      )}
                      {task.isFlagged && (
                        <HiFlag
                          color="red"
                          size={15}
                          style={{ marginLeft: "8px" }}
                        />
                      )}
                    </Flex>
                  </Td>
                  <Td>{truncateText(task.description, 30)}</Td>
                  <Td>{getCategoryTitle(categories, task.category)}</Td>
                  <Td>
                    <Flex align="center">
                      {getStageIcon(task.stage)}
                      <Text ml={2}>{getStageBadge(task.stage)}</Text>
                    </Flex>
                  </Td>
                  <Td>{new Date(task.created_at).toLocaleDateString()}</Td>
                  <Td>{new Date(task.completion_date).toLocaleDateString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={handleCloseCreateTaskModal}
        onCreate={handleCreateTask}
      />
      <TaskDetailsModal
        task={selectedTask}
        isOpen={isTaskDetailsModalOpen}
        onClose={handleCloseTaskDetailsModal}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default Tasks;
