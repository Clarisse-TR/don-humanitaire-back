import user from '../models/User.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// Lire tous les users
export const getAllusers = async () => {
  return await user.findAll();
};

export const login = async (email, motDePasse) => {
  const utilisateur = await user.findOne({ where: { email } });
  if (!utilisateur) throw new Error('utilisateur non trouvé');

  const valid = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
  if (!valid) throw new Error('Mot de passe incorrect');

  const token = jwt.sign(
    { id: utilisateur.id, email: utilisateur.email, role: utilisateur.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  return { utilisateur, token };
};

// Lire un user par id
export const getuserById = async (id) => {
  return await user.findByPk(id);
};

// Créer un user
export const createuser = async (data) => {
  // Hasher le mot de passe avant création
  console.log(data)
  if (data.motDePasse) {
    const salt = await bcrypt.genSalt(10);
    data.motDePasse = await bcrypt.hash(data.motDePasse, salt);
  }
  return await user.create(data);
};

// Mettre à jour un user
export const updateuser = async (id, data) => {
  const utilisateur = await user.findByPk(id);
  if (!utilisateur) throw new Error('Utilisateur non trouvé');

  if (data.motDePasse) {
    const salt = await bcrypt.genSalt(10);
    data.motDePasse = await bcrypt.hash(data.motDePasse, salt);
  }

  return await utilisateur.update(data);
};

// Supprimer un user
export const deleteuser = async (id) => {
  const utilisateur = await user.findByPk(id);
  if (!utilisateur) throw new Error('Utilisateur non trouvé');
  return await utilisateur.destroy();
};