import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Box, Text, useColorModeValue } from "@chakra-ui/react";
import {
  fetchNotes,
  addNote,
  updateNote,
  deleteNote,
} from "../redux/notesSlice";
import { RootState, AppDispatch } from "../redux/store";
import { Note } from "../redux/notesSlice";
import NotesSkeleton from "../components/UI/NotesSkeleton";
import NoteList from "../components/notes/NoteList";
import NoteEditor from "../components/notes/NoteEditor";

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

  const noteListBg = useColorModeValue("gray.50", "gray.800");
  const noteEditorBg = useColorModeValue("gray.50", "gray.900");
  const noteCardBg = useColorModeValue("gray.100", "gray.700");
  const selectedNoteBg = useColorModeValue("blue.100", "blue.900");

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
        height="calc(100vh - 30px)"
        p={4}
        bg={noteListBg}
        borderRadius="lg"
      >
        <NoteList
          notes={notes}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          handleDelete={handleDelete}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          newNote={newNote}
          noteBg={noteCardBg}
          selectedNoteBg={selectedNoteBg}
        />
      </Box>
      <NoteEditor
        selectedNote={selectedNote}
        handleChange={handleChange}
        handleBlur={handleBlur}
        noteBg={noteEditorBg}
      />
    </Flex>
  );
};

export default Notes;
