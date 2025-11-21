import { Router } from "express";
import { 
    updateState,
    crearSitio,
    getSitio,
    getSitios,
    updateSitio,
    calificar
} from "../controllers/sitiosController.js";

const router = Router();

router.put("/:id/state", updateState);
router.put("/update/:id", updateSitio);
router.post("/crear", crearSitio)
router.get("/:id", getSitio)
router.get("/get/activos", getSitios)
router.post("/calificar", calificar)

export default router;
