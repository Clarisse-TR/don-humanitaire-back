import express from 'express';
import {
  getAllusers,
  getuserById,
  createuser,
  updateuser,
  deleteuser,
  login
} from '../services/userService.js';
import { verifyToken } from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// POST créer une utilisateur avec image (protégé)
// router.post('/', verifyToken ,upload.single('image'), async (req, res) => {
//   try {
//     const data = { ...req.body };
//     if (req.file) data.image = req.file.filename; // enregistrer le nom du fichier
//     const newUser = await createuser(data);
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// GET tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const utilisateurs = await getAllusers();
    res.json(utilisateurs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  console.log(req.body)
  try {
    const { email, motDePasse } = req.body;
    const result = await login(email, motDePasse);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.get("/me", verifyToken, async (req, res) => {
  console.log("user: ", req.user)
  try {
    const user = await getuserById(req.user.id); // 🔥 ici ça marche
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET utilisateur par id
router.get('/:id', async (req, res) => {
  try {
    const utilisateur = await getuserById(req.params.id);
    if (!utilisateur) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json(utilisateur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST créer un utilisateur
router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const newUtilisateur = await createuser(req.body);
    res.status(201).json(newUtilisateur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT mettre à jour un utilisateur
router.put('/:id', async (req, res) => {
  try {
    const updatedUtilisateur = await updateuser(req.params.id, req.body);
    res.json(updatedUtilisateur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE supprimer un utilisateur
router.delete('/:id', async (req, res) => {
  try {
    await deleteuser(req.params.id);
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;