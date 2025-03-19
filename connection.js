// connection.js
const { Sequelize } = require('sequelize');

// Crée et exporte l'instance Sequelize pour se connecter à la base de données
const sequelize = new Sequelize('SpeedRunTrophy', 'root', 'root', {
  host: 'localhost',
  port: 8889, // Adapté selon ta configuration (ex: MAMP utilise souvent le port 8889)
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;