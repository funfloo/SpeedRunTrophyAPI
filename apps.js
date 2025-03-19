// apps.js
const express = require('express');
const sequelize = require('./connection');
const { DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

// Définition du modèle User (table 'users')
const User = sequelize.define('User', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  username: { 
    type: DataTypes.STRING(50), 
    allowNull: false, 
    unique: true 
  },
  email: { 
    type: DataTypes.STRING(100), 
    allowNull: false, 
    unique: true 
  },
  password: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  steam_id: { 
    type: DataTypes.STRING(50), 
    allowNull: true, 
    unique: true 
  },
}, {
  tableName: 'users',
  timestamps: false, // Pas de colonnes createdAt/updatedAt
});

// Ici, on pourrait définir d'autres modèles (Game, Trophy, etc.) si nécessaire

// On regroupe les modèles pour pouvoir les transmettre au module de fonctions
const models = { User };

// Importation du module de fonctions qui ajoute tous les endpoints à notre app
require('./fonctions')(app, models);

// Synchronisation avec la base de données puis démarrage du serveur
sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Serveur démarré sur le port 3000');
    });
  })
  .catch(err => console.error('Erreur de synchronisation avec la base de données:', err));