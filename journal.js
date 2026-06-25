let user=null;
async function init(){ user=await requireUser(); if(!user)return; await loadEntries(); }
document.getElementById('saveBtn')?.addEventListener('click', async ()=>{
  const msg=document.getElementById('msg'); msg.textContent='Saving...'; msg.className='msg';
  const title=document.getElementById('title').value.trim(); const category=document.getElementById('category').value; const content=document.getElementById('content').value.trim();
  if(!title||!content){msg.textContent='Please write a title and text.'; return;}
  const {error}=await db.from('journal_entries').insert({title,category,content,user_id:user.id});
  if(error){msg.textContent='Error: '+error.message; msg.className='msg error'; return;}
  document.getElementById('title').value=''; document.getElementById('content').value=''; msg.textContent='Saved successfully! 🚀'; msg.className='msg ok'; await loadEntries();
});
async function loadEntries(){
  const box=document.getElementById('entries');
  const {data,error}=await db.from('journal_entries').select('*').order('created_at',{ascending:false});
  if(error){box.innerHTML='<p class="error">'+error.message+'</p>'; return;}
  if(!data.length){box.innerHTML='<p>No entries yet.</p>'; return;}
  box.innerHTML=data.map(e=>`<div class="entry"><strong>${e.category}</strong><h3>${escapeHtml(e.title)}</h3><p>${escapeHtml(e.content)}</p><small>${new Date(e.created_at).toLocaleString()}</small></div>`).join('');
}
function escapeHtml(s){return (s||'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'}[c]))}
init();
