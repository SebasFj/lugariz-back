import { Router } from "express";
import { setFavorito } from "../controllers/favoritosController.js";

const router = Router()

router.post("/:id_usuario/:id_sitio", setFavorito)

export default router