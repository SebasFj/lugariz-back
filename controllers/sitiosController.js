import * as db from "../models/index.js"
import sequelize from "../config/db.js";

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

export const updateState = async (req,res) => {

    const { id } = req.params;

    try {
        const sitio = await Sitio.findByPk(id, { include: Estado });
        if (!sitio) {
        return res.status(404).json({ ok: false, message: "Sitio no encontrado" });
        }

        // Obtener el estado actual
        const estadoActual = sitio.Estado?.nombre

        // Determinar el nuevo estado
        let nuevoEstadoNombre;
        if (estadoActual === "Activo") {
        nuevoEstadoNombre = "Inactivo";
        } else if (estadoActual === "Inactivo") {
        nuevoEstadoNombre = "Activo";
        } else {
        return res.status(400).json({ ok: false, message: "El sitio no puede cambiar de estado desde su estado actual." });
        }

        // Buscar el nuevo estado en la tabla Estados
        const nuevoEstado = await Estado.findOne({ where: { nombre: nuevoEstadoNombre } });
        if (!nuevoEstado) {
        return res.status(500).json({ ok: false, message: `Estado '${nuevoEstadoNombre}' no encontrado en la base de datos.` });
        }

        // Actualizar el id_estado del sitio
        sitio.id_estado = nuevoEstado.id;
        await sitio.save();

        res.json({
        ok: true,
        message: `El sitio ahora está en estado '${nuevoEstado.nombre}'.`,
        sitio,
        });
    } catch (error) {
        console.error("Error al actualizar el estado del sitio:", error);
        res.status(500).json({
        ok: false,
        message: "Error interno al actualizar el estado del sitio",
        });
    }
}


export const crearSitio = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const {
      id_usuario,
      nombre,
      descripcion,
      telefono,
      direccion,
      indicaciones,
      pet_friendly,
      edad_ingreso,
      imagen,
      categorias = [],
      horarios = []
    } = req.body;

    const id_estado = 1;

    // 1️⃣ Crear el sitio principal
    const nuevoSitio = await Sitio.create(
      {
        id_administrador: id_usuario,
        nombre,
        descripcion,
        telefono,
        direccion,
        indicaciones,
        pet_friendly,
        edad_ingreso,
        id_estado,
        rating: 0,
        likes: 0,
        imagen,
      },
      { transaction: t }
    );

    // 2️⃣ Insertar las categorías seleccionadas
    if (categorias.length > 0) {
      const categoriasData = categorias.map((id_categoria) => ({
        id_sitio: nuevoSitio.id,
        id_categoria,
      }));
      await CategoriaSitio.bulkCreate(categoriasData, { transaction: t });
    }

    // 3️⃣ Insertar los horarios
    if (horarios && Object.keys(horarios).length > 0) {
      function padZero(numStr) {
        if (!numStr) {
          return numStr
        }
        return numStr.length === 1 ? "0" + numStr : numStr;
      }
      function fixFormat (horaStr) {
        let [h,m] = horaStr.split(":")
        h = padZero(h)
        m = padZero(m)
        return h + ":" + m
      }
      let horariosData = Object.entries(horarios).map(([id_dia, h]) => ({
        id_sitio: nuevoSitio.id,
        id_dia: Number(id_dia),
        apertura: fixFormat(h.apertura),
        cierre: fixFormat(h.cierre),
      }));
      horariosData = horariosData.filter((h)=> !h.apertura.includes("und") && !h.cierre.includes("und"))
      await HorarioDia.bulkCreate(horariosData, { transaction: t });
    }


    // 4️⃣ Confirmar la transacción
    await t.commit();

    return res.status(201).json({
      success: true,
      message: "Sitio creado exitosamente",
      sitio: nuevoSitio,
    });
  } catch (error) {
    await t.rollback();
    console.error("Error al crear sitio:", error);
    return res.status(500).json({
      success: false,
      message: "Error al crear sitio",
      error: error.message,
    });
  }
};

export const getSitio = async (req,res)=>{
  const { id } = req.params;

  try {
    const sitio = await Sitio.findByPk(id, {
      include: [
        // Estado actual del sitio
        {
          model: Estado,
          attributes: ["id", "nombre"],
        },

        // Categorías del sitio (muchos a muchos)
        {
          model: Categoria,
          through: { attributes: [] }, // omite tabla intermedia
          attributes: ["id", "nombre"],
        },

        // Horarios del sitio con su día correspondiente
        {
          model: HorarioDia,
          as: "horarios",
          attributes: ["id", "apertura", "cierre"],
          include: [
            {
              model: Dia,
              as: "dia",
              attributes: ["id", "nombre"],
            },
          ],
        },

        // Comentarios con su usuario asociado
        {
          model: Comentario,
          as: "comentarios",
          attributes: ["id", "comentario"],
          include: [
            {
              model: Usuario,
              attributes: ["nombre", "imagen"],
            },
          ],
        },

        // Eventos asociados al sitio
        {
          model: Evento,
          as: "eventos",
          attributes: [ "id", "nombre", "imagen", "fecha_inicio", "fecha_fin"],
          include: [
            {
                model: Estado,
                attributes: ["id","nombre"]
            }
          ]
        },
      ],
    });

    if (!sitio) {
      return res.status(404).json({ message: "Sitio no encontrado" });
    }

    res.json(sitio);
  } catch (error) {
    console.error("Error al obtener detalle del sitio:", error);
    res.status(500).json({ message: "Error al obtener detalle del sitio" });
  }
}


