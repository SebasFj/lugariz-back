import seedGeneros from './01-seed-generos.js'
import seedEstados from './02-seed-estados.js'
import seedEstadoCivil from './03-seed-estado-civil.js'
import seedCategorias from './04-seed-categorias.js'
import seedDias from './05-seed-dias.js'
import seedUsuarios from './06-seed-usuarios.js'
import seedSitios from './07-seed-sitios.js'
import seedEventos from './08-seed-eventos.js'
import seedComentariosCalificaciones from './09-seed-comentarios-calificaciones.js'

async function runSeeders() {
  try {
    await seedGeneros();
    await seedEstados();
    await seedEstadoCivil();
    await seedCategorias();
    await seedDias();
    await seedUsuarios();
    await seedSitios();
    await seedEventos();
    await seedComentariosCalificaciones();
  } catch (error) {
    console.error('❌ Error ejecutando seeders:', error);
  }
}

export default runSeeders;
