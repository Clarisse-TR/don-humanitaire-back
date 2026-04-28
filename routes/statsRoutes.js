// routes/statsRoutes.js

import express from "express";
import { getGlobalStats } from "../controllers/statsController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Bienvenue sur la route des statistiques !");
});

router.get("/global", getGlobalStats);

export default router;