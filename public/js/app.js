// Parse l’ID dans l’URL
const getIdFromURL = () => new URLSearchParams(location.search).get('id')

// Affiche les jeux sur index/catalogue
const loadGames = async () => {
  const res = await fetch('/api/jeux')
  const jeux = await res.json()

  const popularContainer = document.getElementById('popular-games')
  const catalogueContainer = document.getElementById('catalogue')

  jeux.forEach(jeu => {
    const html = `
      <a href="jeu.html?id=${jeu.id}">
        <img src="${jeu.image}" alt="${jeu.nom}" loading="lazy" />
        <span>${jeu.nom}</span>
      </a>
    `
    if (popularContainer && ['uno', 'skyjo', 'monopoly', 'loup-garou'].includes(jeu.id)) {
      popularContainer.innerHTML += html
    }
    if (catalogueContainer) {
      catalogueContainer.innerHTML += html
    }
  })
}

// Affiche la fiche d’un jeu + suggestions
const loadSingleGame = async () => {
  const id = getIdFromURL()
  if (!id) return

  const res = await fetch(`/api/jeux/${id}`)
  const jeu = await res.json()

  const container = document.getElementById('game-detail')
  container.innerHTML = `
    <div class="game-card">
      <img src="${jeu.image}" alt="${jeu.nom}" loading="lazy" />
      <div>
        <h1>${jeu.nom}</h1>
        <p><strong>Date :</strong> ${jeu.date}</p>
        <p><strong>Description :</strong> ${jeu.description}</p>
        <p><strong>Règles du jeu :</strong> ${jeu.regles}</p>
      </div>
    </div>
  `

  loadSuggestions(id)
}

// Suggestions aléatoires (4 jeux ≠ id)
const loadSuggestions = async (excludeId) => {
  const res = await fetch('/api/jeux')
  const jeux = await res.json()

  const suggestions = jeux
    .filter(j => j.id !== excludeId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)

  const container = document.getElementById('suggested-games')
  if (!container) return

  container.innerHTML = ''

  suggestions.forEach(j => {
    container.innerHTML += `
      <a href="jeu.html?id=${j.id}">
        <img src="${j.image}" alt="${j.nom}" loading="lazy" />
        <span>${j.nom}</span>
      </a>
    `
  })
}

// Filtrer dynamiquement les jeux dans une liste
const filterGames = (inputSelector, containerSelector) => {
  const input = document.querySelector(inputSelector)
  const container = document.querySelector(containerSelector)

  if (!input || !container) return

  input.addEventListener('input', () => {
    const term = input.value.toLowerCase()
    const cards = container.querySelectorAll('a')

    cards.forEach(card => {
      const name = card.textContent.toLowerCase()
      card.style.display = name.includes(term) ? 'block' : 'none'
    })
  })
}

// Au chargement
document.addEventListener('DOMContentLoaded', () => {
  loadGames()
  loadSingleGame()
  // Active la recherche sur les bonnes pages
  filterGames('input[type="text"]', '#catalogue')       // catalogue.html
})
