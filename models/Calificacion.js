// models/Calificacion.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Calificacion = sequelize.define("Calificacion", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  calificacion: DataTypes.INTEGER
}, {
  tableName: "calificaciones",
  timestamps: false
});

export default Calificacion;
