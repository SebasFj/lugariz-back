// backend/seeders/01-seed-generos.js
import { Genero } from '../models/index.js';

const generosData = [
  { nombre: "No especificado"},
  { nombre: 'Masculino' },
  { nombre: 'Femenino' },
  { nombre: 'No Binario' },
  { nombre: 'Otro' }
];

async function seedGeneros() {
  try {
    const count = await Genero.count()
    if (count !== generosData.length){
      await Genero.bulkCreate(generosData, { ignoreDuplicates: true });
      console.log('✅ Tabla Generos cargada correctamente');
    }
  } catch (error) {
    console.error('❌ Error al cargar Generos:', error);
  }
}

export default seedGeneros;
