import React from "react";
import {
  Box,
  VStack,
  IconButton,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Note } from "../../redux/notesSlice";
import { stripHtmlTags, truncateText } from "../../utils/noteUtils";

interface NoteListProps {
  notes: Note[];
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
  onDeleteNote: (noteId: number) => void;
  isAdding: boolean;
  toggleAdding: () => void;
  newNote: Omit<Note, "id">;
  onNewNoteChange: (note: Omit<Note, "id">) => void;
  onSubmitNewNote: (e: React.FormEvent) => void;
  noteBg: string;
  selectedNoteBg: string;
}

const NoteList: React.FC<NoteListProps> = ({
  notes,
  selectedNote,
  onSelectNote,
  onDeleteNote,
  isAdding,
  toggleAdding,
  newNote,
  onNewNoteChange,
  onSubmitNewNote,
  noteBg,
  selectedNoteBg,
}) => {
  const textBg = useColorModeValue("gray.500", "gray.300");

  return (
    <VStack spacing={5} align="stretch">
      {isAdding ? (
        <Box borderWidth="1px" borderRadius="lg" p={4} shadow="md" bg={noteBg}>
          <form onSubmit={onSubmitNewNote}>
            <FormControl id="title" mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={newNote.title}
                onChange={(e) =>
                  onNewNoteChange({ ...newNote, title: e.target.value })
                }
                required
              />
            </FormControl>
            <FormControl id="text" mb={4}>
              <FormLabel>Text</FormLabel>
              <Textarea
                name="text"
                value={newNote.text}
                onChange={(e) =>
                  onNewNoteChange({ ...newNote, text: e.target.value })
                }
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="teal">
              Add Note
            </Button>
            <Button onClick={toggleAdding} ml={4}>
              Cancel
            </Button>
          </form>
        </Box>
      ) : null}

      {notes.map((note) => (
        <Box
          key={note.id}
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          shadow={selectedNote?.id === note.id ? "lg" : "md"}
          _hover={{ shadow: "lg", transform: "scale(1.02)", cursor: "pointer" }}
          transition="all 0.3s ease-in-out"
          bg={selectedNote?.id === note.id ? selectedNoteBg : noteBg}
          onClick={() => onSelectNote(note)}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="lg" fontWeight="semibold">
              {truncateText(note.title, 20)}
            </Text>
            <IconButton
              aria-label="Delete note"
              icon={<DeleteIcon />}
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteNote(note.id);
              }}
              variant="ghost"
              colorScheme="red"
              _hover={{ color: "red.500", bg: "transparent" }}
            />
          </Flex>
          <Box maxWidth="330px" maxHeight="60px" overflow="hidden" p={2}>
            <Text fontSize="sm" mt={2} color={textBg}>
              {truncateText(stripHtmlTags(note.text), 90)}
            </Text>
          </Box>
        </Box>
      ))}
    </VStack>
  );
};

export default NoteList;
