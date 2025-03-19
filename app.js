// Installation des dépendances nécessaires :
// npm install express sequelize mysql2

const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

// Configuration de la connexion à la base de données SpeedRunTrophy
const sequelize = new Sequelize('SpeedRunTrophy', 'root', 'root', {
  host: 'localhost',   // uniquement le nom d'hôte
  port: 8889,          // port à utiliser
  dialect: 'mysql',
  logging: false,
});

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

// Définition du modèle Game (table 'games')
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

// Définition du modèle Trophy (table 'trophies')
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

// Définition des associations entre Trophy et Game
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

// Définition du modèle de liaison UserTrophy (table 'user_trophy')
const UserTrophy = sequelize.define('UserTrophy', {
  user_id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    allowNull: false 
  },
  trophy_id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    allowNull: false 
  },
  obtained_date: { 
    type: DataTypes.DATE, 
    allowNull: true 
  },
}, {
  tableName: 'user_trophy',
  timestamps: false,
});

// Définition des relations Many-to-Many entre User et Trophy via UserTrophy
User.belongsToMany(Trophy, { 
  through: UserTrophy, 
  foreignKey: 'user_id', 
  otherKey: 'trophy_id' 
});
Trophy.belongsToMany(User, { 
  through: UserTrophy, 
  foreignKey: 'trophy_id', 
  otherKey: 'user_id' 
});

// Exemple de route pour récupérer tous les utilisateurs avec leurs trophées
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Trophy,
        through: { attributes: ['obtained_date'] },
      },
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
  }
});

// Exemple de route pour créer un nouvel utilisateur
app.post('/users', async (req, res) => {
  try {
    const { username, email, password, steam_id } = req.body;
    const newUser = await User.create({ username, email, password, steam_id });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur.' });
  }
});

// Démarrage du serveur après synchronisation avec la base de données
sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Serveur démarré sur le port 3000');
    });
  })
  .catch(err => console.error('Erreur de synchronisation avec la base de données:', err));