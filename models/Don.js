import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Don = sequelize.define(
  "Don",
  {
    id_don: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    id_donateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_projet: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    montant: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    date_don: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    anonyme: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    recu_pdf_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    tableName: "don",
    timestamps: false, // car date_don est déjà géré
  }
);

export default Don;