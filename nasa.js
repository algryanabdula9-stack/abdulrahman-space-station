async function loadAPOD(){
 const box=document.getElementById('apod'); box.innerHTML='<p>Loading NASA Picture of the Day...</p>';
 try{const r=await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'); const d=await r.json();
  box.innerHTML=`<h3>${d.title||'NASA Picture'}</h3>${d.media_type==='image'?`<img class="nasa-img" src="${d.url}" alt="NASA APOD">`:''}<p>${(d.explanation||'').slice(0,520)}...</p>`;
 }catch(e){box.innerHTML='<p class="warning">Could not load NASA image right now.</p>';}
}
const quiz=[
 {q:'Which planet is called the Red Planet?',a:'Mars'},
 {q:'Which star is at the center of our Solar System?',a:'The Sun'},
 {q:'What is the name of NASA’s Moon program?',a:'Artemis'},
 {q:'Which planet has famous rings?',a:'Saturn'}
];
function loadQuiz(){const i=new Date().getDate()%quiz.length;const item=quiz[i];document.getElementById('quizQ').textContent=item.q;document.getElementById('quizBtn').onclick=()=>alert('Answer: '+item.a+' 🚀');}
document.addEventListener('DOMContentLoaded',()=>{loadAPOD();loadQuiz();});
