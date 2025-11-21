import { Sitio, CategoriaSitio, HorarioDia } from "../models/index.js";

const sitiosData = [
  {
    nombre: "Café Central",
    descripcion: "Un lugar acogedor para disfrutar un buen café y conversar.",
    telefono: "3101234567",
    direccion: "Cra 10 #20-30",
    indicaciones: "Frente al parque principal",
    pet_friendly: true,
    edad_ingreso: 0,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCPq6GE2evAgCDkJAcwFAHCpC8uN3Abyv0mw&s",
  },
  {
    nombre: "Bar La Noche",
    descripcion: "Ambiente moderno con música en vivo los fines de semana.",
    telefono: "3152223344",
    direccion: "Av. Las Palmas #33-22",
    indicaciones: "Al lado del hotel Dorado",
    pet_friendly: false,
    edad_ingreso: 18,
    imagen: "https://estaticos.elcolombiano.com/binrepository/848x565/34c0/780d565/none/11101/YCGI/la-casa-de-ruby_48722805_20250906174616.jpg",
  },
  {
    nombre: "Restaurante El Fogón",
    descripcion: "Comida típica con el mejor sabor casero.",
    telefono: "3124445566",
    direccion: "Calle 50 #15-10",
    indicaciones: "Diagonal a la iglesia",
    pet_friendly: true,
    edad_ingreso: 0,
    imagen: "https://estaticos.elcolombiano.com/binrepository/848x565/34c0/780d565/none/11101/YCGI/la-casa-de-ruby_48722805_20250906174616.jpg",
  },
  {
    nombre: "Cine Plaza",
    descripcion: "Disfruta las últimas películas en cómodas salas 3D.",
    telefono: "3009876543",
    direccion: "Centro Comercial Plaza Sur",
    indicaciones: "Segundo piso",
    pet_friendly: false,
    edad_ingreso: 12,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6zyG-yTU24l_vwxlb53nH1Ag6EWgaoVJd7g&s",
  },
  {
    nombre: "Parque del Sol",
    descripcion: "Amplias zonas verdes ideales para hacer picnic.",
    telefono: "3205556677",
    direccion: "Km 5 vía Rionegro",
    indicaciones: "A 500m del peaje",
    pet_friendly: true,
    edad_ingreso: 0,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGZkXSVZcKSeDQdISEITK1pWtWNRPYenLGxg&s",
  },
  {
    nombre: "Discoteca Eclipse",
    descripcion: "Música, luces y diversión hasta el amanecer.",
    telefono: "3123332211",
    direccion: "Calle 45 #10-22",
    indicaciones: "Frente al centro comercial Oasis",
    pet_friendly: false,
    edad_ingreso: 18,
    imagen: "https://i.revistapym.com.co/old/2022/08/NFT-discoteca.png?w=1200",
  },
  {
    nombre: "Museo de Arte Moderno",
    descripcion: "Colección permanente y exposiciones temporales.",
    telefono: "3011239876",
    direccion: "Av. Oriental #55-12",
    indicaciones: "Junto al teatro principal",
    pet_friendly: false,
    edad_ingreso: 0,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgKqCL2_V763vIq-591njBiBlO7p5BTbtJmw&s",
  },
  {
    nombre: "Heladería Frío Frío",
    descripcion: "Los mejores helados artesanales de la ciudad.",
    telefono: "3137894561",
    direccion: "Calle 10 #40-22",
    indicaciones: "Frente al parque de los deseos",
    pet_friendly: true,
    edad_ingreso: 0,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgKqCL2_V763vIq-591njBiBlO7p5BTbtJmw&s",
  },
  {
    nombre: "Hotel Mirador",
    descripcion: "Vistas panorámicas y excelente servicio.",
    telefono: "3178889990",
    direccion: "Km 3 vía a Santa Elena",
    indicaciones: "Subiendo por la loma principal",
    pet_friendly: false,
    edad_ingreso: 0,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNE7M_8RdRRCD2PKHOZHocm0Te2nDWMu_ChA&s",
  },
  {
    nombre: "Biblioteca Central",
    descripcion: "Espacio de estudio, lectura y aprendizaje.",
    telefono: "3001112233",
    direccion: "Cra 70 #45-21",
    indicaciones: "Junto a la estación Metro San Javier",
    pet_friendly: false,
    edad_ingreso: 0,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNE7M_8RdRRCD2PKHOZHocm0Te2nDWMu_ChA&s",
  },
];

async function seedSitios() {
  try {
    const count = await Sitio.count();
    if (count === 0) {
      console.log("🌱 Insertando sitios...");

      for (let i = 0; i < sitiosData.length; i++) {
        const sitio = await Sitio.create({
          ...sitiosData[i],
          id_administrador: `u${(i % 10) + 1}`, // usa usuarios creados en tu seeder anterior
          id_estado: 1,
          rating: Math.random() * 5,
          likes: Math.floor(Math.random() * 100),
        });

        // Categorías aleatorias (entre 1 y 8)
        const numCategorias = 1 + Math.floor(Math.random() * 3);
        const categorias = new Set();
        while (categorias.size < numCategorias) {
          categorias.add(1 + Math.floor(Math.random() * 8));
        }

        for (const id_categoria of categorias) {
          await CategoriaSitio.create({
            id_sitio: sitio.id,
            id_categoria,
          });
        }

        // Horarios para los 8 días
        for (let dia = 1; dia <= 8; dia++) {
          const aperturaHora = 8 + Math.floor(Math.random() * 3); // 8 a 10
          const cierreHora = 18 + Math.floor(Math.random() * 5); // 18 a 22
          await HorarioDia.create({
            id_sitio: sitio.id,
            id_dia: dia,
            apertura: `${aperturaHora.toString().padStart(2, "0")}:00`,
            cierre: `${cierreHora.toString().padStart(2, "0")}:00`,
          });
        }
      }

      console.log("✅ Sitios, categorías y horarios cargados correctamente");
    } else {
      console.log("ℹ️ Ya existen sitios en la base de datos, se omitió el seeder");
    }
  } catch (error) {
    console.error("❌ Error al cargar sitios:", error);
  }
}

export default seedSitios;
