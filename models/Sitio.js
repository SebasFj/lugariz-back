// models/Sitio.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Sitio = sequelize.define("Sitio", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: DataTypes.STRING,
  imagen: DataTypes.TEXT,
  descripcion: DataTypes.TEXT,
  telefono: DataTypes.STRING,
  direccion: DataTypes.STRING,
  indicaciones: DataTypes.TEXT,
  pet_friendly: DataTypes.BOOLEAN,
  edad_ingreso: DataTypes.INTEGER,

  rating: {
    type: DataTypes.FLOAT,
    set(value) {
      const rounded = Math.round(value * 100) / 100; // redondea 2 decimales
      this.setDataValue("rating", rounded);
    },
    get() {
      const raw = this.getDataValue("rating");
      if (raw == null) return null;
      return Math.round(raw * 100) / 100; // también lo redondea al leer
    }
  },

  likes: DataTypes.INTEGER

}, {
  tableName: "sitios",
  timestamps: false
});

export default Sitio;
