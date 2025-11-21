import { getGeneros } from "../controllers/generosController.js";
import { Router } from "express";

const router = Router()

router.get("/get", getGeneros)

export default router