// models/EstadoCivil.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const EstadoCivil = sequelize.define("EstadoCivil", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
  tableName: "estado_civil",
  timestamps: false
});

export default EstadoCivil;
