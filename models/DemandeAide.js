import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const DemandeAide = sequelize.define(
  "DemandeAide",
  {
    id_demande: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

        // 🔥 NOUVEAU
    titre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    // 🔥 NOUVEAU
    categorie: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    id_beneficiaire: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    description_situation: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    statut: {
      type: DataTypes.ENUM("brouillon", "soumise", "validee", "refusee"),
      allowNull: false,
      defaultValue: "brouillon",
    },

    date_soumission: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    montant_objectif: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },

    montant_collecte: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },

    motif_refus: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "demande_aide",
    timestamps: false, // car tu gères déjà date_soumission
  }
);

export default DemandeAide; 