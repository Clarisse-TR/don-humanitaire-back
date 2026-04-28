import express from "express";
import {
  create,
  findAll,
  findOne,
  byProjet,
  byDonateur,
  remove,
  getDonsByUserController,
  getDonsByBeneficiaireController,
} from "../controllers/donController.js";

const router = express.Router();

// 🔹 CREATE DON
router.post("/", create);

// GET dons par utilisateur
router.get("/user/:id", getDonsByUserController); 
// 🔥 dons pour un bénéficiaire
router.get("/beneficiaire/:id", getDonsByBeneficiaireController);

router.get("/donateur/:id_donateur", byDonateur);
// 🔹 GET ALL
router.get("/", findAll);
 
// 🔹 GET ONE
router.get("/:id", findOne);

// 🔹 GET BY PROJET 
router.get("/projet/:id_projet", byProjet); 

// 🔹 GET BY DONATEUR

// 🔹 DELETE
router.delete("/:id", remove);

export default router;