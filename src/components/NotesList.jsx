const NotesList = (props) => {
  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base">{props.note.textMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default NotesList;
