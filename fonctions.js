// fonctions.js
module.exports = (app, models) => {
    const { User } = models;
  
    // -------------------------------
    // GET: Récupérer tous les utilisateurs
    // -------------------------------
    app.get('/users', async (req, res) => {
      try {
        const users = await User.findAll();
        res.json(users);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
      }
    });
  
    // -------------------------------
    // POST: Créer un nouvel utilisateur
    // -------------------------------
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
  
    // -------------------------------
    // PUT: Mettre à jour complètement un utilisateur
    // -------------------------------
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
  
    // -------------------------------
    // PATCH: Mise à jour partielle d'un utilisateur
    // -------------------------------
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
  
    // -------------------------------
    // DELETE: Supprimer un utilisateur
    // -------------------------------
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
  
    // -------------------------------
    // HEAD: Récupérer uniquement les headers pour la route /users
    // -------------------------------
    app.head('/users', async (req, res) => {
      try {
        // La méthode HEAD renvoie les mêmes headers que GET mais sans le corps
        res.status(200).end();
      } catch (err) {
        console.error(err);
        res.status(500).end();
      }
    });
  
    // -------------------------------
    // OPTIONS: Retourner les méthodes autorisées pour la route /users
    // -------------------------------
    app.options('/users', (req, res) => {
      res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
      res.status(200).end();
    });
  };