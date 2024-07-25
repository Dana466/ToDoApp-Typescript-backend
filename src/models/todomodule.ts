import {ItemTodo} from '../types/todointerface'
import { model,Schema } from 'mongoose';

const todoSchema: Schema = new Schema({
    text: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        default: '643bca55dd25ab961ffe3031'
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: String,
        default: Date.now
    }
});

export default  model<ItemTodo>('ToDotasks', todoSchema)