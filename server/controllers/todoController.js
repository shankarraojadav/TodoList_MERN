import Todo from "../model/todoModel.js";

export const AddToDo = async (req, res) => {
  try {
    const { title } = req.body;
    console.log(title);
    if (!title) return res.status(400).json("Please enter title!");

    const user = req.user;

    const lists = { user, title };
    const newList = new Todo(lists);
    await newList.save();

    const getLists = await Todo.find({ user });

    return res.status(200).json(getLists);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "error while adding todo" });
  }
};

export const getAllLists = async (req, res) => {
  try {
    
    const { _id, email } = req.user;
    const user = _id;
    console.log(user)
    const getLists = await Todo.find({ user });
    // console.log(getLists);
    return res.status(200).json(getLists);
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Errow while fetching all list", error: error.message });
  }
};

export const updateCompleted = async (req, res) => {
  try {
    const { id, completed } = req.body;
    const user = req.user;
    const newCompleted = !completed;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { completed: newCompleted },
      { new: true }
    );

    if (newCompleted) {
      updatedTodo.completedAt = new Date().toLocaleString();
    } else {
      updatedTodo.completedAt = null;
    }

    await updatedTodo.save();

    const getLists = await Todo.find({ user });

    return res.status(200).json(getLists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTodoList = async (req, res) => {
  try {
    const { _id, title } = req.body;
    const user = req.user;

    const todoListItem = await Todo.findOne({ _id, user: user._id });

    if (!todoListItem) {
      return res.status(404).json({ error: "Todo list item not found" });
    }

    todoListItem.title = title;

    await todoListItem.save();

    const getLists = await Todo.find({ user });

    return res.status(200).json(getLists);
  } catch (error) {
    console.error("Error updating todo list item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSelected = async (req, res) => {
  try {
    const { selectAll } = req.body;

    const user = req.user;

    if (selectAll) {
      const deleteSelected = await Todo.deleteMany({ user });
    }
    return res.status(200).json({ message: "successfully deleted All Lists!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteOneItem = async (req, res) => {
  try {
    console.log("hi");
    const { id } = req.body;

    const { _id, email } = req.user;
    const user = _id;

    const deleteItem = await Todo.deleteOne({ _id: id, user });

    if (deleteItem.deletedCount > 0) {
      const getLists = await Todo.find({ user });

      return res.status(200).json(getLists);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while deleting one item!" });
  }
};
