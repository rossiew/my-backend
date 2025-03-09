import {Router} from "express"
import TodoController from "../controllers/todo.mjs"

const router = Router()
const controllers = new TodoController()

router.get("/todo",controllers.getTodos);
router.get("/todo/:id", controllers.getTodos)
router.post("/todo", controllers.getTodos)

export default router;