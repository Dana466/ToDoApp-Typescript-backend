import { Request,Response } from "express";
import { ItemTodo } from "../types/todointerface";
import ToDoTasks from "../models/todomodule";
import {RequestWithUserId} from '../authenticationMiddlware/auth';

export const getToDo = async (req: RequestWithUserId, res: Response): Promise<void> => {
    try {
        const todos: ItemTodo[] = await ToDoTasks.find({ userId: req.user._id }).sort({ date: -1 });
        res.json({todos});
    } catch (error) {
        throw error;
    }
}

export const saveToDo = async (req: RequestWithUserId, res: Response): Promise<void> => {
    try {
        const { text } = req.body;
        const userId = req.user._id;

        const newTodo: ItemTodo = await ToDoTasks.create({
       text,
          userId
        });

        res.json({
            code: 200,
            message: "Successfully created the required todo item.",
            data: newTodo
        });
    } catch (err) {
        res.status(400).json({
            code: 400,
            message: "Error creating the todo item.",
           
        });
    }
}

export const updateToDo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log(`The given id ${id} is updated successfully`);
    try {
        await ToDoTasks.findByIdAndUpdate(id, { completed: true });
        res.send("Updated Successfully");
    } catch (err) {
        res.json(err);
    }
}

export const deleteToDo = async (req: Request, res: Response): Promise<void> => {
    try {
        const todo:ItemTodo = await ToDoTasks.findByIdAndDelete(req.params.id);

        if (!todo) {
            res.status(404).send("No item found");
        } else {
            res.status(200).send("The item is deleted");
        }
    } catch (err) {
        res.status(500).send(err);
    }
}