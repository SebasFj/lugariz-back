// models/Dia.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Dia = sequelize.define("Dia", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: {type: DataTypes.STRING, unique: true}
}, {
  tableName: "dias",
  timestamps: false
});

export default Dia;
