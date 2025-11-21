import * as db from "../models/index.js"

const {
    Usuario,
    Genero,
    EstadoCivil,
    Estado,
    Sitio,
    Like,
    Calificacion,
    Favorito,
    Evento,
    Categoria,
    HorarioDia,
    Dia,
    Comentario,
    CategoriaSitio
} = db

export const postComentario = async (req, res) => {
    const { id_sitio, id_usuario } = req.params
    const { comentario } = req.body
    try {
        const nuevo_comentario = await Comentario.create({ id_sitio, id_usuario, comentario })
        return res.json({
            created: true,
            comentario: nuevo_comentario
        })
    } catch (error) {
        console.error("Error al publicar el comentario:", error);
        res.status(500).json({ error: "Error al publicar el comentario" });
    }
}