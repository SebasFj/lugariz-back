import { Categoria } from '../models/index.js';


const categoriasData = [
  { nombre: 'Restaurante' },
  { nombre: 'Bar' },
  { nombre: 'Café' },
  { nombre: 'Discoteca' },
  { nombre: 'Pub' },
  { nombre: 'Museo' },
  { nombre: 'Teatro' },
  { nombre: 'Gastrobar' }
];

async function seedCategorias() {
  try {
    const count = await Categoria.count()
    if (count !== categoriasData.length){
      await Categoria.bulkCreate(categoriasData, { ignoreDuplicates: true });
      console.log('✅ Tabla Categorias cargada correctamente');
    }
  } catch (error) {
    console.error('❌ Error al cargar Categorias:', error);
  }
}

export default seedCategorias;
