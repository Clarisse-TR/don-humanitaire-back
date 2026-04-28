import User from "./User.js";
import DemandeAide from "./DemandeAide.js";
import DecisionAdmin from "./DecisionAdmin.js";
import Don from "./Don.js";
import Notification from "./Notification.js";
import PieceJustificative from "./PieceJustificative.js";
import Projet from "./Projet.js";

export const initAssociations = () => {
  // =========================
  // 👤 USER
  // =========================
  User.hasMany(DemandeAide, {
    foreignKey: "id_beneficiaire",
    as: "demandes",
  });

  User.hasMany(Don, {
    foreignKey: "id_donateur",
    as: "dons",
  });

  User.hasMany(Notification, {
    foreignKey: "id_utilisateur",
    as: "notifications",
  });

  User.hasMany(DecisionAdmin, {
    foreignKey: "id_admin",
    as: "decisions_admin",
  }); 

  // =========================
  // 📄 DEMANDE AIDE
  // =========================
  DemandeAide.belongsTo(User, {
    foreignKey: "id_beneficiaire",
    as: "beneficiaire",
  });

  DemandeAide.hasMany(PieceJustificative, {
    foreignKey: "id_demande",
    as: "pieces",
  });

  DemandeAide.hasMany(DecisionAdmin, {
    foreignKey: "id_demande",
    as: "decisions",
  });

  DemandeAide.hasOne(Projet, {
    foreignKey: "id_demande",
    as: "projet",
  });

  // =========================
  // 🧾 PROJET
  // =========================
  Projet.belongsTo(DemandeAide, {
    foreignKey: "id_demande",
    as: "demande",
  });

  Projet.hasMany(Don, {
    foreignKey: "id_projet",
    as: "dons",
  });

  // =========================
  // 💰 DON
  // =========================
  Don.belongsTo(User, {
    foreignKey: "id_donateur",
    as: "donateur",
  });

  Don.belongsTo(Projet, {
    foreignKey: "id_projet",
    as: "projet",
  });

  // =========================
  // 🔔 NOTIFICATION
  // =========================
  Notification.belongsTo(User, {
    foreignKey: "id_utilisateur",
    as: "utilisateur",
  });

  // =========================
  // 📎 PIECE JUSTIFICATIVE
  // =========================
  PieceJustificative.belongsTo(DemandeAide, {
    foreignKey: "id_demande",
    as: "demande",
  });

  // =========================
  // ⚖️ DECISION ADMIN
  // =========================
  DecisionAdmin.belongsTo(User, {
    foreignKey: "id_admin",
    as: "admin",
  });

  DecisionAdmin.belongsTo(DemandeAide, {
    foreignKey: "id_demande",
    as: "demande",
  });
};