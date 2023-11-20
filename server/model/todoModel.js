import mongoose from "mongoose";

const getIndianTime = () => {
  const now = new Date();
  const utcOffset = 5.5 * 60; // India Standard Time (IST) UTC+5:30
  const indianTime = new Date(now.getTime() + utcOffset * 60000);
  return indianTime.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

const todoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SignIn",
    required: true,
  },
  title: { type: String, required: true },
  createdAt: { type: String, default: getIndianTime() },
  completedAt: { type: String, default: null },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
