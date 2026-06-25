async function initMemories(){const user=await requireLogin(); if(!user)return; loadMemories();}
async function loadMemories(){
 const box=document.getElementById('memories'); box.innerHTML='<p>Loading...</p>';
 const {data,error}=await db.from('journal_entries').select('*').eq('category','Beautiful Memory').order('created_at',{ascending:false});
 if(error){box.innerHTML='<p class="warning">'+error.message+'</p>';return;}
 box.innerHTML=(data&&data.length)?data.map(e=>`<div class="entry"><h3>${e.title}</h3><p>${e.content}</p><small>${new Date(e.created_at).toLocaleString()}</small></div>`).join(''):'<p>No memories yet.</p>';
}
document.addEventListener('DOMContentLoaded',initMemories);
