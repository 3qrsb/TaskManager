import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { Note } from "../../redux/notesSlice";

interface NoteEditorProps {
  selectedNote: Note | null;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleBlur: () => void;
  noteBg: string;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  selectedNote,
  handleChange,
  handleBlur,
  noteBg,
}) => {
  return (
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
  );
};

export default NoteEditor;
