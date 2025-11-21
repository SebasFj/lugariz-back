// models/CategoriaSitio.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const CategoriaSitio = sequelize.define("CategoriaSitio", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
}, {
  tableName: "categorias_x_sitio",
  timestamps: false
});

export default CategoriaSitio;
