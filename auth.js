document.getElementById('loginBtn')?.addEventListener('click', async ()=>{
  const msg=document.getElementById('msg'); msg.textContent='Trying to login...'; msg.className='msg';
  const email=document.getElementById('email').value.trim(); const password=document.getElementById('password').value.trim();
  if(!email || !password){msg.textContent='Please enter email and password.'; return;}
  const {error}=await db.auth.signInWithPassword({email,password});
  if(error){msg.textContent='Error: '+error.message; msg.className='msg error'; return;}
  msg.textContent='Login successful! Opening journal...'; msg.className='msg ok';
  setTimeout(()=>location.href='journal.html',500);
});
