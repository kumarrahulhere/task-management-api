import express from "express";
import {
  getUsers,
  toggleUserVerification,
  deleteUser,
} from "../controller/admin/user.controller";
import {
  changeTaskStatus,
  createUserTask,
  getTask,
  getTasks,
} from "../controller/admin/task.controller";

const router = express.Router();

router.get("/users", getUsers);
router.delete("/user", deleteUser);
router.post("/toggle-user-verification", toggleUserVerification);

router.get("/tasks", getTasks);
router.post("/task", createUserTask);
router.get("/task/:id", getTask);
router.post("/task-status", changeTaskStatus);

export default router;
