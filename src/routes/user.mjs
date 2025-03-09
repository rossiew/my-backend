import { Router } from "express";
import UserController from "../controllers/User.mjs";

const router= Router();

const controller = new UserController();

router.get("/users",controller.getUser);
router.get("/users/:id",controller.getUsersById);

router.post("/users",controller.addUser);

router.put("/users",controller.putUser);

router.delete("/users",controller.deleteUser);

export default router;