import { useEffect, useState } from "react";
import Button from "./components/Button";
import MessageBox from "./components/MessageBox";
import Model from "./components/Model";
import Note from "./components/Note";
import SearchBar from "./components/SearchBar";

function App() {
  const [textmsg, setTextMsg] = useState("");
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [prevNotes, setPrevNotes] = useState([]);

  const addNotesLocalStorage = () => {
    isFirstRender
      ? setNotes(JSON.parse(localStorage.getItem("notes")) || [])
      : localStorage.setItem("notes", JSON.stringify(notes));
    setIsFirstRender(false);
  };

  useEffect(addNotesLocalStorage, [notes, isFirstRender]);

  const searchHandle = () => {
    const searchNotes = notes.filter((note) => {
      return note.textmsg.includes(searchText);
    });
    setPrevNotes(searchNotes);
  };

  useEffect(searchHandle, [notes, searchText]); // eslint-disable-line

  return (
    <>
      <div className="m-6  flex-col  items-center justify-center">
        <div className="flex flex-row items-center justify-center gap-4">
          <MessageBox
            textmsg={textmsg}
            onChange={(value) => {
              setTextMsg(value);
            }}
            className={"w-2/6"}
          />

          <Button
            onClick={() => {
              if (!textmsg) {
                alert("The Notes cannot be Empty! Please Add the Notes");
                return;
              }
              setNotes((prev) => [
                { id: Number(new Date()), textmsg },
                ...prev,
              ]);
              setTextMsg("");
            }}
            text="Add Notes"
          />
        </div>
        <div className="flex flex-col items-center my-4 mt-10 justify-center w-full">
          <SearchBar value={searchText} onChange={setSearchText} />
        </div>
        <div className="mt-5 flex flex-wrap gap-6 items-center justify-center">
          {prevNotes.map((note) => {
            return (
              <Note
                key={note.id}
                note={note.textmsg}
                onClick={() => {
                  setActiveNote(note.id);
                }}
              />
            );
          })}
        </div>
      </div>

      <Model
        show={!!activeNote}
        onClose={() => {
          setActiveNote(null);
        }}
      >
        {isEditable ? (
          <MessageBox
            onBlur={() => {
              setIsEditable(false);
            }}
            textmsg={
              notes.find((note) => {
                return note.id === activeNote;
              })?.textmsg
            }
            onChange={(value) => {
              const newNotes = notes.map((note) => {
                if (note.id === activeNote)
                  return { id: note.id, textmsg: value };
                return note;
              });
              setNotes(newNotes);
            }}
            className={"w-full"}
          />
        ) : (
          <>
            <p
              onDoubleClick={() => {
                setIsEditable(true);
              }}
            >
              {
                notes.find((note) => {
                  return note.id === activeNote;
                })?.textmsg
              }
            </p>
            <button
              onClick={() => {
                setNotes(
                  notes.filter((note) => {
                    return note.id !== activeNote;
                  })
                );
                setActiveNote(null);
              }}
              className="text-sm text-white bg-red-600 p-1 px-2 rounded shadow float-right"
            >
              Delete
            </button>
          </>
        )}
      </Model>
    </>
  );
}

export default App;
