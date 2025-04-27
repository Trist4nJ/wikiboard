Wikiboard 🎲

Wikiboard est une encyclopédie web dédiée aux jeux de société.
Elle permet de découvrir des jeux, leurs règles, et d'interagir en tant qu'administrateur pour en ajouter ou en supprimer.

Lien vers le site web :

https://wikiboard.onrender.com

Instructions pour cloner, configurer et exécuter le projet

Cloner le projet :
git clone https://github.com/Trist4nJ/wikiboard.git cd wikiboard npm install npm run setup npm start

Fonctionnalités principales :
Accueil ➔ Présentation et accès aux jeux populaires Catalogue ➔ Recherche, consultation de tous les jeux Page de détails ➔ Informations complètes sur chaque jeu Connexion admin ➔ Ajout, modification, suppression de jeux Optimisations Green IT ➔ Lazy loading, compression d'images, code léger

Étapes pour contribuer au projet :
Merci de suivre ces conventions si vous contribuez :

Commits : Format type: message Exemples : fix: correction de la recherche, feat: ajout de la page admin Branches : Travaillez sur des branches secondaires (feature/ajout, bugfix/connexion) avant de faire un pull request sur main. Tests : Vérifier la bonne fonctionnalité avant de proposer une modification.

Structure du projet:
wikiboard/ public/ assets/ → Images compressées css/ → styles.css js/ → app.js, connexion.js index.html catalogue.html jeu.html connexion.html apropos.html server.js → Serveur Node.js (Express) setup.js → Script d'initialisation de la base SQLite database.sqlite → Base de données locale (ignorée sur GitHub) package.json → Dépendances et scripts README.md → Documentation du projet

Green IT
Le projet Wikiboard suit une démarche éco-responsable :

Lazy loading pour les images Compression d'images optimisée (TinyPNG) Code JavaScript minimal et optimisé Minimisation des requêtes HTTP Analyse d'empreinte carbone réalisée avant/après
