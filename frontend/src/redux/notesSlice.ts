import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

interface Note {
  id: number;
  title: string;
  text: string;
}

interface NotesState {
  notes: Note[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  status: "idle",
  error: null,
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  return await api.get<Note[]>("/notes/");
});

export const addNote = createAsyncThunk<Note, Omit<Note, "id">>(
  "notes/addNote",
  async (newNote: Omit<Note, "id">) => {
    const response = await api.post<Note, Omit<Note, "id">>("/notes/", newNote);
    return response;
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch notes";
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      });
  },
});

export default notesSlice.reducer;
