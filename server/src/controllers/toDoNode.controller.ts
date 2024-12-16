import { Request, Response } from 'express';
import toDoNodeService from '../services/toDoNode.service';
import { ToDoObject } from '../models/ToDoNode';

const getList = async (req: Request, res: Response) => {
  console.log(req.originalUrl);
  try {
    const list = await toDoNodeService.getToDoList();

    res.status(200).json(list);
  } catch (err) {
    console.error(err);
  }
};

const addToDo = async (req: Request, res: Response) => {
  console.log(req.originalUrl);
  console.log(req.body);
  const { userName, title }: { userName: string; title: string } = req.body;
  const object: ToDoObject = {
    userName,
    title,
  };
  console.log(object);

  const result = await toDoNodeService.saveToDoItem(object);
  console.log(result);

  res.status(result.status).json({
    message: result.message,
    toDoId: result?.ToDoId,
    reason: result?.reason,
  });
};

const deleteToDo = async (req: Request, res: Response) => {
  console.log(req.originalUrl);
  const { id } = req.params;

  const result = await toDoNodeService.deleteOne(id);
  console.log(result);

  res
    .status(result.status)
    .json({ message: result.message, reason: result?.reason });
};

const editToDo = async (req: Request, res: Response) => {
  console.log(req.originalUrl);
  const { id, title, userName } = req.body;

  const result = await toDoNodeService.edit(id, title, userName);
  console.log(result);

  res
    .status(result.status)
    .json({ message: result.message, reason: result?.reason });
};

const editIsDone = async (req: Request, res: Response) => {
  console.log(req.originalUrl);
  const { id } = req.body;

  const result = await toDoNodeService.editIsDone(id);
  console.log(result);

  res
    .status(result.status)
    .json({ message: result.message, reason: result?.reason });
};

export default { getList, addToDo, deleteToDo, editToDo, editIsDone };
