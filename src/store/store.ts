import { create } from "zustand";

export interface NoteState {
  title?: string;
  id?: string;
  content?: string;
  tags?: string[];
  lastUpdated?: string;
}

export interface SavedNoteState {
  noteDetails: NoteState[];
  setNoteDetails: (data: NoteState) => void;
  onRemoveNote: (id: string) => void;
  getNotesFromLocalStorage: () => void;
  clearNotes: () => void;
  filteredNotes: NoteState[];
  setFilteredNotes: (data: NoteState[]) => void;
}

export interface NavigationFlagState {
  isNavigationFlag: boolean;
  setNavigationFlag: (flag: boolean) => void;
}

export interface CreateNoteState {
  isCreateModeOn: boolean;
  inputData: NoteState | null;
  setInputData: (data: NoteState | null) => void;
  setCreateModeOn: (flag: boolean) => void;
}

export interface PreviewNoteState {
  isPreviewModeOn: boolean;
  noteData: NoteState;
  setNoteData: (data: NoteState) => void;
  setPreviewModeOn: (flag: boolean) => void;
}

export const useNavigationFlag = create<NavigationFlagState>((set) => ({
  isNavigationFlag: false,
  setNavigationFlag: (flag: boolean) => set(() => ({ isNavigationFlag: flag })),
}));

export const useCreateNote = create<CreateNoteState>((set) => ({
  isCreateModeOn: false,
  inputData: {},
  setInputData: (data: NoteState | null) => set({ inputData: data }),
  setCreateModeOn: (flag: boolean) => set(() => ({ isCreateModeOn: flag })),
}));

export const usePreviewNote = create<PreviewNoteState>((set) => ({
  isPreviewModeOn: false,
  noteData: {},
  setNoteData: (data: NoteState) => set({ noteData: data }),
  setPreviewModeOn: (flag: boolean) => set(() => ({ isPreviewModeOn: flag })),
}));

export const useSavedNote = create<SavedNoteState>((set) => ({
  noteDetails: [],
  filteredNotes: [],
  setNoteDetails: (data: NoteState) =>
    set((state) => {
      const existingNote = state.noteDetails.find(
        (note) => note.id === data.id
      );
      if (existingNote) {
        const filteredNotes = state.noteDetails.filter(
          (note) => note.id !== data.id
        );
        localStorage.setItem("notes", JSON.stringify([data, ...filteredNotes]));
        return {
          noteDetails: [data, ...filteredNotes],
        };
      } else {
        localStorage.setItem(
          "notes",
          JSON.stringify([data, ...state.noteDetails])
        );
        return {
          noteDetails: [data, ...state.noteDetails],
        };
      }
    }),
  onRemoveNote: (id: string) =>
    set((state) => {
      const filteredNotes = state.noteDetails.filter((note) => note.id !== id);
      localStorage.setItem("notes", JSON.stringify(filteredNotes));
      return {
        noteDetails: filteredNotes,
      };
    }),
  getNotesFromLocalStorage: () =>
    set(() => {
      const notes = localStorage.getItem("notes");
      if (notes) {
        return {
          noteDetails: JSON.parse(notes),
        };
      }
      return {
        noteDetails: [],
      };
    }),
  clearNotes: () =>
    set(() => {
      localStorage.removeItem("notes");
      return {
        noteDetails: [],
      };
    }),
  setFilteredNotes: (data: NoteState[]) => set(() => ({ filteredNotes: data })),
}));
