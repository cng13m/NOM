const projects=[
{id:'courtyard',name:'The Courtyard House',type:'Residential',place:'A quiet urban retreat',year:'2026',image:'house.jpg',description:'A home imagined around an open heart. A sheltered courtyard draws daylight deep into the plan, while a restrained palette of stone, timber, and soft plaster creates a sense of continuity between indoors and out.',material:'Stone / Timber / Plaster'},
{id:'still',name:'Still House',type:'Residential',place:'Living close to nature',year:'2025',image:'still.jpg',description:'A study in stillness. Generous openings frame the landscape, and a low horizontal form settles gently into its surroundings. The rhythm of everyday life becomes the organising principle of the home.',material:'Concrete / Glass / Oak'},
{id:'light',name:'A Room for Light',type:'Cultural',place:'A place for quiet encounters',year:'2025',image:'light.jpg',description:'An imagined gallery where daylight is the first exhibit. A sequence of carefully proportioned rooms offers changing perspectives, making space for art, conversation, and unhurried discovery.',material:'Concrete / Natural light'},
{id:'common',name:'Common Ground',type:'Cultural',place:'Architecture for coming together',year:'2026',image:'hero.jpg',description:'A cultural pavilion conceived as an open invitation. Sculptural volumes and shaded thresholds create a civic room, welcoming both planned events and the spontaneous life of the city.',material:'Cast concrete / Stone'},
{id:'sunday',name:'The Sunday Interior',type:'Interiors',place:'Warmth in the everyday',year:'2024',image:'studio.jpg',description:'An interior concept shaped by warm light and tactile materials. Natural surfaces and an open arrangement make room for the rituals of a slower day, balancing a clear spatial idea with the comfort of home.',material:'Oak / Linen / Limewash'},
{id:'horizon',name:'Horizon Residence',type:'Residential',place:'A new perspective on home',year:'2025',image:'horizon.jpg',description:'A residence imagined as a frame for its surroundings. Layered terraces and deep reveals soften the boundary between shelter and landscape, creating places to gather and places to retreat.',material:'Timber / Glass / Stone'}];
const grid=document.querySelector('#project-grid');const projectDialog=document.querySelector('#project-dialog');let lastFocus;
function render(filter='All'){grid.replaceChildren();projects.filter(p=>filter==='All'||p.type===filter).forEach((p,i)=>{const b=document.createElement('button');b.className='project';b.style.animationDelay=`${i*50}ms`;b.setAttribute('aria-label',`View ${p.name}`);b.innerHTML=`<span class="project-img"><img src="assets/${p.image}" alt="" loading="lazy"><span class="project-overlay" aria-hidden="true"><span class="project-name">${p.name}</span></span></span>`;b.addEventListener('click',()=>openProject(p));grid.append(b)})}
function openDialog(dialog){lastFocus=document.activeElement;dialog.showModal();document.body.style.overflow='hidden'}
let projectTrigger;
function openProject(p){if(!projectDialog.open){projectTrigger=document.activeElement?.closest('.collection-panel')?document.querySelector('#work-toggle'):document.activeElement}closeCollectionPanels();location.hash=`project/${p.id}`}
function showProject(p){
  const index=projects.indexOf(p);
  const next=projects[(index+1)%projects.length];
  document.querySelector('#project-content').innerHTML=`<div class="case-layout"><div class="case-info"><div class="case-titlebar"><h2 id="project-title">${p.name}</h2><span class="case-number">${String(index+1).padStart(2,'0')} / 06</span></div><div class="case-card"><section class="case-section"><h3>Information</h3><dl class="case-meta"><dt>Discipline</dt><dd>${p.type}</dd><dt>Year</dt><dd>${p.year}</dd><dt>Study</dt><dd>${p.place}</dd><dt>Status</dt><dd>Concept exploration</dd></dl></section><section class="case-section"><h3>About the project</h3><p>${p.description}</p></section><section class="case-section"><h3>Material palette</h3><p>${p.material}</p></section><p class="case-note">Illustrative NOM concept. Photography expresses the intended atmosphere; it is not documentation of a completed NOM commission. Detail studies below are crops of the same reference photograph.</p></div></div><div class="case-gallery"><figure><img src="assets/${p.image}" alt="${p.name}: concept atmosphere"><figcaption>01 / Atmosphere</figcaption></figure><figure class="detail-crop"><img src="assets/${p.image}" alt="${p.name}: cropped spatial detail" loading="lazy"><figcaption>02 / Spatial detail</figcaption></figure><figure class="light-crop"><img src="assets/${p.image}" alt="${p.name}: cropped light and texture study" loading="lazy"><figcaption>03 / Light & texture</figcaption></figure><button class="case-next"><span><small>Next project</small><strong>${next.name}</strong></span><span aria-hidden="true">↗</span></button></div></div>`;
  document.querySelector('.case-next').onclick=()=>openProject(next);
  if(!projectDialog.open){openDialog(projectDialog);lastFocus=projectTrigger||document.querySelector('#work-toggle')}
  projectDialog.scrollTop=0;
  document.title=`${p.name} — NOM`;
  document.querySelector('#project-title').tabIndex=-1;
  document.querySelector('#project-title').focus({preventScroll:true});
}
function syncProjectRoute(){
  const match=location.hash.match(/^#project\/([^/]+)$/);
  const project=match&&projects.find(p=>p.id===match[1]);
  if(project){showProject(project)}else{
    if(projectDialog.open)projectDialog.close();
    document.title='NOM — Architecture, considered.';
    if(match)history.replaceState(null,'','#work');
  }
}
window.addEventListener('hashchange',syncProjectRoute);

const collectionToggles=Array.from(document.querySelectorAll('.collection-toggle'));
function closeCollectionPanels(){collectionToggles.forEach(button=>{button.setAttribute('aria-expanded','false');document.getElementById(button.getAttribute('aria-controls')).hidden=true})}
collectionToggles.forEach(button=>button.addEventListener('click',()=>{const shouldOpen=button.getAttribute('aria-expanded')!=='true';closeCollectionPanels();if(shouldOpen){button.setAttribute('aria-expanded','true');document.getElementById(button.getAttribute('aria-controls')).hidden=false}}));
document.addEventListener('click',event=>{if(!event.target.closest('.collection-toggle,.collection-panel'))closeCollectionPanels()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){const activeToggle=collectionToggles.find(button=>button.getAttribute('aria-expanded')==='true');if(activeToggle){closeCollectionPanels();activeToggle.focus()}}});
const projectIndex=document.querySelector('#project-index');
projects.forEach((p,index)=>{const row=document.createElement('button');row.className='index-row';row.innerHTML=`<span class="index-title"><small>${String(index+1).padStart(2,'0')}</small><span>${p.name}</span></span><span>${p.type}</span><span>${p.year}</span>`;row.addEventListener('click',()=>openProject(p));projectIndex.append(row)});
document.querySelector('#collection-contact').onclick=()=>{closeCollectionPanels();openDialog(document.querySelector('#contact-dialog'))};
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b?'true':'false')});render(b.dataset.filter)}));
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.close-dialog').onclick=()=>d.close();d.addEventListener('close',()=>{document.body.style.overflow='';if(d===projectDialog){if(location.hash.startsWith('#project/')){history.replaceState(null,'','#work');document.querySelector('#work').scrollIntoView({behavior:'instant'})}document.title='NOM — Architecture, considered.';projectTrigger=null}if(lastFocus?.isConnected)lastFocus.focus({preventScroll:true})});d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})});
['enquire','enquire-small'].forEach(id=>document.getElementById(id).onclick=()=>openDialog(document.querySelector('#contact-dialog')));
document.querySelector('#brief-form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);const text=`NOM — Project brief\n\nName: ${f.get('name')}\nEmail: ${f.get('email')}\nProject type: ${f.get('type')}\n\nThe idea\n${f.get('idea')}\n\nPrepared on the NOM concept website. This brief has not been sent.`;const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='NOM-project-brief.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);document.querySelector('#form-status').textContent='Your brief is ready. Keep the downloaded file to share with NOM when the studio’s contact details are added.'});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.section-heading,.studio-intro,.studio-image,.approach>div').forEach(e=>{e.classList.add('reveal');observer.observe(e)});render();syncProjectRoute();
