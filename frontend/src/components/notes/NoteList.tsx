import React from "react";
import {
  Box,
  VStack,
  Button,
  IconButton,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Note } from "../../redux/notesSlice";
import { DeleteIcon } from "@chakra-ui/icons";
import { stripHtmlTags, truncateText } from "../../utils/noteUtils";

interface NoteListProps {
  notes: Note[];
  selectedNote: Note | null;
  setSelectedNote: (note: Note) => void;
  handleDelete: (noteId: number) => void;
  isAdding: boolean;
  setIsAdding: (value: boolean) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  newNote: Omit<Note, "id">;
  noteBg: string;
  selectedNoteBg: string;
}

const NoteList: React.FC<NoteListProps> = ({
  notes,
  selectedNote,
  setSelectedNote,
  handleDelete,
  isAdding,
  setIsAdding,
  handleChange,
  handleSubmit,
  newNote,
  noteBg,
  selectedNoteBg,
}) => {
  return (
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
            <Button type="submit" colorScheme="teal">
              Add Note
            </Button>
            <Button onClick={() => setIsAdding(false)} ml={4}>
              Cancel
            </Button>
          </form>
        </Box>
      ) : (
        <Button onClick={() => setIsAdding(true)} colorScheme="teal">
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
          onClick={() => setSelectedNote(note)}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="xl" fontWeight="bold">
              {truncateText(note.title, 20)}
            </Text>
            <IconButton
              aria-label="Delete note"
              icon={<DeleteIcon />}
              size="sm"
              onClick={() => handleDelete(note.id)}
            />
          </Flex>
          <Text mt={2}>{truncateText(stripHtmlTags(note.text), 80)}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default NoteList;
