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

export const getCategorias = async (req,res) => {
    try {
    const categorias = await Categoria.findAll({
      attributes: ["id", "nombre"],
    });

    res.json(categorias);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
}