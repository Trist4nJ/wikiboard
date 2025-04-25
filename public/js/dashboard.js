// Protection : si pas connecté, kick
if (!localStorage.getItem('admin')) {
    window.location.href = 'connexion.html'
  }
  
  // Déconnexion
  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('admin')
  })
  
  // Charger tous les jeux
  const loadGamesAdmin = async () => {
    const res = await fetch('/api/jeux')
    const jeux = await res.json()
  
    const container = document.getElementById('games-list')
    container.innerHTML = ''
    jeux.forEach(jeu => {
      container.innerHTML += `
        <div class="admin-card">
          <strong>${jeu.nom}</strong>
          <button onclick="deleteGame('${jeu.id}')">Supprimer</button>
        </div>
      `
    })
  }
  
  // Ajouter un jeu
  const addGame = async (event) => {
    event.preventDefault()
    const form = event.target
  
    const data = {
      id: form.id.value,
      nom: form.nom.value,
      description: form.description.value,
      regles: form.regles.value,
      date: form.date.value,
      image: form.image.value
    }
  
    const res = await fetch('/admin/jeux', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  
    if (res.ok) {
      alert('Jeu ajouté !')
      loadGamesAdmin()
      form.reset()
    } else {
      alert('Erreur')
    }
  }
  
  // Supprimer un jeu
  const deleteGame = async (id) => {
    const res = await fetch(`/admin/jeux/${id}`, { method: 'DELETE' })
    if (res.ok) {
      alert('Jeu supprimé !')
      loadGamesAdmin()
    }
  }
  
  document.getElementById('add-game-form').addEventListener('submit', addGame)
  
  document.addEventListener('DOMContentLoaded', loadGamesAdmin)
  