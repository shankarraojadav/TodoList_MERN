import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTodoList } from "../redux/actions/getAllTodos";
import { markCompleted } from "../redux/actions/markCompleted";
import { deleteMultiple } from "../redux/actions/deleteMultiple";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../context/NotificationProvider";
import "./css/lists.css";

export default function Lists() {
  console.log("Component is rendering");

  const { updateNotification } = useContext(NotificationContext);

  const { data } = useSelector((state) => state.AllTodos || {});

  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllTodoList());
  }, []);

  useEffect(() => {
    setSelectedItems([]);
    setSelectAll(false);
  }, [data]);

  const handleToggle = (id) => {
    const updatedSelectedItems = selectedItems.includes(id)
      ? selectedItems.filter((itemId) => itemId !== id)
      : [...selectedItems, id];
    setSelectedItems(updatedSelectedItems);
    setSelectAll(updatedSelectedItems.length === data.length);
  };

  const handleSelectAll = () => {
    const allItemIds = data.map((todo) => todo._id);
    setSelectedItems(selectAll ? [] : allItemIds);
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length > 0) {
      dispatch(deleteMultiple(selectedItems));
      setSelectedItems([]);
      setSelectAll(false);
    } else {
      updateNotification("error", "Please select items to delete.");
    }
  };

  const handleMarkCompletedSelected = () => {
    if (selectedItems.length > 0) {
      try {
        const selectedItemsData = data.filter((todo) =>
          selectedItems.includes(todo._id)
        );

        selectedItemsData.forEach(async (todo) => {
          const currentStatus = todo.completed;
          console.log(currentStatus);
          await dispatch(
            markCompleted({ ids: selectedItems, completed: currentStatus })
          );
        });

        setSelectedItems([]);
        setSelectAll(false);
      } catch (error) {
        console.error("Error in handleMarkCompletedSelected:", error);
        updateNotification("error", "Error marking items as completed.");
      }
    } else {
      updateNotification("error", "Please select items to mark as completed.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <div>
        {data && data.length > 0 && (
          <div className="button-container">
            <div style={{ borderRight: "1px solid black" }}>
              <button onClick={handleDeleteSelected}>Delete</button>
            </div>
            <button onClick={handleMarkCompletedSelected}>
              Mark as Completed
            </button>
          </div>
        )}
      </div>
      <div className="container_list">
        <div>
          {data && data.length > 0 && (
            <table className="table_list">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>TodoList</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) &&
                  data.map((todo, index) => (
                    <tr
                      key={index}
                      className={todo.completed ? "completed" : ""}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(todo._id)}
                          onChange={() =>
                            handleToggle(todo._id, todo.completed)
                          }
                        />
                      </td>
                      <td>
                        <p style={{ fontSize: "3vh" }}>{todo.title}</p>
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          {todo.completed ? (
                            <p>completed at - {todo.completedAt}</p>
                          ) : (
                            <p>created at - {todo.createdAt}</p>
                          )}
                        </div>
                      </td>
                      <td className="action-buttons">
                        <button onClick={() => handleEdit(todo._id)}>
                          <img src="https://res.cloudinary.com/dflhxdxgb/image/upload/v1700640617/edit-svgrepo-com_rom6ma.svg" width="30vh" alt="edit" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
