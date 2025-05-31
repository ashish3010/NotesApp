import React, { useEffect } from "react";
import SearchBar from "../left-panel/search-bar";
import NewNote from "../left-panel/new-note";
import NotesList from "../left-panel/notes-list";
import {
  NavigationFlagState,
  SavedNoteState,
  useNavigationFlag,
  useSavedNote,
} from "@/store/store";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";
import CentralLoader from "@/components/common/central-loader";

const MobileDashboard = () => {
  const router = useRouter();
  const matches = useMediaQuery("(min-width:601px)");
  const setNavigationFlag = useNavigationFlag(
    (state: NavigationFlagState) => state.setNavigationFlag
  );
  const noteDetails = useSavedNote(
    (state: SavedNoteState) => state.noteDetails
  );

  useEffect(() => {
    if (!matches && !localStorage.getItem("notes")) {
      setNavigationFlag(true);
      router.replace("/Create_Note");
    }
  }, [matches, noteDetails, router, setNavigationFlag]);

  if (!localStorage.getItem("notes")) return <CentralLoader />;

  return (
    <div
      style={{
        padding: 24,
        marginTop: 56,
        width: "100%",
        height: "calc(100vh - 56px)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: 24,
          backgroundColor: "var(--surface)",
          borderRadius: "var(--base)",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <SearchBar />
        <div className="space-base" />
        <NewNote />
        <div className="space-base" />
        <NotesList />
      </div>
    </div>
  );
};

export default MobileDashboard;
