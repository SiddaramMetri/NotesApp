const SearchBar = (props) => {
  return (
    <>
      <input
        type="text"
        className="p-2 border border-gray-500 rounded shadow text-center w-[40%]"
        placeholder="Search Here"
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
    </>
  );
};

export default SearchBar;
