async function loginUser(){
  const msg=document.getElementById('msg');
  msg.textContent='Trying to login...';
  const email=document.getElementById('email').value.trim();
  const password=document.getElementById('password').value.trim();
  if(!email||!password){msg.textContent='Please enter email and password.';return;}
  const {error}=await db.auth.signInWithPassword({email,password});
  if(error){msg.textContent='Login failed: '+error.message;return;}
  msg.textContent='Login successful. Opening journal...';
  window.location.href='journal.html';
}
async function logoutUser(){await db.auth.signOut();window.location.href='login.html';}
async function showAuthState(){
  const spot=document.getElementById('authSpot'); if(!spot) return;
  const user=await getCurrentUser();
  spot.innerHTML=user?`<button class="btn secondary" onclick="logoutUser()">Logout</button>`:`<a class="btn secondary" href="login.html">Login</a>`;
}
document.addEventListener('DOMContentLoaded',showAuthState);
