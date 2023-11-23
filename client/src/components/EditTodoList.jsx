import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateTodo, getTodoById } from "../redux/actions/todoActions";
import { useNavigate, useParams } from "react-router-dom";
import "./css/todolist.css";

export default function EditTodoList() {
  const [editedData, seteditedData] = useState({});

  const { id } = useParams();
  const { toDoByIdData } = useSelector((state) => state.getTodoById || {});
  const todo = toDoByIdData?.todo || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoById(id));
  }, [dispatch, id]);

  useEffect(() => {
    // Check if status is truthy and set the entire todo object as editedData
    if (toDoByIdData?.status) {
      seteditedData(todo);
    }
  }, [toDoByIdData, todo]);

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
        <img
          src="https://res.cloudinary.com/dflhxdxgb/image/upload/v1700640728/search_gt5pvf.svg"
          width="30vh"
          alt="search"
        />
      </div>
    </div>
  );
}
