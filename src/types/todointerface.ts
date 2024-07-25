import { Document } from "mongoose";

export interface ItemTodo extends Document {
    text: string;
    userId: string;
    completed: boolean;
    date: string;
}
