import express from "express";
import { AddToDo, deleteSelected, getAllTodos, getTodoDataById, markCompleted, updateTodoList } from "../controllers/todoController.js";
import { Auth } from "../middlewares/auth.js";
import { googleSignin, verifyToken } from "../controllers/userController.js";

const router = express.Router();


router.post("/signin", googleSignin);
router.post("/verifyToken", Auth, verifyToken);
router.post("/addTodo", Auth, AddToDo);
router.get("/getAllLists", Auth, getAllTodos);
router.put("/updateCompleted", Auth, markCompleted);
router.delete("/deleteSelected", Auth, deleteSelected);
router.put("/updatetodo", Auth, updateTodoList);
router.get("/getTodoById/:id", Auth, getTodoDataById);


export default router;