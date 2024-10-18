
import mongoose from "mongoose";

const SubTodoSchema = new mongoose.Schema({
         content: {
                  type: String,
                  required: true
         },
         completed: {
                  type: Boolean,
                  default: false
         },
         createdBy: {
                  type: mongoose.Schema.Types.ObjectId, // Assuming you have a User model
                  ref: 'User' // Referring to the User model
         }
}, { timestamps: true });

export const SubTodo = mongoose.model("SubTodo", SubTodoSchema)