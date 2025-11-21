// models/Comentario.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Comentario = sequelize.define("Comentario", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  comentario: DataTypes.TEXT
}, {
  tableName: "comentarios",
  timestamps: false
});

export default Comentario;
