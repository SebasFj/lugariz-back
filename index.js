import dotenv from "dotenv";
import sequelize from "./config/db.js";
import runSeeders from'./seeders/index.js'
import app from "./app.js"
import "./cron/cronJobs.js"

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a Postgres exitosa");

    // ❗ IMPORTANTE: usar solo si quierés crear tablas desde Sequelize
    await sequelize.sync({force: true });
    await runSeeders()

    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al conectar con la BD:", error);
  }
};

startServer();
