import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTodoList } from "../redux/actions/getAllTodos";
import { markCompleted } from "../redux/actions/markCompleted";
import { deleteMultiple } from "../redux/actions/deleteMultiple";
import { deleteOne } from "../redux/actions/deleteOne";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { NotificationContext } from "../context/NotificationProvider";
import "./css/lists.css";

export default function Lists() {
  console.log("Component is rendering");

  const { updateNotification } = useContext(NotificationContext);

  const {data} = useSelector((state) => state.AllTodos || {});

  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = useState(false);

 

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllTodoList());
  }, []);

  const handleToggle = async (id, completed) => {
    dispatch(markCompleted({ id, completed }));
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedData = data.map((todo) => ({
      ...todo,
      completed: !selectAll,
    }));
  };

  const handleDeleteMultiple = async () => {
    if (selectAll) {
      dispatch(deleteMultiple(selectAll));
    } else {
      updateNotification("error", "Please Select All before Deleting All!");
    }
  };

  const handleDeleteOne = (id) => {
    dispatch(deleteOne(id));
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="container_list">
      {data && data.length > 0 && (
        <div className="button-container">
          <button onClick={handleSelectAll}>Select All</button>
          <button onClick={handleDeleteMultiple}>Delete All</button>
        </div>
      )}
      {data && data.length > 0 && (
        <table className="table_list">
          <thead>
            <tr>
              <th>TodoList</th>
              <th>CreatedAt</th>
              <th>CompletedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data.map((todo, index) => (
                <tr key={index} className={todo.completed ? "completed" : ""}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectAll || todo.completed}
                      onChange={() => handleToggle(todo._id, todo.completed)}
                    />
                    {todo.title}
                  </td>
                  <td>{todo.createdAt}</td>
                  <td>{todo.completedAt}</td>
                  <td className="action-buttons">
                    <button onClick={() => handleDeleteOne(todo._id)}>
                      <Delete />
                    </button>
                    <button onClick={() => handleEdit(todo._id)}>
                      <Edit />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
