import { Estado } from '../models/index.js';

const estadosData = [
  { nombre: 'Activo' },
  { nombre: 'Inactivo' },
  { nombre: 'Suspendido' }
];

async function seedEstados() {
  try {
    const count = await Estado.count()
    if (count !== estadosData.length){
      await Estado.bulkCreate(estadosData, { ignoreDuplicates: true });
      console.log('✅ Tabla Estados cargada correctamente');
    }
  } catch (error) {
    console.error('❌ Error al cargar Estados:', error);
  }
}

export default seedEstados;
