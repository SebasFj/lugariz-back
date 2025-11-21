import { Usuario, Sitio, Comentario, Calificacion } from "../models/index.js";

const comentariosEjemplo = [
  "Excelente lugar, muy recomendado.",
  "El servicio fue bueno pero podría mejorar.",
  "Ambiente agradable y buena atención.",
  "No me gustó mucho la comida, pero el sitio está bonito.",
  "Perfecto para ir con amigos o familia.",
  "Muy caro para lo que ofrecen.",
  "La música estaba demasiado alta.",
  "Lugar limpio y bien ubicado.",
  "El personal fue muy amable.",
  "Definitivamente volvería otra vez."
];

async function seedComentariosCalificaciones() {
  try {
    const usuarios = await Usuario.findAll();
    const sitios = await Sitio.findAll();

    if (usuarios.length === 0 || sitios.length === 0) {
      console.warn("⚠️ No hay usuarios o sitios para generar comentarios/calificaciones.");
      return;
    }

    const comentarios = [];
    const calificaciones = [];

    for (const usuario of usuarios) {
      // sitios que no son del usuario
      const sitiosNoPropios = sitios.filter(
        (sitio) => sitio.id_administrador !== usuario.id
      );

      // tomar entre 2 y 4 sitios aleatorios
      const numSitios = Math.floor(Math.random() * 3) + 2;
      const sitiosSeleccionados = sitiosNoPropios
        .sort(() => 0.5 - Math.random())
        .slice(0, numSitios);

      for (const sitio of sitiosSeleccionados) {
        // comentario aleatorio
        const texto = comentariosEjemplo[Math.floor(Math.random() * comentariosEjemplo.length)];
        comentarios.push({
          id_usuario: usuario.id,
          id_sitio: sitio.id,
          comentario: texto
        });

        // calificación aleatoria entre 1 y 5
        calificaciones.push({
          id_usuario: usuario.id,
          id_sitio: sitio.id,
          calificacion: Math.floor(Math.random() * 5) + 1
        });
      }
    }

    // Insertar evitando duplicados
    await Comentario.bulkCreate(comentarios, { ignoreDuplicates: true });
    await Calificacion.bulkCreate(calificaciones, { ignoreDuplicates: true });

    console.log(`✅ Comentarios (${comentarios.length}) y calificaciones (${calificaciones.length}) generados correctamente.`);
  } catch (error) {
    console.error("❌ Error al generar comentarios y calificaciones:", error);
  }
}

export default seedComentariosCalificaciones;
