// models/Estado.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Estado = sequelize.define("Estado", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: {type: DataTypes.STRING, unique: true}
}, {
  tableName: "estados",
  timestamps: false
});

export default Estado;
