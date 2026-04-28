import {
  getAllDemandes,
  getDemandeById,
  updateDemande,
  deleteDemande,
  createDemandeWithPieces,
  updateStatutDemande
} from "../services/demandeAideService.js";

// 🔹 CREATE
// export const create = async (req, res) => {
//   try {
//     const demande = await createDemande(req.body);
//     res.status(201).json(demande);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


export const createDemande = async (req, res) => {
  try {
    const result = await createDemandeWithPieces(req.body, req.files);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 READ ALL
export const findAll = async (req, res) => {
  try {
    const demandes = await getAllDemandes();
    res.json(demandes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStatut = async (req, res) => {
  try {
    const { statut, motif_refus } = req.body;

    const allowed = ["brouillon", "soumise", "validee", "refusee"];

    if (!allowed.includes(statut)) {
      return res.status(400).json({ error: "Statut invalide" });
    }

    const demande = await updateStatutDemande(req.params.id, {
      statut,
      motif_refus,
    });

    if (!demande) {
      return res.status(404).json({ error: "Demande non trouvée" });
    }

    res.json(demande);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 READ ONE
export const findOne = async (req, res) => {
  try {
    const demande = await getDemandeById(req.params.id);

    if (!demande) {
      return res.status(404).json({ error: "Demande non trouvée" });
    }

    res.json(demande);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 UPDATE
export const update = async (req, res) => {
  try {
    const updated = await updateDemande(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Demande non trouvée" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 DELETE
export const remove = async (req, res) => {
  try {
    const deleted = await deleteDemande(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Demande non trouvée" });
    }

    res.json({ message: "Demande supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const findByUser = async (req, res) => {
  try {
    const demandes = await DemandeAide.findAll({
      where: { id_beneficiaire: req.params.userId },
    });

    res.json(demandes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};