let currentUser=null;
async function initJournal(){currentUser=await requireLogin(); if(!currentUser)return; loadEntries();}
async function saveEntry(){
  const msg=document.getElementById('msg'); msg.textContent='Saving...';
  const title=document.getElementById('title').value.trim();
  const category=document.getElementById('category').value;
  const content=document.getElementById('content').value.trim();
  if(!title||!content){msg.textContent='Please write title and content.';return;}
  const {error}=await db.from('journal_entries').insert({title,category,content,user_id:currentUser.id});
  if(error){msg.textContent='Error: '+error.message;return;}
  document.getElementById('title').value='';document.getElementById('content').value='';
  msg.textContent='Saved successfully 🚀'; loadEntries();
}
async function loadEntries(){
  const box=document.getElementById('entries'); box.innerHTML='<p>Loading...</p>';
  const {data,error}=await db.from('journal_entries').select('*').order('created_at',{ascending:false});
  if(error){box.innerHTML='<p class="warning">'+error.message+'</p>';return;}
  if(!data||!data.length){box.innerHTML='<p>No entries yet.</p>';return;}
  box.innerHTML=data.map(e=>`<div class="entry"><small>${e.category}</small><h3>${escapeHtml(e.title)}</h3><p>${escapeHtml(e.content)}</p><small>${new Date(e.created_at).toLocaleString()}</small></div>`).join('');
}
function escapeHtml(s){return String(s||'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
document.addEventListener('DOMContentLoaded',initJournal);
