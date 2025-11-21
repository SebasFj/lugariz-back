import { postComentario } from "../controllers/comentariosController.js";
import { Router } from "express";

const router = Router()

router.post("/post/:id_usuario/:id_sitio", postComentario)
export default router