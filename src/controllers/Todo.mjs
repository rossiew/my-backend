import pool from "../database.mjs";
import TodoRepository from "../repositories/todo.mjs";



class TodoController {

    async getTodos(req, res) {
        if (req.user) {
            const todos = await TodoRepository.getTodos();
            res.send(todos)
        }
        res.sendStatus(401)
    }

    async getTodoById(req, res) {
        if (req.user) {
            const todos = await TodoRepository.getTodoById(req.params.id, req.user)
            return res.send(todos)
        }
        res.sendStatus(401)
    }

    async addTodo(req, res) {

        if (req.user) {
            const todos = await TodoRepository.getTodoById(req.body, req.user)
            return res.send(todos)
        }
        res.sendStatus(401)
    }

    async updateTodo(req, res) {

        if (req.user) {
            const todos = await TodoRepository.getTodoById(req.body, req.user)
            return res.send(todos)
        }
        res.sendStatus(401)

    }

    async deleteTodo(req, res) {

        if (req.user) {
            const todos = await TodoRepository.getTodoById(req.body, req.user)
            return res.send(todos)
        }
        res.sendStatus(401)

    }

   

}
export default TodoController;