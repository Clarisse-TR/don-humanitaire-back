import express from "express";
import {
  findAll,
  findOne,
  update,
  remove,
    findByUser,
    createDemande,
    updateStatut
} from "../controllers/demandeAideController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// 🔹 CREATE
router.post("/",upload.array("pieces") ,createDemande);
// 🔥 UPDATE STATUT (ADMIN)
router.patch("/:id/statut", updateStatut);

// 🔹 READ ALL
router.get("/", findAll);

router.get("/user/:userId", findByUser);
// 🔹 READ ONE
router.get("/:id", findOne);

// 🔹 UPDATE
router.put("/:id", update);

// 🔹 DELETE
router.delete("/:id", remove);

// 🔹 FIND BY USER

export default router;