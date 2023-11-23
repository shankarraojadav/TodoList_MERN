import { useDispatch } from "react-redux";
import { useState } from "react";
import { addTodoList } from "../redux/actions/todoActions";
import "./css/todolist.css";

export default function TodoList() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAdd = () => {
    if (title.trim() !== "") {
      dispatch(addTodoList(title));
      setTitle("");
    }
  };

  const handlePress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          border: "1px solid black",
          width: "80vh",
          padding: "1vh",
        }}
      >
        <input
          placeholder="Add to Todo List"
          onChange={handleChange}
          value={title}
          onKeyDown={handlePress}
          className="todo_input"
        />
        <img src="https://res.cloudinary.com/dflhxdxgb/image/upload/v1700640728/search_gt5pvf.svg" width="30vh" alt="" />
      </div>
    </div>
  );
}
