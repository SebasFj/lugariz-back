import { Usuario } from "../models/index.js";

const usuariosData = [
  { id: "u1", nombre: "Juan Pérez" },
  { id: "u2", nombre: "María Gómez" },
  { id: "u3", nombre: "Carlos Rodríguez" },
  { id: "u4", nombre: "Ana Martínez" },
  { id: "u5", nombre: "Luis Fernández" },
  { id: "u6", nombre: "Sofía Ramírez" },
  { id: "u7", nombre: "Jorge Herrera" },
  { id: "u8", nombre: "Valentina Ruiz" },
  { id: "u9", nombre: "Camilo Morales" },
  { id: "u10", nombre: "Isabella Torres" },
].map((u, i) => ({
  ...u,
  imagen: "https://media.istockphoto.com/id/2171382633/es/vector/icono-de-perfil-de-usuario-s%C3%ADmbolo-de-persona-an%C3%B3nima-gr%C3%A1fico-de-avatar-en-blanco.jpg?s=612x612&w=0&k=20&c=4R1fa1xdOWF2fXr6LSwe0L7O1ojy60Mcy0n624Z4qns=",
  telefono: `30000000${i}`,
  email: `${u.nombre.split(" ")[0].toLowerCase()}${i}@correo.com`,
  direccion: `Calle ${i + 1} #${i + 5}-00`,
  fecha_nacimiento: new Date(1990, i % 12, (i + 1) * 2),
  ninos: i % 2 === 0,
  mascotas: i % 3 === 0,
  id_estado: 1,
  id_genero: 1,
  id_estado_civil: 1,
}));

async function seedUsuarios() {
  try {
    const count = await Usuario.count();
    if (count !== usuariosData.length) {
      await Usuario.bulkCreate(usuariosData, { ignoreDuplicates: true });
      console.log("✅ Tabla Usuarios cargada correctamente");
    } else {
      console.log("ℹ️ Usuarios ya estaban cargados, no se insertó nada");
    }
  } catch (error) {
    console.error("❌ Error al cargar Usuarios:", error);
  }
}

export default seedUsuarios;
