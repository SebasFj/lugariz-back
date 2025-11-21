import { EstadoCivil } from '../models/index.js';


const estadoCivilData = [
  { nombre: "No especificado"},
  { nombre: 'Soltero' },
  { nombre: 'Casado' },
  { nombre: 'Divorciado' },
  { nombre: 'Viudo' },
  { nombre: 'Unión libre' }
];

async function seedEstadoCivil() {
  try {
    const count = await EstadoCivil.count()
    if (count !== estadoCivilData.length){
      await EstadoCivil.bulkCreate(estadoCivilData, { ignoreDuplicates: true });
      console.log('✅ Tabla Estado_civil cargada correctamente');
    }
  } catch (error) {
    console.error('❌ Error al cargar Estado_civil:', error);
  }
}

export default seedEstadoCivil;
