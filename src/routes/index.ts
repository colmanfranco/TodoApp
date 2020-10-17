import { Router } from "express";
import { getAll, add, update, remove } from "../controllers/todos/index";

const router: Router = Router();

router.get("/todos", getAll);

router.post("/add-todo", add);

router.put("/update-todo/:id", update);

router.delete("/remove-todo/:id", remove);

export default router