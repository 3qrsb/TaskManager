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

const useModalState = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailsModalOpen, setIsTaskDetailsModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  const openTaskDetailsModal = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailsModalOpen(true);
  };

  const closeTaskDetailsModal = () => {
    setSelectedTask(null);
    setIsTaskDetailsModalOpen(false);
  };

  const openCreateTaskModal = () => setIsCreateTaskModalOpen(true);
  const closeCreateTaskModal = () => setIsCreateTaskModalOpen(false);

  return {
    selectedTask,
    isTaskDetailsModalOpen,
    isCreateTaskModalOpen,
    openTaskDetailsModal,
    closeTaskDetailsModal,
    openCreateTaskModal,
    closeCreateTaskModal,
  };
};

const Tasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, status, totalPages, totalCount, error }: any = useSelector(
    (state: RootState) => state.tasksSlice
  );
  const { categories } = useSelector(
    (state: RootState) => state.categoriesSlice
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(15);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("created_at");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  const {
    selectedTask,
    isTaskDetailsModalOpen,
    isCreateTaskModalOpen,
    openTaskDetailsModal,
    closeTaskDetailsModal,
    openCreateTaskModal,
    closeCreateTaskModal,
  } = useModalState();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchTasks({
        page: currentPage,
        pageSize,
        categoryId: selectedCategory,
        ordering: sortBy,
      })
    );
  }, [dispatch, currentPage, pageSize, selectedCategory, sortBy]);

  const updateTasks = (options = {}) => {
    const {
      page = currentPage,
      categoryId = selectedCategory,
      ordering = sortBy,
      search = searchTerm,
    }: any = options;
    setCurrentPage(page);
    dispatch(fetchTasks({ page, pageSize, categoryId, ordering, search }));
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    updateTasks({ search: query });
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    updateTasks({ search: "" });
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    updateTasks({ categoryId });
  };

  const handleSortChange = (sortOrder: string | null) => {
    setSortBy(sortOrder || "created_at");
    updateTasks({ ordering: sortOrder });
  };

  return (
    <Box p={4}>
      <TaskControlBar
        totalCount={totalCount}
        searchTerm={searchTerm}
        categories={categories}
        onClearSearch={handleClearSearch}
        selectedCategory={selectedCategory}
        sortBy={sortBy}
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onCreateTask={openCreateTaskModal}
      />

      {status === "loading" && <Loader />}
      {status === "failed" && <ErrorMessage description={error} />}
      {status === "succeeded" && (
        <TaskTable
          tasks={tasks}
          categories={categories}
          hoverBg={hoverBg}
          onRowClick={openTaskDetailsModal}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={updateTasks}
      />

      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={closeCreateTaskModal}
        onCreate={() => updateTasks({ page: 1 })}
      />

      <TaskDetailsModal
        task={selectedTask}
        isOpen={isTaskDetailsModalOpen}
        onClose={closeTaskDetailsModal}
        onSave={() => updateTasks({ page: currentPage })}
        onDelete={() => updateTasks({ page: currentPage })}
      />
    </Box>
  );
};

const TaskTable = ({
  tasks,
  categories,
  hoverBg,
  onRowClick,
}: {
  tasks: Task[];
  categories: { id: number; title: string }[];
  hoverBg: string;
  onRowClick: (task: Task) => void;
}) => (
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
        {tasks.map((task) => (
          <Tr
            key={task.id}
            onClick={() => onRowClick(task)}
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
                  <HiFlag color="red" size={15} style={{ marginLeft: "8px" }} />
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
);

export default Tasks;
