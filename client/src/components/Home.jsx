import { Box } from "@mui/material";
import TodoList from "./TodoList";
import Lists from "./Lists";


export default function Home() {
  return (
    <Box>
      <TodoList />
      <Lists />
    </Box>
  );
}
