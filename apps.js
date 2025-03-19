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
const Game = sequelize.define('Game', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  name: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
}, {
  tableName: 'games',
  timestamps: false,
});

const Trophy = sequelize.define('Trophy', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  name: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  game_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
}, {
  tableName: 'trophies',
  timestamps: false,
});

// Associations between Trophy and Game
Trophy.belongsTo(Game, { 
  foreignKey: 'game_id', 
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE' 
});
Game.hasMany(Trophy, { 
  foreignKey: 'game_id', 
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE' 
});

// On regroupe les modèles pour pouvoir les transmettre au module de fonctions
const models = { User, Game, Trophy };

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