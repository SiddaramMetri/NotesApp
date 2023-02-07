const MessageBox = (props) => {
  return (
    <>
      <textarea
        className={
          "form-control block  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none " +
          props.className
        }
        value={props.textmsg}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
        rows="3"
        placeholder="Take a note..."
        onBlur={props.onBlur}
      ></textarea>
    </>
  );
};

export default MessageBox;
