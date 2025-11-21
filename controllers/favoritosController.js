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

export const setFavorito = async (req, res) => {
  const { id_usuario, id_sitio } = req.params
  try {
    const fav = await Favorito.findOne({
      where: { id_sitio, id_usuario }
    })
    if (!fav) {
      await Favorito.create({ id_sitio, id_usuario })
      return res.json({
        created: true
      })
    }
    await fav.destroy()
    return res.json({
      created: false
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error en favoritos" });
  }
}