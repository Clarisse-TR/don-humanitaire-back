import express from "express";
import {
  create,
  fromDemande,
  findAll,
  findOne,
  update,
  remove,
  publier,
  getPublishedProjects,
  depublier,
} from "../controllers/projetController.js";

const router = express.Router();

// 🔹 CREATE
router.post("/", create);

// 🔹 CREATE FROM DEMANDE VALIDÉE
router.post("/from-demande/:id_demande", fromDemande);

// 🔹 GET ALL
router.get("/", findAll);

router.get("/publies", getPublishedProjects);
// 🔹 GET ONE
router.get("/:id", findOne);

// 🔹 UPDATE
router.put("/:id", update);

// 🔹 DELETE
router.delete("/:id", remove);


// 🔥 PUBLIER PROJET
router.patch("/:id/publier", publier);

router.patch("/:id/depublier", depublier);

export default router;