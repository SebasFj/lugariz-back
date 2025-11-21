// models/index.js
import Usuario from "./Usuario.js";
import Genero from "./Genero.js";
import EstadoCivil from "./EstadoCivil.js";
import Estado from "./Estado.js";
import Sitio from "./Sitio.js";
import Evento from "./Evento.js";
import Categoria from "./Categoria.js";
import CategoriaSitio from "./CategoriaSitio.js";
import Dia from "./Dia.js";
import HorarioDia from "./HorarioDia.js";
import Like from "./Like.js";
import Favorito from "./Favorito.js";
import Comentario from "./Comentario.js";
import Calificacion from "./Calificacion.js";

// Relaciones
Usuario.belongsTo(Genero, { foreignKey: "id_genero" });
Usuario.belongsTo(EstadoCivil, { foreignKey: "id_estado_civil" });
Usuario.belongsTo(Estado, { foreignKey: "id_estado" });

Sitio.belongsTo(Usuario, { foreignKey: "id_administrador" });
Sitio.belongsTo(Estado, { foreignKey: "id_estado" });

Evento.belongsTo(Sitio, { foreignKey: "id_sitio" });
Evento.belongsTo(Estado, { foreignKey: "id_estado" });

Sitio.belongsToMany(Categoria, { through: CategoriaSitio, foreignKey: "id_sitio" });
Categoria.belongsToMany(Sitio, { through: CategoriaSitio, foreignKey: "id_categoria" });

HorarioDia.belongsTo(Sitio, { foreignKey: "id_sitio" });
HorarioDia.belongsTo(Dia, { foreignKey: "id_dia", as: "dia"});

Like.belongsTo(Usuario, { foreignKey: "id_usuario" });
Like.belongsTo(Sitio, { foreignKey: "id_sitio" });

Favorito.belongsTo(Usuario, { foreignKey: "id_usuario" });
Favorito.belongsTo(Sitio, { foreignKey: "id_sitio" });

Comentario.belongsTo(Usuario, { foreignKey: "id_usuario" });
Comentario.belongsTo(Sitio, { foreignKey: "id_sitio" });

Calificacion.belongsTo(Usuario, { foreignKey: "id_usuario" });
Calificacion.belongsTo(Sitio, { foreignKey: "id_sitio" });
Usuario.hasMany(Sitio, { foreignKey: "id_administrador", as: "sitiosPropios" });
Sitio.hasMany(Evento, { foreignKey: "id_sitio", as: "eventos" });

Usuario.hasMany(Like, { foreignKey: "id_usuario", as: "sitiosLikeados" });
Usuario.hasMany(Favorito, { foreignKey: "id_usuario", as: "favoritos" });
Usuario.hasMany(Comentario, { foreignKey: "id_usuario", as: "comentarios" });
Usuario.hasMany(Calificacion, { foreignKey: "id_usuario", as: "sitiosCalificados" });

Sitio.hasMany(Favorito, { foreignKey: "id_sitio", as: "favoritos" });
Sitio.hasMany(Comentario, { foreignKey: "id_sitio", as: "comentarios" });

Sitio.hasMany(HorarioDia, { foreignKey: "id_sitio", as: "horarios" });
Dia.hasMany(HorarioDia, { foreignKey: "id_dia", as: "horarios" });


export {
  Usuario, Genero, EstadoCivil, Estado,
  Sitio, Evento, Categoria, CategoriaSitio,
  Dia, HorarioDia, Like, Favorito, Comentario, Calificacion
};
