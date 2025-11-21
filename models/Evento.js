// models/Evento.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Evento = sequelize.define("Evento", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: DataTypes.STRING,
  descripcion: DataTypes.TEXT,
  imagen: DataTypes.TEXT,
  fecha_inicio: DataTypes.DATE,
  fecha_fin: DataTypes.DATE,
  edad_ingreso: DataTypes.INTEGER
}, {
  tableName: "eventos",
  timestamps: false
});

export default Evento;
