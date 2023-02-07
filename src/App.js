import { useState } from "react";
import Button from "./components/Button";
import MessageBox from "./components/MessageBox";
import Model from "./components/Model";
import Note from "./components/Note";

function App() {
  const [textmsg, setTextMsg] = useState("");
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(-1);
  const [isEditable, setIsEditable] = useState(false);
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
              setNotes((prev) => [textmsg, ...prev]);

              setTextMsg("");
            }}
            text="Add Notes"
          />
        </div>
        <div className="mt-5 flex flex-wrap gap-6 items-center justify-center">
          {notes.map((note, i) => {
            return (
              <Note
                key={i}
                note={note}
                onClick={() => {
                  setActiveNote(i);
                }}
              />
            );
          })}
        </div>
      </div>
      <Model
        show={activeNote > -1}
        onClose={() => {
          setActiveNote(-1);
        }}
      >
        {isEditable ? (
          <MessageBox
            onBlur={() => {
              setIsEditable(false);
            }}
            textmsg={notes[activeNote]}
            onChange={(value) => {
              const newNotes = [...notes];
              newNotes[activeNote] = value;
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
              {notes[activeNote]}
            </p>
            <button
              onClick={() => {
                setNotes(
                  notes.filter((_note, i) => {
                    return i !== activeNote;
                  })
                );
                setActiveNote(-1);
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
