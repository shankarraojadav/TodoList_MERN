import { Box, IconButton, InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addTodo } from "../service/api";
import { useState } from "react";
import { getAllLists,  } from "../service/api";
import { theme } from "../../theme";

export default function TodoList() {
  const [data, setData] = useState({});

  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const title = data.title;
    dispatch(addTodo({ title }));
    dispatch(getAllLists());
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30vh",
        [theme.breakpoints.down('sm')]: {mt:"10vh"}
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
        />
        <IconButton onClick={handleAdd}>
          <Search />
        </IconButton>
      </Box>
    </Box>
  );
}
