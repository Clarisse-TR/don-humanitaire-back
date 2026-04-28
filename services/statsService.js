import Don from "../models/Don.js";
import Projet from "../models/Projet.js";

export const computeGlobalStats = async () => {
  const projets = await Projet.findAll({
    where: { statut: "publie" },
    include: [{ model: Don, as: "dons" }]
  });

  let totalDonations = 0;
  const donors = new Set();

  projets.forEach(p => {
    p.dons?.forEach(d => {
      totalDonations += parseInt(d.montant);
      donors.add(d.id_donateur);
    });
  });

  return {
    projectsCount: projets.length,
    totalDonations,
    donorsCount: donors.size
  };
};