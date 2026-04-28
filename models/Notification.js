import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Notification = sequelize.define(
  "Notification",
  {
    id_notification: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    id_utilisateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM("email", "in-app"),
      allowNull: false,
      defaultValue: "in-app",
    },

    contenu: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    date_envoi: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    lu: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "notification",
    timestamps: false, // car date_envoi est déjà géré
  }
);

export default Notification;