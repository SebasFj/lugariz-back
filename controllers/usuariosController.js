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
  Categoria
} = db

export const updateUser = async(req,res) => {
  try {
    const data = req.body
    const { id } = req.params
    const usuario = await Usuario.findByPk(id)
    if (!usuario){
      res.status(404).json({
        success: false,
        message: "usuario no encontrado"
      })
    }
    await usuario.update(data)
    return res.json({
      success: true,
      message: "Usuario encontrado correctamente",
      user: usuario
    })
  } catch (error) {
      return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


export const loginOrCreateUser = async (req, res) => {
  try {
    const { id, email, nombre, foto } = req.body;

    if (!id || !email) {
      return res.status(400).json({
        success: false,
        message: "Faltan id o email."
      });
    }

    let usuario = await Usuario.findOne({
      where: { id },
    });

    if (!usuario) {
      usuario = await Usuario.create({
        id,
        email,
        nombre,
        imagen: foto,
        id_estado: 1, // activo
        id_genero: 1, //No especificado
        id_estado_civil: 1
      });
    }

    const estadoUsuario = await Estado.findByPk(usuario.id_estado);

    if (estadoUsuario?.nombre?.toLowerCase() === "inactivo") {
      return res.status(403).json({
        success: false,
        message: "Usuario inactivo. No puede iniciar sesión."
      });
    }

    const usuarioConRelaciones = await Usuario.findByPk(usuario.id, {
      include: [
        { model: EstadoCivil, attributes: ["nombre"] }, // solo atributos que queremos
        { model: Genero, attributes: ["nombre"] },
        { 
          model: Sitio, 
          as: "sitiosPropios",
          include: [
            { model: Evento, as: "eventos" }
          ]
        },
        { model: Like, as: "sitiosLikeados", attributes: ["id_sitio"] },
        { model: Favorito, as: "favoritos", attributes: ["id_sitio"] },
        { model: Calificacion, as: "sitiosCalificados", attributes: ["id_sitio", "calificacion"] }
      ]
    });


    return res.json({
      success: true,
      user: usuarioConRelaciones
    });

  } catch (error) {
    console.error("Error en loginOrCreateUser:", error);
    return res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

export const getUserPlaces = async (req,res) => {
  try {
    const { id } = req.params;

    const sitios = await Sitio.findAll({
      where: { id_administrador: id },
      include: [
        {model: Estado},
        {
          model: Categoria, 
          through: {attributes:[]}
        }
      ],
      order: [["id", "DESC"]],
    });

    return res.json(sitios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los sitios del usuario" });
  }
}
