import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const DecisionAdmin = sequelize.define(
  "DecisionAdmin",
  {
    id_decision: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    id_demande: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    type_decision: {
      type: DataTypes.ENUM("valide", "refuse"),
      allowNull: false,
    },

    motif: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    date_decision: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "decision_admin",
    timestamps: false, // ⚠️ important car tu gères déjà date_decision
  }
);

export default DecisionAdmin;