// seeders/seedEventos.js
import { Evento, Sitio } from "../models/index.js";

const eventosData = [
  {
    nombre: "Festival de Comida Urbana",
    descripcion: "Un evento lleno de sabores, música y diversión al aire libre.",
    imagen: "https://picsum.photos/seed/evento1/600/400",
    edad_ingreso: 18,
    fecha_inicio: new Date(2025, 0, 10),
    fecha_fin: new Date(2025, 0, 12),
  },
  {
    nombre: "Concierto de Jazz Nocturno",
    descripcion: "Disfruta de una noche mágica con las mejores bandas locales de jazz.",
    imagen: "https://picsum.photos/seed/evento2/600/400",
    edad_ingreso: 16,
    fecha_inicio: new Date(2025, 1, 3),
    fecha_fin: new Date(2025, 1, 3),
  },
  {
    nombre: "Taller de Arte y Pintura",
    descripcion: "Actividad familiar para desarrollar la creatividad con artistas invitados.",
    imagen: "https://picsum.photos/seed/evento3/600/400",
    edad_ingreso: 5,
    fecha_inicio: new Date(2025, 2, 21),
    fecha_fin: new Date(2025, 2, 21),
  },
  {
    nombre: "Noche de Trivia y Cervezas",
    descripcion: "Pon a prueba tus conocimientos mientras disfrutas de buena compañía.",
    imagen: "https://picsum.photos/seed/evento4/600/400",
    edad_ingreso: 18,
    fecha_inicio: new Date(2025, 3, 8),
    fecha_fin: new Date(2025, 3, 8),
  },
  {
    nombre: "Cine al Parque",
    descripcion: "Películas familiares al aire libre con picnic y música en vivo.",
    imagen: "https://picsum.photos/seed/evento5/600/400",
    edad_ingreso: 0,
    fecha_inicio: new Date(2025, 4, 18),
    fecha_fin: new Date(2025, 4, 18),
  },
  {
    nombre: "Competencia de Baile Urbano",
    descripcion: "Participa o disfruta de los mejores bailarines de la ciudad.",
    imagen: "https://picsum.photos/seed/evento6/600/400",
    edad_ingreso: 12,
    fecha_inicio: new Date(2025, 5, 5),
    fecha_fin: new Date(2025, 5, 6),
  },
  {
    nombre: "Feria de Mascotas",
    descripcion: "Adopciones, productos y actividades para toda la familia.",
    imagen: "https://picsum.photos/seed/evento7/600/400",
    edad_ingreso: 0,
    fecha_inicio: new Date(2025, 6, 20),
    fecha_fin: new Date(2025, 6, 21),
  },
  {
    nombre: "Concurso de Comidas Típicas",
    descripcion: "Los mejores chefs locales compitiendo por el plato más sabroso.",
    imagen: "https://picsum.photos/seed/evento8/600/400",
    edad_ingreso: 12,
    fecha_inicio: new Date(2025, 7, 15),
    fecha_fin: new Date(2025, 7, 15),
  },
  {
    nombre: "Exposición Fotográfica Nocturna",
    descripcion: "Una muestra visual sobre la vida nocturna en la ciudad.",
    imagen: "https://picsum.photos/seed/evento9/600/400",
    edad_ingreso: 15,
    fecha_inicio: new Date(2025, 8, 9),
    fecha_fin: new Date(2025, 8, 9),
  },
  {
    nombre: "Carrera Nocturna 5K",
    descripcion: "Evento deportivo con luces, música y premios para los ganadores.",
    imagen: "https://picsum.photos/seed/evento10/600/400",
    edad_ingreso: 10,
    fecha_inicio: new Date(2025, 9, 2),
    fecha_fin: new Date(2025, 9, 2),
  },
];

async function seedEventos() {
  try {
    const sitios = await Sitio.findAll();
    if (sitios.length === 0) {
      console.warn("⚠️ No hay sitios disponibles para asociar eventos. Ejecuta primero los seeders de Sitios.");
      return;
    }

    const count = await Evento.count();
    if (count >= eventosData.length) {
      console.log("ℹ️ Eventos ya cargados.");
      return;
    }

    // Asignar aleatoriamente un sitio a cada evento
    const eventosConSitio = eventosData.map((evento) => ({
      ...evento,
      id_sitio: sitios[Math.floor(Math.random() * sitios.length)].id,
      id_estado: 1,
    }));

    await Evento.bulkCreate(eventosConSitio, { ignoreDuplicates: true });
    console.log("✅ Tabla Eventos cargada correctamente");
  } catch (error) {
    console.error("❌ Error al cargar Eventos:", error);
  }
}

export default seedEventos;
