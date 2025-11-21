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

export const setLike = async (req, res) => {
  try {
    const { id_usuario, id_sitio } = req.params;

    // Traer el sitio para editar su contador
    const sitio = await Sitio.findByPk(id_sitio);
    if (!sitio) {
      return res.status(404).json({ error: "Sitio no encontrado" });
    }

    // Buscar si el like ya existe
    const like = await Like.findOne({
      where: { id_usuario, id_sitio }
    });

    // ✔️ 1. Si existe → eliminarlo y restar like
    if (like) {
      await like.destroy();

      // Evitar que el contador quede negativo
      sitio.likes = Math.max((sitio.likes || 0) - 1, 0);

      await sitio.save();

      return res.status(200).json({
        created: false
      });
    }

    // ✔️ 2. Si no existe → crearlo y sumar like
    await Like.create({ id_usuario, id_sitio });

    sitio.likes = (sitio.likes || 0) + 1;
    await sitio.save();

    return res.status(201).json({
      created: true
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error en toggle de like" });
  }
};
