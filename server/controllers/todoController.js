import Todo from "../model/todoModel.js";

export const AddToDo = async (req, res) => {
  try {
    const { title } = req.body;
    console.log(title);
    if (!title) return res.status(400).json("Please enter title!");

    const userId = req.user;

    let userTodo = await Todo.findOne({ userId });

    if (!userTodo) {
      userTodo = new Todo({
        userId,
        todos: [],
      });
    }

    userTodo.todos.push({
      title,
    });

    await userTodo.save();

    return res
      .status(200)
      .json({ status: "true", message: "Successfully added the todo" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: "false", message: "Error while adding todo" });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const userId = req.user;

    const getLists = await Todo.find({ userId });

    const allTodos = getLists.flatMap((list) =>
      list.todos.map((todo) => ({
        _id: todo._id,
        title: todo.title,
        createdAt: todo.createdAt,
        completed: todo.completed,
        completedAt: todo.completedAt,
        updatedAt: todo.updatedAt,
      }))
    );

    return res.status(200).json({ status: true, todos: allTodos });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error while fetching todos", error: error.message });
  }
};

export const markCompleted = async (req, res) => {
  try {
    const { ids, completed } = req.body;
    const userId = req.user;
    const newCompleted = !completed;

    const promises = ids.map(async (id) => {
      return Todo.updateOne(
        { userId, "todos._id": id },
        {
          $set: {
            "todos.$.completed": newCompleted,
            "todos.$.completedAt": newCompleted
              ? new Date().toLocaleString()
              : null,
          },
        }
      );
    });

    await Promise.all(promises);

    return res
      .status(200)
      .json({ status: true, message: "Mark list completed" });
  } catch (error) {
    return res.status(400).json({
      status: "false",
      message: "Error while Marking complete the todo",
    });
  }
};

export const updateTodoList = async (req, res) => {
  try {
    const { _id, title } = req.body;
    const userId = req.user;

    const todoListItem = await Todo.findOne({
      "todos._id": _id,
      userId: userId._id,
    });

    if (!todoListItem) {
      return res.status(404).json({ error: "Todo list item not found" });
    }

    const todoItem = todoListItem.todos.id(_id);
   
    if (!todoItem) {
      return res
        .status(404)
        .json({ error: "Todo item not found within the list" });
    }

    todoItem.title = title;
    todoItem.updatedAt = new Date().toLocaleString();

    await todoListItem.save();

    return res
      .status(200)
      .json({ status: "true", message: "Successfully updated the todo" });
  } catch (error) {
    console.error("Error updating todo list item:", error);
    return res
      .status(400)
      .json({ status: "false", message: "Error while updating todo" });
  }
};

export const deleteSelected = async (req, res) => {
  try {
    const { selectedItems } = req.body;
    const userId = req.user;

    if (selectedItems && selectedItems.length > 0) {
      const deleteResult = await Todo.updateOne(
        { userId },
        {
          $pull: {
            todos: { _id: { $in: selectedItems } },
          },
        }
      );
      if (deleteResult.matchedCount > 0) {
        console.log("hello");

        return res
          .status(200)
          .json({ status: true, message: "Successfully deleted the todo" });
      }
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Error while deleting todo" });
  }
};

export const getTodoDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user;

    const todoList = await Todo.findOne({ userId });

    if (!todoList) {
      return res
        .status(404)
        .json({ status: false, message: "Todo list not found" });
    }

    const todo = todoList.todos.find((item) => item._id.toString() === id);

    if (!todo) {
      return res.status(404).json({ status: false, todo: todo });
    }

    console.log(todo);

    return res
      .status(200)
      .json({ status: true, message: "Get todo by ID successful", todo });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Error while getting todo by ID" });
  }
};
