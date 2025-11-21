import express from "express";
import cors from "cors";
import userRoutes from "./routes/usersRoutes.js";
import generoRoutes from "./routes/generosRoutes.js"
import estadoCivilRoutes from "./routes/estadoCivilRoutes.js"
import sitiosRoutes from "./routes/sitiosRoutes.js"
import categoriasRoutes from "./routes/categoriasRoutes.js"
import eventosRoutes from "./routes/eventosRoutes.js"
import favoritosRoutes from "./routes/favoritosRoutes.js"
import likesRoutes from "./routes/likesRoutes.js"
import comentariosRoutes from "./routes/comentariosRoutes.js"

const app = express();

app.use(cors());
app.use(express.json());

// Ruta base
app.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente ✅" });
});

// Rutas
//usuarios
app.use("/api/usuarios", userRoutes);


//generos
app.use("/api/generos", generoRoutes)


//estado civil
app.use("/api/estado_civil", estadoCivilRoutes)


//sitios
app.use("/api/sitios", sitiosRoutes)


//categorias
app.use("/api/categorias", categoriasRoutes)


//categorias
app.use("/api/eventos", eventosRoutes)


//categorias
app.use("/api/likes", likesRoutes)


//categorias
app.use("/api/favoritos", favoritosRoutes)


//categorias
app.use("/api/comentarios", comentariosRoutes)


export default app;
