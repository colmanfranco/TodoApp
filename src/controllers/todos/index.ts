import { Response, Request } from "express";
import { ITodo } from "./../../types/todo";
import Todo from "../../models/todo";

const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos: ITodo[] = await Todo.find();
        res.status(200).json({ todos });
    } catch (error) {
        throw error;
    }
}

const add = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<ITodo, "name" | "description" | "status">
        const todo:ITodo = new Todo({
            name: body.name,
            description: body.description,
            status: body.status,
        })
        const newTodo: ITodo = await todo.save();
        const allTodos: ITodo[] = await Todo.find();

        res.status(201).json({
            message: "Todo added",
            todo: newTodo,
            todos: allTodos
        });
    } catch (error) {
        throw error;
    }
}

const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { params: { id }, body, } = req;
        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
            { _id: id },
            body
        );
        const allTodos: ITodo[] = await Todo.find();

        res.status(201).json({
            message: "Task updated",
            todo: updateTodo,
            todos: allTodos
        });
    } catch (error) {
        throw error;
    }
}

const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleteTodo: ITodo | null = await Todo.findByIdAndRemove(req.params.id);
        const allTodos: ITodo[] = await Todo.find();

        res.status(200).json({
            message: "Task successfully removed",
            todo: deleteTodo,
            todos: allTodos
        })
    } catch (error) {
        throw error;
    }
}

export { getAll, add, update, remove };