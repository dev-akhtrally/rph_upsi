
const $ = (s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const menu=$('.menu'), nav=$('.nav-links');
menu?.addEventListener('click',()=>nav.classList.toggle('show'));
$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('show')));

$$('.acc button').forEach(btn=>btn.addEventListener('click',()=>{
  const item=btn.parentElement; item.classList.toggle('open');
  btn.querySelector('span').textContent=item.classList.contains('open')?'−':'+';
}));

$$('.quiz').forEach(q=>{
  $$('.choice',q).forEach(c=>c.addEventListener('click',()=>{
    $$('.choice',q).forEach(x=>x.classList.remove('correct','wrong'));
    const feedback=$('.feedback',q);
    if(c.dataset.correct==='true'){c.classList.add('correct');feedback.textContent='Betul. Murid terlibat dalam proses berfikir, berbincang dan menghasilkan penyelesaian.'}
    else{c.classList.add('wrong');feedback.textContent='Cuba fikir semula: adakah murid benar-benar melakukan sesuatu dengan pengetahuan itu?'}
  }));
});

const checks=$$('.check input');
function updateChecks(){
  const done=checks.filter(x=>x.checked).length, pct=Math.round(done/checks.length*100);
  $('.check-progress') && ($('.check-progress').style.width=pct+'%');
  $('.check-count') && ($('.check-count').textContent=`${done}/${checks.length} disemak`);
  localStorage.setItem('aktivaChecks',JSON.stringify(checks.map(x=>x.checked)));
}
try{const saved=JSON.parse(localStorage.getItem('aktivaChecks')||'[]');checks.forEach((x,i)=>x.checked=!!saved[i]);updateChecks()}catch(e){}
checks.forEach(x=>x.addEventListener('change',updateChecks));

const fields={topic:$('#rphTopic'),obj:$('#rphObj'),strategy:$('#rphStrategy'),activity:$('#rphActivity'),bbm:$('#rphBbm'),assess:$('#rphAssess')};
function renderRPH(){
  if(!$('.preview'))return;
  $('#pvTopic').textContent=fields.topic?.value||'[Topik belum diisi]';
  $('#pvObj').textContent=fields.obj?.value||'[Objektif belum diisi]';
  $('#pvStrategy').textContent=fields.strategy?.value||'[Strategi belum dipilih]';
  $('#pvActivity').textContent=fields.activity?.value||'[Aktiviti belum diisi]';
  $('#pvBbm').textContent=fields.bbm?.value||'[BBM belum diisi]';
  $('#pvAssess').textContent=fields.assess?.value||'[Pentaksiran belum diisi]';
}
Object.values(fields).forEach(x=>x?.addEventListener('input',renderRPH));
$('#clearRph')?.addEventListener('click',()=>{Object.values(fields).forEach(x=>x.value='');renderRPH()});

$('#downloadRph')?.addEventListener('click',()=>{
 const text=`AKTiVA-RPH — TEMPLATE RPH\\n\\nTopik: ${fields.topic.value}\\nObjektif: ${fields.obj.value}\\nStrategi: ${fields.strategy.value}\\nAktiviti: ${fields.activity.value}\\nBBM: ${fields.bbm.value}\\nPentaksiran: ${fields.assess.value}\\n\\nNota: Lengkapkan SK/SP berdasarkan DSKP sebenar.`;
 const blob=new Blob([text],{type:'text/plain;charset=utf-8'}), a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='template-rph-aktiva.txt';a.click();URL.revokeObjectURL(a.href);
});

const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const id=e.target.id;$$('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id))}}),{rootMargin:'-35% 0px -55% 0px'});
$$('main section[id]').forEach(s=>observer.observe(s));
window.addEventListener('scroll',()=>{$('.backtop').style.display=scrollY>500?'block':'none'});
