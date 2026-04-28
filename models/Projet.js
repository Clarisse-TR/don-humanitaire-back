import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Projet = sequelize.define(
  "Projet",
  {
    id_projet: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    id_demande: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    titre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    description_courte: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    categorie: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    statut: {
      type: DataTypes.ENUM("publie", "depublie"),
      allowNull: false,
      defaultValue: "depublie",
    },

    date_publication: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "projet",
    timestamps: false,
  }
);

export default Projet;