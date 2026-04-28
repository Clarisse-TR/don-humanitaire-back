import DemandeAide from "../models/DemandeAide.js";
import Don from "../models/Don.js";
import Projet from "../models/Projet.js";
import User from "../models/user.js";

// 🔹 CREATE DON
export const createDon = async (data) => {
  console.log("=== CREATE DON DÉBUT ===");
  console.log("Montant reçu :", data.montant);
  console.log("id_projet :", data.id_projet);

  const don = await Don.create(data);
  console.log("Don créé avec succès, ID :", don.id);

  const projet = await Projet.findByPk(data.id_projet);
  console.log("Projet trouvé, id_demande :", projet?.id_demande);

  // Log avant l'increment
  console.log("=== INCREMENT MONTANT_COLLECTE par", Number(data.montant), "===");

  await DemandeAide.increment("montant_collecte", {
    by: Number(data.montant),
    where: { id_demande: projet.id_demande },
  });

  console.log("=== CREATE DON FIN ===");
  return don;
};

// 🔹 GET ALL DONS
export const getAllDons = async () => {
  return await Don.findAll();
};

// 🔹 GET DON BY ID
export const getDonById = async (id) => {
  return await Don.findByPk(id);
};

// 🔹 GET DONS PAR PROJET
export const getDonsByProjet = async (id_projet) => {
  return await Don.findAll({
    where: { id_projet },
  });
};

// 🔹 GET DONS PAR DONATEUR
export const getDonsByDonateur = async (id_donateur) => {
  console.log("id_donateur : ",id_donateur )
  return await Don.findAll({
    where: { id_donateur },
  });
};

// 🔹 DELETE DON
export const deleteDon = async (id) => {
  const don = await Don.findByPk(id);
  if (!don) return null;

  // 🔥 rollback montant projet
  await Projet.decrement("montant_collecte", {
    by: don.montant,
    where: { id_projet: don.id_projet },
  });

  await don.destroy();
  return true;
};

export const getDonsByUser = async (id_donateur) => {
  return await Don.findAll({
    include:[{model:Projet, as:'projet', attributes:['id_projet', 'titre']},{model:User, as:'donateur', attributes:['id', 'name']}],
    where: { id_donateur },
    order: [["date_don", "DESC"]],
  });
};

export const getDonsByBeneficiaire = async (id_beneficiaire) => {
  return await Don.findAll({
    include: [
      {
        model: Projet,
        as: "projet",
        attributes: ["id_projet", "titre"],
        include: [
          {
            model: DemandeAide,
            as: "demande",
            where: {
              id_beneficiaire,
              statut: "validee", // 🔥 seulement demandes validées
            },
            attributes: ["id_demande", "titre", "montant_objectif", "montant_collecte", "statut"],
          },
        ],
      },
      {
        model: User,
        as: "donateur",
        attributes: ["id", "name", "email"],
      },
    ],
    order: [["date_don", "DESC"]],
  });
};