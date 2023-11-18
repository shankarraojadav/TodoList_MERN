import { Box, Typography, Checkbox, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllLists,
  updateTodo,
  deleteSelected,
  deleteOne,
} from "../service/api";
import { Delete } from "@mui/icons-material";
import { theme } from "../../theme";

export default function Lists() {
  const { data } = useSelector((state) => state.allLists || { data: [] });
  const dispatch = useDispatch();

  const [selectAll, setSelectAll] = useState(false);

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
    }
  };

  const handleDeleteOne = (id) => {
    dispatch(deleteOne(id));
  };

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
          <Button onClick={handleDelete}>Delete Selected</Button>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "scroll",
          maxHeight: "60vh",
        }}
      >
        {Array.isArray(data) &&
          data.map((todo, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                marginBottom: 2,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: 4,
                width: "100vh",
                textDecoration: todo.completed ? "line-through" : "none",
                [theme.breakpoints.down('sm')]: {width:"70vh"},
                [theme.breakpoints.down("ms3")]: {width: "50vh", overflowX:"hidden"}
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  checked={selectAll || todo.completed}
                  onChange={() => handleToggle(todo._id, todo.completed)}
                />
                <Typography
                  sx={{
                    ml: "10vh",
                    [theme.breakpoints.down("sm")]: { ml: "3vh" },
                  }}
                >
                  {todo.title}
                </Typography>
                <Typography
                  sx={{
                    ml: "30vh",
                    [theme.breakpoints.down("sm")]: { ml: "3vh" },
                  }}
                >
                  {todo.createdAt}
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={() => handleDeleteOne(todo._id)}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
}
