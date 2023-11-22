import { Search } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addTodo } from "../redux/actions/addTodo";
import "./css/todolist.css";

export default function TodoList() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAdd = () => {
    if (title.trim() !== "") {
      dispatch(addTodo(title));
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
      </div>
    </div>
  );
}
