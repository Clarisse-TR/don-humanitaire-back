// controllers/statsController.js
import { computeGlobalStats } from "../services/statsService.js";

export const getGlobalStats = async (req, res) => {
    try {
        const stats = await computeGlobalStats();
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};