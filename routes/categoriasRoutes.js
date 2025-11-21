import { getCategorias } from "../controllers/categoriasController.js";
import { Router } from "express";

const router = Router()

router.get("/", getCategorias)

export default router