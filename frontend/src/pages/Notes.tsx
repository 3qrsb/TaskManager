import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Flex,
  Text,
  VStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  fetchNotes,
  addNote,
  updateNote,
  deleteNote,
} from "../redux/notesSlice";
import { RootState, AppDispatch } from "../redux/store";
import { Note } from "../redux/notesSlice";
import { DeleteIcon } from "@chakra-ui/icons";
import NotesSkeleton from "../components/UI/NotesSkeleton";

const Notes = () => {
  const dispatch: AppDispatch = useDispatch();
  const { notes, status, error } = useSelector(
    (state: RootState) => state.notesSlice
  );

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState<Omit<Note, "id">>({
    title: "",
    text: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const sidebarBg = useColorModeValue("gray.100", "gray.800");
  const noteBg = useColorModeValue("white", "gray.700");
  const selectedNoteBg = useColorModeValue("blue.50", "blue.900");

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (isAdding) {
      setNewNote({
        ...newNote,
        [e.target.name]: e.target.value,
      });
    } else if (selectedNote) {
      setSelectedNote({
        ...selectedNote,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.title && newNote.text) {
      await dispatch(addNote(newNote));
      setNewNote({ title: "", text: "" });
      setIsAdding(false);
    }
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  const handleBlur = async () => {
    if (selectedNote && selectedNote.id) {
      await dispatch(updateNote(selectedNote));
    } else {
      console.error("Cannot update note: ID is undefined");
    }
  };

  const handleDelete = async (noteId: number) => {
    await dispatch(deleteNote(noteId));
    if (selectedNote && selectedNote.id === noteId) {
      setSelectedNote(null);
    }
  };

  if (status === "loading") return <NotesSkeleton />;

  if (status === "failed") return <Text>Error: {error}</Text>;

  return (
    <Flex>
      <Box
        width="30%"
        overflowY="auto"
        height="calc(100vh - 70px)"
        p={4}
        bg={sidebarBg}
      >
        <VStack spacing={4} align="stretch">
          {isAdding ? (
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              shadow="md"
              bg={noteBg}
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

          {notes.map((note) => (
            <Box
              key={note.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              shadow="md"
              _hover={{ shadow: "lg", cursor: "pointer" }}
              transition="all 0.3s"
              bg={selectedNote?.id === note.id ? selectedNoteBg : noteBg}
              onClick={() => handleNoteClick(note)}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="xl" fontWeight="bold">
                  {note.title}
                </Text>
                <IconButton
                  aria-label="Delete note"
                  icon={<DeleteIcon />}
                  size="sm"
                  onClick={() => handleDelete(note.id)}
                />
              </Flex>
              <Text mt={2}>{note.text}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
      <Box width="70%" p={4} ml={1} borderRadius="lg" bg={noteBg}>
        {selectedNote ? (
          <Box>
            <FormControl id="title" mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={selectedNote.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormControl>
            <FormControl id="text" mb={4}>
              <FormLabel>Text</FormLabel>
              <Textarea
                name="text"
                value={selectedNote.text}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormControl>
          </Box>
        ) : (
          <Text>Select a note to view and edit its content</Text>
        )}
      </Box>
    </Flex>
  );
};

export default Notes;
