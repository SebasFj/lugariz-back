import { Router } from "express";
import {
  loginOrCreateUser,
  updateUser,
  getUsers,
  getUserPlaces
} from "../controllers/usuariosController.js";

const router = Router();

// ✅ Login / Registro automático
router.post("/login", loginOrCreateUser);
router.put("/:id", updateUser)
router.get("/:id/sitios", getUserPlaces)
router.get("/", getUsers)

export default router;
