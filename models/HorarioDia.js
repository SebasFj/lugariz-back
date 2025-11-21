// models/HorarioDia.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const HorarioDia = sequelize.define("HorarioDia", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  apertura: DataTypes.STRING,
  cierre: DataTypes.STRING
}, {
  tableName: "horarios_x_dia",
  timestamps: false
});

export default HorarioDia;