export const updateSitio = async (req,res) => {
  const { id } = req.params;
  const {
    nombre,
    descripcion,
    telefono,
    direccion,
    indicaciones,
    pet_friendly,
    edad_ingreso,
    imagen,
    categorias,
    horarios,
  } = req.body;

  const t = await Sitio.sequelize.transaction();

  try {
    // 1️⃣ Verificar si el sitio existe
    const sitio = await Sitio.findByPk(id, { transaction: t });
    if (!sitio) {
      await t.rollback();
      return res.status(404).json({ success: false, message: "Sitio no encontrado" });
    }

    // 2️⃣ Actualizar datos principales del sitio
    await sitio.update(
      {
        nombre,
        descripcion,
        telefono,
        direccion,
        indicaciones,
        pet_friendly,
        edad_ingreso,
        imagen,
      },
      { transaction: t }
    );

    // 3️⃣ Actualizar categorías (relación N:M)
    if (Array.isArray(categorias)) {
      // Eliminar relaciones actuales
      await CategoriaSitio.destroy({ where: { id_sitio: id }, transaction: t });
      // Crear nuevas relaciones
      const nuevasCategorias = categorias.map((id_categoria) => ({
        id_sitio: id,
        id_categoria,
      }));
      await CategoriaSitio.bulkCreate(nuevasCategorias, { transaction: t });
    }

    // 4️⃣ Actualizar horarios
    if (horarios && typeof horarios === "object") {
      function padZero(numStr) {
        if (!numStr) {
          return numStr
        }
        return numStr.length === 1 ? "0" + numStr : numStr;
      }
      function fixFormat (horaStr) {
        let [h,m] = horaStr.split(":")
        h = padZero(h)
        m = padZero(m)
        return h + ":" + m
      }
      // Eliminar horarios actuales
      await HorarioDia.destroy({ where: { id_sitio: id }, transaction: t });

      // Filtrar horarios válidos
      const horariosValidos = Object.entries(horarios)
        .filter(([_, h]) => h.apertura && h.cierre)
        .map(([id_dia, h]) => ({
          id_sitio: id,
          id_dia: parseInt(id_dia),
          apertura: fixFormat(h.apertura),
          cierre: fixFormat(h.cierre),
        }));
      const horariosValidos2 = horariosValidos.filter((h)=>h.apertura.length === 5 && h.cierre.length === 5)
      if (horariosValidos2.length > 0) {
        await HorarioDia.bulkCreate(horariosValidos2, { transaction: t });
      }
    }

    await t.commit();

    return res.json({ success: true, message: "Sitio actualizado correctamente" });
  } catch (err) {
    console.error("Error al actualizar el sitio:", err);
    await t.rollback();
    return res.status(500).json({
      success: false,
      message: "Error al actualizar el sitio",
      error: err.message,
    });
  }
};

export const getSitios = async (req, res) => {
  try {
    const sitios = await Sitio.findAll({
      where: { id_estado: 1 },
      include: [
        {
          model: Categoria,
          through: { model: CategoriaSitio },
        },
      ],
    });

    res.json(sitios);
  } catch (error) {
    console.error("Error al obtener los sitios:", error);
    res.status(500).json({
      ok: false,
      message: "Error al obtener los sitios activos",
    });
  }
};


export const calificar = async (req, res) => {
  try {
    const { id_usuario, id_sitio, rating } = req.body
    let created = false;
    const calificacion_anterior = await Calificacion.findAll({
      where:{id_sitio,id_usuario}
    })
    if (!calificacion_anterior){
      await Calificacion.create({id_sitio,id_sitio,calificacion:rating})
      created = true
    }
    if (calificacion_anterior.length > 1){
      await Calificacion.destroy({
        where:{id_usuario,id_sitio}
      })
      await Calificacion.create({
        id_sitio,id_usuario,calificacion:rating
      })
    }else if (calificacion_anterior.length === 1){
      calificacion_anterior[0].calificacion = rating
      await calificacion_anterior[0].save()
    }
    const sitio = await Sitio.findByPk(id_sitio)
    const calificacionesSitio = await Calificacion.findAll({
      where:{id_sitio}
    })
    const nuevo_rating = Math.floor((calificacionesSitio.reduce((acc,itm) => acc + itm.calificacion, 0) / calificacionesSitio.length)*100)/100
    sitio.rating = nuevo_rating
    await sitio.save()
    return res.json({
      created,
      rating: nuevo_rating
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al calificar" });
  }
}