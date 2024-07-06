import { model, Schema } from "mongoose";



const todoSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

const TODO = model('TODO', todoSchema);
export default TODO; 