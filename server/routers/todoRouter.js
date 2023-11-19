import express from "express";
import { AddToDo, deleteOneItem, deleteSelected, getAllLists, updateCompleted, updateTodoList } from "../controllers/todoController.js";
import { Auth } from "../middlewares/auth.js";
import { googleSignin, verifyToken } from "../controllers/userController.js";

const router = express.Router();


router.post("/signin", googleSignin);
router.post("/verifyToken", Auth, verifyToken);
router.post("/addTodo", Auth, AddToDo);
router.get("/getAllLists", Auth, getAllLists);
router.put("/updateCompleted", Auth, updateCompleted);
router.delete("/deleteSelected", Auth, deleteSelected);
router.delete("/deleteOne", Auth, deleteOneItem)
router.put("/updatetodo", Auth, updateTodoList);


export default router;