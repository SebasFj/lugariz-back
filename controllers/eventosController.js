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

export const createEvento = async (req, res) => {
  try {
    const { nombre, descripcion, imagen, fecha_inicio, fecha_fin, edad_ingreso, id_sitio } = req.body;

    // Validar campos obligatorios
    if (!nombre || !id_sitio || !fecha_inicio || !fecha_fin) {
      return res.status(400).json({ error: "Faltan datos obligatorios." });
    }

    // Verificar que el sitio exista
    const sitio = await Sitio.findByPk(id_sitio);
    if (!sitio) {
      return res.status(404).json({ error: "El sitio especificado no existe." });
    }

    // Crear el evento
    const nuevoEvento = await Evento.create({
      nombre,
      descripcion: descripcion || null,
      imagen: imagen || null,
      fecha_inicio,
      fecha_fin,
      edad_ingreso: edad_ingreso || null,
      id_estado: 1,
      id_sitio
    });

    res.status(201).json({
      message: "✅ Evento creado correctamente.",
      evento: nuevoEvento
    });

  } catch (error) {
    console.error("❌ Error al crear evento:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// ✅ Obtener evento por ID
export const getEvento = async (req, res) => {
  try {
    const { id_evento } = req.params;
    const evento = await Evento.findByPk(id_evento, {
      include:[
        {
          model: Sitio,
          attributes: ["nombre","telefono","direccion","indicaciones"]
        }
      ]
    });

    if (!evento) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    res.json(evento);
  } catch (error) {
    console.error("Error al obtener evento:", error);
    res.status(500).json({ error: "Error al obtener el evento" });
  }
};

// ✅ Actualizar evento
export const updateEvento = async (req, res) => {
  try {
    const { id_evento } = req.params;
    const { nombre, descripcion, imagen, fecha_inicio, fecha_fin, edad_ingreso } = req.body;

    const evento = await Evento.findByPk(id_evento);
    if (!evento) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    await evento.update({
      nombre,
      descripcion,
      imagen,
      fecha_inicio,
      fecha_fin,
      edad_ingreso,
    });

    res.json({ mensaje: "Evento actualizado correctamente", evento });
  } catch (error) {
    console.error("Error al actualizar evento:", error);
    res.status(500).json({ error: "Error al actualizar el evento" });
  }
};



export const updateState = async (req,res) => {

    const { id_evento } = req.params;

    try {
        const evento = await Evento.findByPk(id_evento, { include: Estado });
        if (!evento) {
        return res.status(404).json({ ok: false, message: "Sitio no encontrado" });
        }

        // Obtener el estado actual
        const estadoActual = evento.Estado?.nombre

        // Determinar el nuevo estado
        let nuevoEstadoNombre;
        if (estadoActual === "Activo") {
        nuevoEstadoNombre = "Inactivo";
        } else if (estadoActual === "Inactivo") {
        nuevoEstadoNombre = "Activo";
        } else {
        return res.status(400).json({ ok: false, message: "El evento no puede cambiar de estado desde su estado actual." });
        }

        // Buscar el nuevo estado en la tabla Estados
        const nuevoEstado = await Estado.findOne({ where: { nombre: nuevoEstadoNombre } });
        if (!nuevoEstado) {
        return res.status(500).json({ ok: false, message: `Estado '${nuevoEstadoNombre}' no encontrado en la base de datos.` });
        }

        // Actualizar el id_estado del sitio
        evento.id_estado = nuevoEstado.id;
        await evento.save();

        res.json({
        ok: true,
        message: `El evento ahora está en estado '${nuevoEstado.nombre}'.`,
        evento,
        });
    } catch (error) {
        console.error("Error al actualizar el estado del evento:", error);
        res.status(500).json({
        ok: false,
        message: "Error interno al actualizar el estado del evento",
        });
    }
}


export const getEventos = async (req, res) => {
  try {
    const eventos = await Evento.findAll({
      where: { id_estado: 1 },
      include: [
        {
          model: Sitio,
          include: [
            {
              model: Categoria,
              through: { model: CategoriaSitio },
            },
          ],
        },
        {
          model: Estado,
          attributes: ["id", "nombre"],
        },
      ],
    });

    res.json(eventos);
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    res.status(500).json({
      ok: false,
      message: "Error al obtener los eventos activos",
    });
  }
};