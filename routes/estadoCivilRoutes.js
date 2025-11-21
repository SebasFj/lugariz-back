import { getEstadoCivil } from "../controllers/estadoCivilController.js";
import { Router } from "express";

const router = Router()

router.get("/get", getEstadoCivil)

export default router