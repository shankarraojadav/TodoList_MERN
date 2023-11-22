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
    const getLists = await Todo.find({ user });

    return res.status(200).json(getLists);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Errow while fetching all list", error: error.message });
  }
};

export const updateCompleted = async (req, res) => {
  try {
    const { ids, completed } = req.body;
    const user = req.user;
    const newCompleted = !completed;

    // Update multiple Todo items with the provided ids
    const updatedTodos = await Todo.updateMany(
      { _id: { $in: ids }, user },
      {
        $set: {
          completed: newCompleted,
          completedAt: newCompleted ? new Date().toLocaleString() : null,
        },
      },
      { new: true }
    );

    console.log("Updated Todos:", updatedTodos);

    // Fetch and return the updated list of Todos
    const getLists = await Todo.find({ user });

    return res.status(200).json(getLists);
  } catch (error) {
    console.error("Error in updateCompleted:", error);
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
    const { selectedItems } = req.body;
    const user = req.user;

    if (selectedItems && selectedItems.length > 0) {
      const deleteResult = await Todo.deleteMany({
        _id: { $in: selectedItems },
        user,
      });

      if (deleteResult.deletedCount > 0) {
        console.log("hello");
        const getLists = await Todo.find({ user });

        return res.status(200).json(getLists);
      }
    }

    
  } catch (error) {}
};

