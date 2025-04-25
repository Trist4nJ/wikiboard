const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const app = express()
const db = new sqlite3.Database('./database.sqlite')

app.use(express.static(path.join(__dirname, 'public')))

// Obtenir tous les jeux
app.get('/api/jeux', (req, res) => {
  db.all('SELECT * FROM jeux', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

// Obtenir un jeu par ID
app.get('/api/jeux/:id', (req, res) => {
  db.get('SELECT * FROM jeux WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message })
    if (!row) return res.status(404).json({ error: 'Jeu non trouvé' })
    res.json(row)
  })
})

const bodyParser = require('body-parser')
app.use(bodyParser.json()) // pour parser le JSON dans req.body

// Route POST /login
app.post('/login', (req, res) => {
  const { email, password } = req.body

  db.get('SELECT * FROM utilisateurs WHERE email = ? AND password = ?', [email, password], (err, user) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' })
    if (!user) return res.status(401).json({ error: 'Identifiants invalides' })

    res.json({ success: true })
  })
})

// Ajouter un jeu (admin)
app.post('/admin/jeux', (req, res) => {
    const { id, nom, description, regles, date, image } = req.body
    db.run('INSERT INTO jeux (id, nom, description, regles, date, image) VALUES (?, ?, ?, ?, ?, ?)', [id, nom, description, regles, date, image], function(err) {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ success: true })
    })
  })
  
  // Supprimer un jeu (admin)
  app.delete('/admin/jeux/:id', (req, res) => {
    db.run('DELETE FROM jeux WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ success: true })
    })
  })
  


// Lancer serveur
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`✅ Serveur sur http://localhost:${PORT}`))
