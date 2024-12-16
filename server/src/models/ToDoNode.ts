import mongoose from 'mongoose';

export interface ToDoObject {
  userName: string;
  title: string;
  isDone?: boolean;
  date?: string;
  index?: number;
}

export interface ToDoDocument extends ToDoObject, mongoose.Document {}

const Schema = mongoose.Schema;

const toDoSchema = new Schema(
  {
    userName: String,
    title: String,
    isDone: Boolean,
    date: String,
    index: Number,
  },
  { collection: 'todoData' }
);

const ModelName = 'ToDoNode';
const ToDoModel = mongoose.model<ToDoDocument>(ModelName, toDoSchema);

export default ToDoModel;
