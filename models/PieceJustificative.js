import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const PieceJustificative = sequelize.define(
  "PieceJustificative",
  {
    id_piece: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    id_demande: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    fichier_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    type_fichier: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "piece_justificative",
    timestamps: false,
  }
);

export default PieceJustificative;