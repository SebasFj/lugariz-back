import cron from "node-cron";
import { checkDate } from "../controllers/eventosController.js";

// Ejecutar todos los días a medianoche
cron.schedule("0 0 * * *", () => {
  console.log("[CRON] Verificando eventos vencidos...");
  checkDate();
});
