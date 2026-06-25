function stamp(){return new Date().toLocaleString()}
async function protectNav(){
  if(typeof db === 'undefined') return;
  const user = await getUser();
  const authLink = document.getElementById('authLink');
  if(authLink){ authLink.textContent = user ? 'Logout' : 'Login'; authLink.href = user ? '#' : 'login.html'; if(user) authLink.onclick = logout; }
}
protectNav();
