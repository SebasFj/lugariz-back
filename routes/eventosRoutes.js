import { createEvento, getEvento, getEventos, updateEvento, updateState } from "../controllers/eventosController.js";
import { Router } from "express";

const router = Router()

router.post("/create", createEvento)
router.put("/:id_evento/update", updateEvento)
router.get("/:id_evento", getEvento)
router.get("/get/activos", getEventos)
router.put("/:id_evento/state", updateState)

export default router