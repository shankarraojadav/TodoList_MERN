import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  displayName: {
    type: String,
  },

  photoURL: {
    type: String,
  },

  uid: {
    type: String,
  },

  jwtToken: {
    type: String,
  },
});

const SignIn = mongoose.model("todoUser", userSchema);

export default SignIn;
