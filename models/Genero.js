// models/Genero.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Genero = sequelize.define("Genero", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
  tableName: "generos",
  timestamps: false
});

export default Genero;
