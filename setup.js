const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.sqlite')

db.serialize(() => {
  db.run('DROP TABLE IF EXISTS jeux')
  db.run(`
    CREATE TABLE jeux (
      id TEXT PRIMARY KEY,
      nom TEXT NOT NULL,
      description TEXT,
      regles TEXT,
      date TEXT,
      image TEXT
    )
  `)

  const jeux = [
    {
      id: 'uno',
      nom: 'Uno',
      description: 'Jeu de cartes rapide et fun.',
      regles: 'Distribuer 7 cartes, jouer une carte de même couleur ou valeur.',
      date: '1971',
      image: 'assets/images/uno.jpg',
    },
    {
      id: 'skyjo',
      nom: 'Skyjo',
      description: 'Score le plus bas gagne. Tourne tes cartes stratégiquement.',
      regles: 'Retourne 2 cartes au début, puis pioche et remplace.',
      date: '2015',
      image: 'assets/images/skyjo.jpg',
    },
    {
      id: 'monopoly',
      nom: 'Monopoly',
      description: 'Achète des propriétés et ruine tes amis.',
      regles: 'Lance les dés, achète, construis, encaisse des loyers.',
      date: '1935',
      image: 'assets/images/monopoly.jpg',
    },
    {
      id: 'loup-garou',
      nom: 'Loup Garou',
      description: 'Bluff et stratégie entre villageois et loups.',
      regles: 'Le MJ distribue les rôles, chacun agit secrètement.',
      date: '2001',
      image: 'assets/images/loup.jpg',
    },
    {
      id: 'cluedo',
      nom: 'Cluedo',
      description: 'Jeu d’enquête pour trouver le coupable.',
      regles: 'Devinez le suspect, l’arme et la pièce avec logique.',
      date: '1949',
      image: 'assets/images/cluedo.jpg',
    },
    {
      id: 'dobble',
      nom: 'Dobble',
      description: 'Trouvez l’icône en commun le plus vite possible.',
      regles: 'Chaque carte a une icône en commun avec une autre.',
      date: '2009',
      image: 'assets/images/dobble.jpg',
    },
    {
      id: 'timeup',
      nom: 'Time’s Up',
      description: 'Devinez des personnages avec des indices limités.',
      regles: 'Trois manches : description libre, un mot, mime.',
      date: '1998',
      image: 'assets/images/timeup.jpg',
    },
    {
      id: 'halli-galli',
      nom: 'Halli Galli',
      description: 'Tapez quand il y a 5 fruits identiques.',
      regles: 'Révélez les cartes, soyez le plus rapide à taper.',
      date: '1992',
      image: 'assets/images/halli-galli.jpg',
    },
    {
      id: 'dixit',
      nom: 'Dixit',
      description: 'Interprétez des images de manière poétique.',
      regles: 'Faites deviner votre carte sans être trop évident.',
      date: '2008',
      image: 'assets/images/dixit.jpg',
    },
    {
      id: 'jungle-speed',
      nom: 'Jungle Speed',
      description: 'Attrapez le totem si les cartes sont identiques.',
      regles: 'Soyez rapide et attentif aux formes proches.',
      date: '1991',
      image: 'assets/images/jungle-speed.jpg',
    },
    {
      id: 'mille-sabords',
      nom: 'Mille Sabords',
      description: 'Jeu de dés sur le thème pirate.',
      regles: 'Tentez votre chance, mais attention aux crânes !',
      date: '2010',
      image: 'assets/images/mille-sabords.jpg',
    },
    {
      id: '7-wonders',
      nom: '7 Wonders',
      description: 'Construisez une civilisation et dominez l’Histoire.',
      regles: 'Choisissez des cartes, construisez des merveilles, gagnez des points.',
      date: '2010',
      image: 'assets/images/7-wonders.jpg',
    },
    {
      id: 'catan',
      nom: 'Les Colons de Catane',
      description: 'Échange, stratégie et conquête de territoires.',
      regles: 'Collectez des ressources, construisez des routes et des villes.',
      date: '1995',
      image: 'assets/images/catan.jpg',
    },
    {
      id: 'aventuriers-rail',
      nom: 'Les Aventuriers du Rail',
      description: 'Construisez des lignes ferroviaires à travers le monde.',
      regles: 'Reliez les villes pour gagner des points.',
      date: '2004',
      image: 'assets/images/aventuriers-rail.jpg',
    },
    {
      id: 'code-names',
      nom: 'Code Names',
      description: 'Faites deviner des mots à votre équipe avec un seul mot indice.',
      regles: 'Trouvez les bons mots sans tomber sur l’assassin.',
      date: '2015',
      image: 'assets/images/code-names.jpg',
    },
  ]

  const stmt = db.prepare('INSERT INTO jeux VALUES (?, ?, ?, ?, ?, ?)')
  jeux.forEach(j => {
    stmt.run(j.id, j.nom, j.description, j.regles, j.date, j.image)
  })
  stmt.finalize()

  // UTILISATEURS
  db.run('DROP TABLE IF EXISTS utilisateurs')
  db.run(`
      CREATE TABLE utilisateurs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      date_inscription TEXT
      )
  `)

  const admin = {
      nom: 'Admin',
      email: 'admin@wikiboard.fr',
      password: 'admin123', 
      date_inscription: new Date().toISOString().split('T')[0]
  }

  const stmtUser = db.prepare('INSERT INTO utilisateurs (nom, email, password, date_inscription) VALUES (?, ?, ?, ?)')
  stmtUser.run(admin.nom, admin.email, admin.password, admin.date_inscription)
  stmtUser.finalize() 

})
db.close(() => console.log('✅ Jeux + Utilisateur admin ajoutés à la base'))
   