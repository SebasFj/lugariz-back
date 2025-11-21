// models/Favorito.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Favorito = sequelize.define("Favorito", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
}, {
  tableName: "favoritos",
  timestamps: false
});

export default Favorito;
