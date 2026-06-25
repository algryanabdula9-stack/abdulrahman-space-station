let libUser=null;
async function initLibrary(){libUser=await requireLogin(); if(!libUser)return; loadLibrary();}
async function saveLibraryItem(){
 const msg=document.getElementById('msg'); msg.textContent='Saving...';
 const title=document.getElementById('libTitle').value.trim();
 const description=document.getElementById('libDesc').value.trim();
 const file_url=document.getElementById('libUrl').value.trim();
 if(!title||!file_url){msg.textContent='Please add title and file link.';return;}
 const {error}=await db.from('library').insert({title,description,file_url});
 if(error){msg.textContent='Error: '+error.message;return;}
 msg.textContent='Saved to library 📚'; document.getElementById('libTitle').value='';document.getElementById('libDesc').value='';document.getElementById('libUrl').value=''; loadLibrary();
}
async function loadLibrary(){
 const box=document.getElementById('libraryItems'); box.innerHTML='<p>Loading...</p>';
 const {data,error}=await db.from('library').select('*').order('created_at',{ascending:false});
 if(error){box.innerHTML='<p class="warning">'+error.message+'</p>';return;}
 box.innerHTML=(data&&data.length)?data.map(i=>`<div class="entry"><h3>${i.title}</h3><p>${i.description||''}</p><a class="btn secondary" href="${i.file_url}" target="_blank">Open File</a><br><small>${new Date(i.created_at).toLocaleString()}</small></div>`).join(''):'<p>No library files yet.</p>';
}
document.addEventListener('DOMContentLoaded',initLibrary);
