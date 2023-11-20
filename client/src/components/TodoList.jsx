import { Search } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getAllLists, addTodo } from "../service/api";
import "./css/todolist.css";

export default function TodoList() {
  const [data, setData] = useState({});

  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (data) {
      const title = data.title;
      dispatch(addTodo({ title }));
      dispatch(getAllLists());
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
          name="title"
          onKeyDown={handlePress}
          className="todo_input"
        />
        <button onClick={handleAdd} className="todo_btn">
          <Search sx={{color:"blue"}} />
        </button>
      </div>
    </div>
  );
}
