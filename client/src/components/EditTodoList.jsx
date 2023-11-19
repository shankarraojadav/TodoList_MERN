import { Box, IconButton, InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../service/api";
import { useState, useEffect } from "react";
import { getAllLists, updateList } from "../service/api";
import { theme } from "../../theme";
import { useNavigate, useParams } from "react-router-dom";


export default function EditTodoList() {


  const [editedData, seteditedData] = useState({});

  const { id } = useParams();
 
  const { data, error, isLoading } = useSelector((state) => state.allLists || {});

  const navigate = useNavigate();

  useEffect(() => {
    if (id && data) {
      const todoItem = data.find((todo) => todo._id === id);
      if (todoItem) {
        seteditedData(todoItem);
      }
    }
  }, [id, data]);

  console.log("edited",editedData)

  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    seteditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    dispatch(updateList(editedData));
    dispatch(getAllLists());
    navigate("/home")
  };

  const handlePress = (e) => {
    if (e.key === 'Enter'){
      handleAdd();
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30vh",
        [theme.breakpoints.down('sm')]: {mt:"30vh"}
      }}
    >
      <Box
        sx={{
          display: "flex",
          border: "1px solid black",
          width: "80vh",
          padding: "1vh",
        }}
      >
        <InputBase
          placeholder="Add to Todo List"
          onChange={handleChange}
          name="title"
          sx={{ width: "100%" }}
          value={editedData.title ?? ""}
          onKeyDown={handlePress}
        />
        <IconButton onClick={handleAdd}>
          <Search />
        </IconButton>
      </Box>
    </Box>
  );
}
