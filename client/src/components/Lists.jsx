import {
  Box,
  Typography,
  Checkbox,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllLists,
  updateTodo,
  deleteSelected,
  deleteOne,
} from "../service/api";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { theme } from "../../theme";
import { NotificationContext } from "../context/NotificationProvider";

export default function Lists() {
  const { updateNotification } = useContext(NotificationContext);
  const { data } = useSelector((state) => state.allLists || { data: [] });
  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect - Dispatching getAllLists");
    dispatch(getAllLists());
  }, []);

  const handleToggle = async (id, completed) => {
    dispatch(updateTodo({ id, completed }));
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedData = data.map((todo) => ({
      ...todo,
      completed: !selectAll,
    }));
  };

  const handleDelete = () => {
    if (selectAll) {
      dispatch(deleteSelected(selectAll));
    } else {
      updateNotification("error", "Please Select All before Deleting All!");
    }
  };

  const handleDeleteOne = (id) => {
    dispatch(deleteOne(id));
  };


  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  }


  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data.length > 0 && (
        <Box sx={{}}>
          <Button onClick={handleSelectAll}>Select All</Button>
          <Button onClick={handleDelete}>Delete All</Button>
        </Box>
      )}
      {data.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>TodoList</TableCell>
                <TableCell>CreatedAt</TableCell>
                <TableCell>CompletedAt</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(data) &&
                data.map((todo, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectAll || todo.completed}
                        onChange={() => handleToggle(todo._id, todo.completed)}
                      />
                      {todo.title}
                    </TableCell>
                    <TableCell>{todo.createdAt}</TableCell>
                    <TableCell>{todo.completedAt}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteOne(todo._id)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(todo._id)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
