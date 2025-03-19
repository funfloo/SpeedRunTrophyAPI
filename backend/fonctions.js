// fonctions.js
module.exports = (app, models) => {
    const { User, Game, Trophy, UserTrophy } = models;
  
    // ======================================
    // Endpoints pour les Users
    // ======================================
    
    // GET: Récupérer tous les utilisateurs
    app.get('/users', async (req, res) => {
      try {
        const users = await User.findAll({
          // Optionnel : inclure les trophées associés
          include: Trophy 
        });
        res.json(users);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
      }
    });
  
    // POST: Créer un nouvel utilisateur
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
  
    // PUT: Mettre à jour complètement un utilisateur
    app.put('/users/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const [updated] = await User.update(req.body, { where: { id } });
        if (updated) {
          const updatedUser = await User.findByPk(id);
          res.status(200).json(updatedUser);
        } else {
          res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l’utilisateur.' });
      }
    });
  
    // PATCH: Mise à jour partielle d'un utilisateur
    app.patch('/users/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const [updated] = await User.update(req.body, { where: { id } });
        if (updated) {
          const updatedUser = await User.findByPk(id);
          res.status(200).json(updatedUser);
        } else {
          res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour partielle de l’utilisateur.' });
      }
    });
  
    // DELETE: Supprimer un utilisateur
    app.delete('/users/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const deleted = await User.destroy({ where: { id } });
        if (deleted) {
          res.status(204).send(); // 204 No Content
        } else {
          res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la suppression de l’utilisateur.' });
      }
    });
  
    // HEAD: Récupérer uniquement les headers pour /users
    app.head('/users', async (req, res) => {
      try {
        res.status(200).end();
      } catch (err) {
        console.error(err);
        res.status(500).end();
      }
    });
  
    // OPTIONS: Retourner les méthodes autorisées pour /users
    app.options('/users', (req, res) => {
      res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
      res.status(200).end();
    });
  
  
    // ======================================
    // Endpoints pour les Games
    // ======================================
  
    // GET: Récupérer tous les jeux
    app.get('/games', async (req, res) => {
      try {
        const games = await Game.findAll();
        res.json(games);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des jeux.' });
      }
    });
  
    // POST: Créer un nouveau jeu
    app.post('/games', async (req, res) => {
      try {
        const { name } = req.body;
        const newGame = await Game.create({ name });
        res.status(201).json(newGame);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la création du jeu.' });
      }
    });
  
    // PUT: Mettre à jour complètement un jeu
    app.put('/games/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const [updated] = await Game.update(req.body, { where: { id } });
        if (updated) {
          const updatedGame = await Game.findByPk(id);
          res.status(200).json(updatedGame);
        } else {
          res.status(404).json({ error: 'Jeu non trouvé' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du jeu.' });
      }
    });
  
    // PATCH: Mise à jour partielle d'un jeu
    app.patch('/games/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const [updated] = await Game.update(req.body, { where: { id } });
        if (updated) {
          const updatedGame = await Game.findByPk(id);
          res.status(200).json(updatedGame);
        } else {
          res.status(404).json({ error: 'Jeu non trouvé' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour partielle du jeu.' });
      }
    });
  
    // DELETE: Supprimer un jeu
    app.delete('/games/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const deleted = await Game.destroy({ where: { id } });
        if (deleted) {
          res.status(204).send();
        } else {
          res.status(404).json({ error: 'Jeu non trouvé' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la suppression du jeu.' });
      }
    });
  
    // HEAD: Récupérer uniquement les headers pour /games
    app.head('/games', async (req, res) => {
      try {
        res.status(200).end();
      } catch (err) {
        console.error(err);
        res.status(500).end();
      }
    });
  
    // OPTIONS: Retourner les méthodes autorisées pour /games
    app.options('/games', (req, res) => {
      res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
      res.status(200).end();
    });
  
  
    // ======================================
    // Endpoints pour les Trophies
    // ======================================
  
    // GET: Récupérer tous les trophées
    app.get('/trophies', async (req, res) => {
      try {
        const trophies = await Trophy.findAll();
        res.json(trophies);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des trophées.' });
      }
    });
  
    // POST: Créer un nouveau trophée
    app.post('/trophies', async (req, res) => {
      try {
        const { name, game_id } = req.body;
        const newTrophy = await Trophy.create({ name, game_id });
        res.status(201).json(newTrophy);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la création du trophée.' });
      }
    });
  
    // PUT: Mettre à jour complètement un trophée
    app.put('/trophies/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const [updated] = await Trophy.update(req.body, { where: { id } });
        if (updated) {
          const updatedTrophy = await Trophy.findByPk(id);
          res.status(200).json(updatedTrophy);
        } else {
          res.status(404).json({ error: 'Trophée non trouvé' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du trophée.' });
      }
    });
  
    // PATCH: Mise à jour partielle d'un trophée
    app.patch('/trophies/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const [updated] = await Trophy.update(req.body, { where: { id } });
        if (updated) {
          const updatedTrophy = await Trophy.findByPk(id);
          res.status(200).json(updatedTrophy);
        } else {
          res.status(404).json({ error: 'Trophée non trouvé' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour partielle du trophée.' });
      }
    });
  
    // DELETE: Supprimer un trophée
    app.delete('/trophies/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const deleted = await Trophy.destroy({ where: { id } });
        if (deleted) {
          res.status(204).send();
        } else {
          res.status(404).json({ error: 'Trophée non trouvé' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la suppression du trophée.' });
      }
    });
  
    // HEAD: Récupérer uniquement les headers pour /trophies
    app.head('/trophies', async (req, res) => {
      try {
        res.status(200).end();
      } catch (err) {
        console.error(err);
        res.status(500).end();
      }
    });
  
    // OPTIONS: Retourner les méthodes autorisées pour /trophies
    app.options('/trophies', (req, res) => {
      res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
      res.status(200).end();
    });
  
  
    // ======================================
    // Endpoints pour la table de liaison UserTrophy
    // ======================================
  
    // GET: Récupérer toutes les relations user-trophy
    app.get('/user-trophies', async (req, res) => {
      try {
        const userTrophies = await UserTrophy.findAll();
        res.json(userTrophies);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des relations user-trophy.' });
      }
    });
  
    // POST: Créer une nouvelle relation user-trophy
    app.post('/user-trophies', async (req, res) => {
      try {
        const { user_id, trophy_id, obtained_date } = req.body;
        const newRelation = await UserTrophy.create({ user_id, trophy_id, obtained_date });
        res.status(201).json(newRelation);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la création de la relation user-trophy.' });
      }
    });
  
    // PUT: Mettre à jour complètement une relation user-trophy
    app.put('/user-trophies/:user_id/:trophy_id', async (req, res) => {
      try {
        const { user_id, trophy_id } = req.params;
        const [updated] = await UserTrophy.update(req.body, { where: { user_id, trophy_id } });
        if (updated) {
          const updatedRelation = await UserTrophy.findOne({ where: { user_id, trophy_id } });
          res.status(200).json(updatedRelation);
        } else {
          res.status(404).json({ error: 'Relation user-trophy non trouvée' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la relation user-trophy.' });
      }
    });
  
    // PATCH: Mise à jour partielle d'une relation user-trophy
    app.patch('/user-trophies/:user_id/:trophy_id', async (req, res) => {
      try {
        const { user_id, trophy_id } = req.params;
        const [updated] = await UserTrophy.update(req.body, { where: { user_id, trophy_id } });
        if (updated) {
          const updatedRelation = await UserTrophy.findOne({ where: { user_id, trophy_id } });
          res.status(200).json(updatedRelation);
        } else {
          res.status(404).json({ error: 'Relation user-trophy non trouvée' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour partielle de la relation user-trophy.' });
      }
    });
  
    // DELETE: Supprimer une relation user-trophy
    app.delete('/user-trophies/:user_id/:trophy_id', async (req, res) => {
      try {
        const { user_id, trophy_id } = req.params;
        const deleted = await UserTrophy.destroy({ where: { user_id, trophy_id } });
        if (deleted) {
          res.status(204).send();
        } else {
          res.status(404).json({ error: 'Relation user-trophy non trouvée' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la suppression de la relation user-trophy.' });
      }
    });
  
    // HEAD: Récupérer uniquement les headers pour /user-trophies
    app.head('/user-trophies', async (req, res) => {
      try {
        res.status(200).end();
      } catch (err) {
        console.error(err);
        res.status(500).end();
      }
    });
  
    // OPTIONS: Retourner les méthodes autorisées pour /user-trophies
    app.options('/user-trophies', (req, res) => {
      res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
      res.status(200).end();
    });
  };