import React, { useEffect, useState } from "react";
import { Box, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Note } from "../../redux/notesSlice";
import { stripHtmlTags } from "../../utils/noteUtils";

const toolbarOptions = [
  [{ header: [] }, { font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  ["link", "blockquote", "code-block", "image"],
  [{ align: [] }],
  ["clean"],
];

const editorOptions = {
  theme: "snow",
  placeholder: "Compose an epic...",
  modules: {
    toolbar: toolbarOptions,
  },
};

interface NoteEditorProps {
  selectedNote: Note | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  noteBg: string;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  selectedNote,
  handleChange,
  handleBlur,
  noteBg,
}) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setText(selectedNote.text);
      setCharCount(stripHtmlTags(selectedNote.text).length);
    }
  }, [selectedNote]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    handleChange(e);
  };

  const handleTextChange = (value: string) => {
    setText(value);
    setCharCount(stripHtmlTags(value).length);
    handleChange({
      target: { name: "text", value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Box width="70%" p={4} ml={1} borderRadius="lg" bg={noteBg}>
      {selectedNote ? (
        <Box>
          <FormControl id="title" mb={4}>
            <FormLabel fontSize="xl">Title</FormLabel>
            <Input
              name="title"
              value={title}
              onChange={handleTitleChange}
              onBlur={handleBlur}
              variant="flushed"
              pl={3}
            />
          </FormControl>
          <FormControl id="text" mb={4}>
            <FormLabel fontSize="l">Text</FormLabel>
            <ReactQuill
              value={text}
              onChange={handleTextChange}
              onBlur={handleBlur}
              modules={editorOptions.modules}
              theme={editorOptions.theme}
              placeholder={editorOptions.placeholder}
            />
            <Text mt={2} fontSize="sm" color="gray.500">
              Character Count: {charCount}
            </Text>
          </FormControl>
        </Box>
      ) : (
        <Text>Select a note to view and edit its content</Text>
      )}
    </Box>
  );
};

export default NoteEditor;
