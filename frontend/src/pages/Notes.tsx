import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { fetchNotes, addNote } from "../redux/notesSlice";
import { RootState, AppDispatch } from "../redux/store";

const Notes = () => {
  const dispatch: AppDispatch = useDispatch();
  const { notes, status, error } = useSelector(
    (state: RootState) => state.notesSlice
  );
  const [newNote, setNewNote] = useState({ title: "", text: "" });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.title && newNote.text) {
      await dispatch(addNote(newNote));
      setNewNote({ title: "", text: "" });
      setIsAdding(false);
    }
  };

  if (status === "loading") return <Text>Loading...</Text>;
  if (status === "failed") return <Text>Error: {error}</Text>;

  return (
    <VStack spacing={4} align="stretch">
      {isAdding ? (
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          shadow="md"
        >
          <form onSubmit={handleSubmit}>
            <FormControl id="title" mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={newNote.title}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl id="text" mb={4}>
              <FormLabel>Text</FormLabel>
              <Textarea
                name="text"
                value={newNote.text}
                onChange={handleChange}
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Add Note
            </Button>
            <Button onClick={() => setIsAdding(false)} ml={4}>
              Cancel
            </Button>
          </form>
        </Box>
      ) : (
        <Button onClick={() => setIsAdding(true)} colorScheme="blue">
          Add Note
        </Button>
      )}

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
        {notes.map((note) => (
          <Box
            key={note.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            shadow="md"
            _hover={{ shadow: "lg" }}
            transition="all 0.3s"
          >
            <Text fontSize="xl" fontWeight="bold">
              {note.title}
            </Text>
            <Text mt={2}>{note.text}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default Notes;
