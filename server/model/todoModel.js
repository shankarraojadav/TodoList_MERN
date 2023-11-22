import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userSignIn",
    required: true,
  },
  title: { type: String, required: true },
  createdAt: { type: String, default: new Date().toLocaleString() },
  completedAt: { type: String, default: null },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
