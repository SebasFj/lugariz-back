// models/Categoria.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Categoria = sequelize.define("Categoria", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: {type: DataTypes.STRING, unique: true}
}, {
  tableName: "categorias",
  timestamps: false
});

export default Categoria;
