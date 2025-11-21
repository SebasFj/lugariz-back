import { Router } from "express";
import { setLike } from "../controllers/likesController.js";

const router = Router()

router.post("/:id_usuario/:id_sitio", setLike)

export default router