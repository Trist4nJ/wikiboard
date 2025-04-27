const form = document.getElementById('login-form')
const errorText = document.getElementById('login-error')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = form.email.value
  const password = form.password.value

  //const res = await fetch('/login', {
  const res = await fetch('https://wikiboard.onrender.com/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  const data = await res.json()

  if (res.ok) {
    // Connexion réussie
    localStorage.setItem('admin', 'true')
    window.location.href = 'dashboard.html'
  } else {
    // Erreur
    errorText.textContent = data.error || 'Erreur de connexion'
  }
})
