// models/Like.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Like = sequelize.define("Like", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
}, {
  tableName: "likes",
  timestamps: false
});

export default Like;
