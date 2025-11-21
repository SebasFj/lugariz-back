import { Dia } from '../models/index.js';


const diasData = [
  { nombre: 'Lunes' },
  { nombre: 'Martes' },
  { nombre: 'Miércoles' },
  { nombre: 'Jueves' },
  { nombre: 'Viernes' },
  { nombre: 'Sábado' },
  { nombre: 'Domingo' },
  { nombre: "Festivo" }
];

async function seedDias() {
  try {
    const count = await Dia.count();
    if (count !== diasData.length){
      await Dia.bulkCreate(diasData, { ignoreDuplicates: true });
      console.log('✅ Tabla Dias cargada correctamente');
    }
  } catch (error) {
    console.error('❌ Error al cargar Dias:', error);
  }
}

export default seedDias;
