import {
  createDon,
  getAllDons,
  getDonById,
  getDonsByProjet,
  getDonsByDonateur,
  deleteDon,
  getDonsByUser,
  getDonsByBeneficiaire,
} from "../services/donService.js";

// 🔹 CREATE
export const create = async (req, res) => {
  try {
    const don = await createDon(req.body);
    res.status(201).json(don);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 READ ALL
export const findAll = async (req, res) => {
  try {
    const dons = await getAllDons();
    res.json(dons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 READ ONE
export const findOne = async (req, res) => {
  try {
    const don = await getDonById(req.params.id);

    if (!don) {
      return res.status(404).json({ error: "Don non trouvé" });
    }

    res.json(don);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 DONS PAR PROJET
export const byProjet = async (req, res) => {
  try {
    const dons = await getDonsByProjet(req.params.id_projet);
    res.json(dons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 DONS PAR DONATEUR
export const byDonateur = async (req, res) => {
  try {
    const dons = await getDonsByDonateur(req.params.id_donateur);
    res.json(dons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 DELETE
export const remove = async (req, res) => {
  try {
    const deleted = await deleteDon(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Don non trouvé" });
    }

    res.json({ message: "Don supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDonsByUserController = async (req, res) => {
  try {
    const dons = await getDonsByUser(req.params.id);

    const formatted =dons.map((d)=>({
      id : d.id_don,
      donator: d.donateur.name,
      project: d.projet.titre, 
      amount: parseInt(d.montant),  
      date: new Date(d.date_don).toLocaleDateString('fr-FR'), 
      receipt: true
    })) 

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDonsByBeneficiaireController = async (req, res) => {
  try {
    const dons = await getDonsByBeneficiaire(req.params.id);

    // 🔥 FORMAT POUR LE FRONT
    const formatted = dons.map((d) => ({
      id: d.id_don,
      donateur: d.anonyme
        ? "Anonyme"
        : d.donateur?.name || "Inconnu",
      email: d.anonyme ? null : d.donateur?.email,
      projet: d.projet?.titre,
      montant: parseInt(d.montant),
      montant_objectif: parseInt(d.projet.demande?.montant_objectif),
      montant_collecte: parseInt(d.projet.demande?.montant_collecte),
      status: (d.projet.demande?.statut),
      date: d.date_don,
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};