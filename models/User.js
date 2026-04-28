import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  motDePasse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'donateur', 'beneficiaire'),
    defaultValue: 'beneficiaire', 
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true, // on peut laisser null pour l'instant
    defaultValue: null
  },
}, {
  tableName: 'users',
  timestamps: true,
});

export default User;