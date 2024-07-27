import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchTasks, createTask, Task } from "../redux/tasksSlice";
import Pagination from "../components/Pagination";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  List,
  ListItem,
  Text,
  Spinner,
} from "@chakra-ui/react";

const Tasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, status, totalPages } = useSelector(
    (state: RootState) => state.tasksSlice
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks(currentPage));
    }
  }, [status, dispatch, currentPage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      dispatch(createTask({ title, description }));
      setTitle("");
      setDescription("");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(fetchTasks(page));
  };

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Tasks
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="title" mb={2}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl id="description" mb={2}>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Add Task
        </Button>
      </form>
      {status === "loading" && <Spinner />}
      {status === "succeeded" && tasks.length === 0 && (
        <Text>No tasks available.</Text>
      )}
      {status === "succeeded" && tasks.length > 0 && (
        <>
          <List spacing={3} mt={4}>
            {tasks.map((task: Task) => (
              <ListItem key={task.id}>
                <Heading as="h3" size="md">
                  {task.title}
                </Heading>
                <Text>{task.description}</Text>
              </ListItem>
            ))}
          </List>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {status === "failed" && <Text>Error loading tasks.</Text>}
    </Box>
  );
};

export default Tasks;
