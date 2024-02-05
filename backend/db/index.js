import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  todos: [
    {
      title: String,
      description: String,
      completed: Boolean,
    },
  ],
});

const User = mongoose.model("User", UserSchema);
export default User;
