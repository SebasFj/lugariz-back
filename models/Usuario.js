// models/Usuario.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Usuario = sequelize.define("Usuario", {
  id: { type: DataTypes.STRING, primaryKey: true},
  nombre: DataTypes.STRING,
  imagen: DataTypes.TEXT,
  telefono: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  direccion: DataTypes.STRING,
  fecha_nacimiento: DataTypes.DATE,
  ninos: DataTypes.BOOLEAN,
  mascotas: DataTypes.BOOLEAN
}, {
  tableName: "usuarios",
  timestamps: false
});

export default Usuario;
