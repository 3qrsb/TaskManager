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

interface NoteEditorProps {
  selectedNote: Note | null;
  onChange: (note: Note) => void;
  onBlur: () => void;
  noteBg: string;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  selectedNote,
  onChange,
  onBlur,
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
    const updatedNote = { ...selectedNote, title: e.target.value } as Note;
    setTitle(e.target.value);
    onChange(updatedNote);
  };

  const handleTextChange = (value: string) => {
    const updatedNote = { ...selectedNote, text: value } as Note;
    setText(value);
    setCharCount(stripHtmlTags(value).length);
    onChange(updatedNote);
  };

  return (
    <Box
      width="70%"
      p={4}
      ml={1}
      borderRadius="lg"
      bg={noteBg}
      height="calc(100vh - 30px)"
      overflowY="auto"
    >
      {selectedNote ? (
        <>
          <FormControl id="title" mb={4}>
            <FormLabel fontSize="xl">Title</FormLabel>
            <Input
              name="title"
              value={title}
              onChange={handleTitleChange}
              onBlur={onBlur}
              variant="flushed"
              placeholder="Where is ur title?"
              pl={3}
            />
          </FormControl>
          <FormControl id="text" mb={4}>
            <FormLabel fontSize="l">Text</FormLabel>
            <ReactQuill
              value={text}
              onChange={handleTextChange}
              onBlur={onBlur}
              modules={{ toolbar: toolbarOptions }}
              theme="snow"
              placeholder="Compose an epic..."
            />
            <Text mt={2} fontSize="sm" color="gray.500">
              Character Count: {charCount}
            </Text>
          </FormControl>
        </>
      ) : (
        <Text>Select a note to view and edit its content</Text>
      )}
    </Box>
  );
};

export default NoteEditor;
