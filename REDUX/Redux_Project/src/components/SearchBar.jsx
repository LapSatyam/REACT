import { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../redux/features/searchSlice";

const SearchBar = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    const query = text.trim();
    if (!query) return;

    dispatch(setQuery(query));

    setText("");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex gap-2 justify-center p-10 bg-(--c2) w-full"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        className=" w-[80%] border-2 px-4 py-2 rounded outline-none"
        type="text"
        placeholder="Search anything"
      />
      <button className="border-2 px-4 py-2 rounded outline-none active:scale-95">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
