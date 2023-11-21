import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateTodo } from "../redux/actions/updateTodo";
import { useNavigate, useParams } from "react-router-dom";
import "./css/todolist.css";

export default function EditTodoList() {
  const [editedData, seteditedData] = useState({});

  const { id } = useParams();

  const { data } = useSelector((state) => state.AllTodos || {});


  const navigate = useNavigate();

  useEffect(() => {
    if (id && data) {
      const todoItem = data.find((todo) => todo._id === id);
      if (todoItem) {
        seteditedData(todoItem);
      }
    }
  }, [id, data]);



  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    seteditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    dispatch(updateTodo(editedData));
  
    navigate("/home");
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
          value={editedData.title ?? ""}
        />
        <button onClick={handleAdd} className="todo_btn">
          <Search sx={{ color: "blue" }} />
        </button>
      </div>
    </div>
  );
}
