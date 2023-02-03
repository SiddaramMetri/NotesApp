import { useState } from "react";
import Button from "./components/Button";
import MessageBox from "./components/MessageBox";
import NotesList from "./components/NotesList";

function App() {
  const [textmsg, setTextMsg] = useState("");
  const [notes, setNotes] = useState([]);
  return (
    <>
      <div className="m-6  flex-col  items-center justify-center">
        {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
        <div className="flex flex-row items-center justify-center gap-4">
          <MessageBox textmsg={textmsg} setTextMsg={setTextMsg} />
          <Button
            onClick={() => {
              if (!textmsg) {
                alert("The Notes cannot be Empty! Please Add the Notes");
                return;
              }
              setNotes((prev) => [
                {
                  id: new Date(),
                  textMessage: textmsg,
                },
                ...prev,
              ]);
              setTextMsg("");
            }}
            text="Add Notes"
          />
        </div>
        <div className="mt-5 flex flex-wrap gap-6 items-center justify-center">
          {notes.map((note, i) => {
            return <NotesList key={i} note={note} />;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
