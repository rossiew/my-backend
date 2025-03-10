import { Router } from "express";
import UserController from "../controllers/User.mjs";

const router= Router();

const controller = new UserController();

router.get("/",controller.getUser);
router.get("/:id",controller.getUsersById);

router.post("/",controller.addUser);

router.put("/",controller.putUser);

router.delete("/",controller.deleteUser);

export default router;