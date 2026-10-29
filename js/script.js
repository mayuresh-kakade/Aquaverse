const $=s=>document.querySelector(s),RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const KEY=['clown','tang','turtle','dolphin','shark','whale','octo','jelly','horse','ray','eel','angler'],DK={Lanternfish:'lantern','Giant squid':'squid','Gulper eel':'gulper',Anglerfish:'angler','Vampire squid':'vampire'};
let bigK='clown';
// ---- data
const A=[
["Clownfish","🐠","Amphiprion ocellaris","Warm reefs, among sea anemones","Algae, zooplankton, scraps","Lives in a social group led by the largest female; it is protected from anemone stings by a mucus coating.","Fun fact: In the film's fame, people forget they can switch sex — the dominant male can become female when the female dies (science)."],
["Blue tang","🐟","Paracanthurus hepatus","Indo-Pacific coral reefs","Algae and zooplankton","Has a scalpel-like spine near its tail for defence.","Fun fact: Young fish often shelter among branching corals."],
["Sea turtle","🐢","Chelonia mydas (green)","Tropical and subtropical seas","Seagrass and algae (adults)","Females return to lay eggs on beaches, often near where they hatched.","Fun fact: Green turtles are named for the colour of their fat, not their shell."],
["Bottlenose dolphin","🐬","Tursiops truncatus","Coastal and open waters worldwide","Fish and squid","Uses clicks for echolocation and whistles to keep in touch; each dolphin has a signature whistle.","Fun fact: They sleep with half the brain at a time."],
["Great white shark","🦈","Carcharodon carcharias","Cool coastal and open seas","Seals, fish, rays","An apex predator; it senses faint electric fields with special pores called ampullae of Lorenzini.","Fun fact: Their teeth are replaced continuously."],
["Humpback whale","🐋","Megaptera novaeangliae","Feeds in cold seas, breeds in warm ones","Krill and small schooling fish","Migrates thousands of kilometres each year; males sing long, changing songs.","Fun fact: Some groups blow bubble nets to trap fish."],
["Octopus","🐙","Octopus vulgaris","Rocky reefs and sea floors","Crabs, shellfish, fish","Has three hearts and blue blood; skin cells change colour and texture in a blink.","Fun fact: Octopuses are famous escape artists."],
["Jellyfish","🪼","Aurelia aurita (moon jelly)","Coastal waters worldwide","Plankton and tiny animals","No brain or heart; it pulses its bell to swim and stings with nematocysts.","Fun fact: Some jellyfish species can revert to a younger stage."],
["Seahorse","🐴","Hippocampus spp.","Seagrass, reefs, mangroves","Tiny crustaceans","The male carries the eggs in a brood pouch and gives birth to the young.","Fun fact: They hold onto plants with a curling tail."],
["Manta ray","🪽","Mobula birostris (giant)","Warm open seas, reef cleaning stations","Plankton","One of the largest rays; it filter-feeds and has the largest brain of any fish.","Fun fact: Each manta's belly spot pattern is unique, like a fingerprint."],
["Moray eel","🐍","Gymnothorax spp.","Reef crevices","Fish, octopus, crustaceans","Has a second set of jaws in its throat that pulls prey in.","Fun fact: Cleaner shrimp are allowed to groom its teeth."],
["Anglerfish","🎣","Melanocetus johnsonii","Deep sea, ~1,000 m","Fish and crustaceans","Females dangle a glowing lure powered by light-making bacteria.","Fun fact: In some species the tiny male fuses to the female."]];
A.forEach((a,i)=>a.z=i>10?1:0);
const g=$('#grid');A.forEach((a,i)=>{const b=document.createElement('button');b.className='card glass';b.innerHTML=`<canvas data-k="${KEY[i]}" width="360" height="220" aria-hidden="true"></canvas><h3>${a[0]}</h3><i>${a[2]}</i><div class="x">${a[3]}.<br>Eats: ${a[4]}.</div>`;b.onclick=()=>open_(i);g.append(b)});
const dlg=$('#dlg'),big=$('#big');
function open_(i){const a=A[i];bigK=KEY[i];$('#dn').textContent=a[0];$('#ds').textContent=a[2];
$('#dd').innerHTML=`<dt>Habitat</dt><dd>${a[3]}</dd><dt>Diet</dt><dd>${a[4]}</dd>`;
$('#df').innerHTML=`<span class="tag sc">Science</span>${a[5]}<br><br><span class="tag fn">Fun</span>${a[6].replace(/^Fun fact:\s*/,'')}`;dlg.showModal()}
$('#cl').onclick=()=>dlg.close();dlg.onclick=e=>{if(e.target===dlg)dlg.close()};
big.onpointermove=e=>{const r=big.getBoundingClientRect();big.style.transform=`rotateY(${(e.clientX-r.left-r.width/2)/4}deg) rotateX(${-(e.clientY-r.top-r.height/2)/4}deg)`};
// ---- food web
const N={phyto:["Phytoplankton","🟢",90,340,"Tiny drifting plants and algae. They use sunlight to make food and produce a large share of the planet's oxygen.",[],"Zooplankton, krill"],
zoo:["Zooplankton","🦐",250,230,"Tiny animals such as copepods and krill.",["phyto"],"Small fish, whales, jellyfish"],
fish:["Small fish","🐟",410,320,"Sardines and anchovies filter or pick plankton.",["zoo","phyto"],"Larger fish, dolphins, sharks"],
crab:["Crabs & shrimp","🦀",410,120,"Eat algae, dead matter and small animals.",["phyto","zoo","dec"],"Octopus, larger fish"],
big:["Large predatory fish","🐠",580,220,"Tuna and groupers eat smaller fish and squid.",["fish","crab"],"Sharks"],
shark:["Shark (apex)","🦈",710,110,"Top predators keep prey numbers balanced. Great whites eat seals and fish.",["big","fish"],"Few natural predators (orcas may hunt them)"],
dec:["Decomposers","🦠",620,370,"Bacteria and fungi break down dead matter, recycling nutrients back to producers.",["shark","big"],"Their nutrients feed phytoplankton"]};
const E=[];Object.entries(N).forEach(([k,n])=>n[5].forEach(f=>{if(k!=='crab'||f!=='dec')E.push([f,k])}));E.push(["dec","phyto"]);
const fw=$('#fw'),ns='http://www.w3.org/2000/svg';let h='<defs><marker id="ar" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0L8,4L0,8z" fill="#7df9ff"/></marker></defs>';
E.forEach(([f,t],i)=>{const a=N[f],b=N[t],id='p'+i,x1=a[2],y1=a[3],x2=b[2],y2=b[3];h+=`<path id="${id}" d="M${x1},${y1} L${x2},${y2}" stroke="#5ff0e066" stroke-width="2" fill="none" ${f==='dec'?'stroke-dasharray="5 5"':''}/>`;
if(!RM)h+=`<circle r="4" fill="#fff"><animateMotion dur="${3+i%3}s" repeatCount="indefinite" begin="-${i}s"><mpath href="#${id}"/></animateMotion></circle>`});
Object.entries(N).forEach(([k,n])=>h+=`<g tabindex="0" role="button" data-k="${k}" aria-label="${n[0]}"><circle class="n" cx="${n[2]}" cy="${n[3]}" r="34"/><text x="${n[2]}" y="${n[3]+9}" style="font-size:28px">${n[1]}</text><text x="${n[2]}" y="${n[3]+56}">${n[0]}</text></g>`);
fw.innerHTML=h;
const pk=$('#pick');Object.entries(N).forEach(([k,n])=>pk.add(new Option(n[0],k)));
function sel(k){const n=N[k];fw.querySelectorAll('g').forEach(g=>g.classList.toggle('on',g.dataset.k===k));pk.value=k;
const eats=n[5].length?n[5].map(x=>N[x][0]).join(', '):'Makes its own food from sunlight';
const by=Object.entries(N).filter(([x,m])=>m[5].includes(k)).map(([x,m])=>m[0]).join(', ')||'—';
$('#fwinfo').innerHTML=`<h3>${n[1]} ${n[0]}</h3><p>${n[4]}</p><p><b>Eats:</b> ${eats}<br><b>Fuels / eaten by:</b> ${by}</p>`}
fw.onclick=e=>{const g=e.target.closest('g');g&&sel(g.dataset.k)};fw.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();const g=e.target.closest('g');g&&sel(g.dataset.k)}};pk.onchange=()=>sel(pk.value);sel('fish');
// ---- reef
const rf=$('#rf');[["🪸",5,60,1],["🪸",22,48,.8],["🌿",35,52,1.1],["🪸",52,58,1],["🌿",66,48,1],["🪸",80,60,.9],["⭐",12,12,.6],["🦀",44,8,.6],["🐚",90,6,.5],["🪼",70,40,.7]].forEach(([e,x,y,s],i)=>{const d=document.createElement('canvas');d.className='o';d.width=240;d.height=240;d.dataset.k={'🪸':'coral','🌿':'weed','⭐':'star','🦀':'crab','🐚':'star','🪼':'jelly'}[e];d.style.cssText=`left:${x}%;bottom:${y>20?y-30+'%':y+'%'};width:${110*s}px;animation:none`;rf.append(d)});
[["🐠",20,0],["🐟",45,-6],["🐠",60,-3]].forEach(([e,t,d],i)=>{const f=document.createElement('canvas');f.className='f';f.width=200;f.height=110;f.dataset.k=i%2?'tang':'clown';f.style.width='90px';f.style.cssText=`top:${25+i*22}%;animation-duration:${12+i*4}s;animation-delay:${d}s;z-index:${i%2?1:3}`;rf.append(f)});
[[18,56,"Corals are tiny animals (polyps) living with algae called zooxanthellae. The algae feed the coral and give it colour. (Science)"],[48,36,"Bleaching: when water stays too warm, corals expel their algae and turn white. They can recover if temperatures drop soon enough. (Science)"],[75,60,"Reefs shelter fish nurseries and protect coastlines from waves. Pollution, overfishing and warming are major threats. (Science)"],[88,22,"Conservation helps: protected areas, cleaner runoff and coral restoration all reduce stress. (Science)"]].forEach(([x,y,t])=>{const b=document.createElement('button');b.className='hot';b.style.cssText=`left:${x}%;top:${y}%`;b.setAttribute('aria-label','Reef fact');b.onclick=()=>$('#hotinfo').textContent=t;rf.append(b)});
// ---- survive
const S=[["Gills","🐟","Water flows over thin gill filaments full of blood vessels. Oxygen passes into the blood and carbon dioxide passes out. Blood flows opposite to the water, which makes the swap very efficient."],["Dolphin sounds","🐬","Dolphins make clicks that bounce off objects. The returning echo tells them shape, size and distance (echolocation). Whistles are used to communicate."],["Octopus camouflage","🐙","Skin cells called chromatophores expand or shrink to change colour. Muscles can also raise bumps to match rocks or coral. Octopuses are thought to be colour-blind, and how they match so well is still studied."],["Shark senses","🦈","Sharks smell tiny traces of blood, feel water movements with their lateral line, and sense faint electric fields from prey with ampullae of Lorenzini."],["Making light","🎣","Deep-sea animals make light with chemical reactions (bioluminescence), sometimes using glowing bacteria. It is used for luring prey, finding mates and confusing predators."],["Turtle navigation","🐢","Sea turtles can sense Earth's magnetic field, which helps them find direction and even a rough position at sea. Hatchlings imprint on it and females often return near their birthplace."],["Whale migration","🐋","Humpbacks feed on krill and fish in cold, rich waters in summer, then travel to warm waters to breed and give birth, eating little there."]];
const tb=$('#tabs'),tp=$('#tp');S.forEach((s,i)=>{const b=document.createElement('button');b.textContent=s[0];b.role='tab';b.onclick=()=>{[...tb.children].forEach(c=>c.setAttribute('aria-selected',c===b));tp.innerHTML=`<div class="anim" style="animation:sw 3s infinite">${s[1]}</div><h3>${s[0]}</h3><p>${s[2]}</p>`};tb.append(b);if(!i)b.click()});
// ---- deep
const D=[["Lanternfish","🔦","Myctophids","Among the most abundant fish, with light organs along the body. They migrate up at night to feed."],["Giant squid","🦑","Architeuthis dux","Has the largest eyes known in the animal kingdom, up to about 27 cm across. Was first filmed alive in 2004."],["Gulper eel","🕳️","Eurypharynx pelecanoides","A huge, loose mouth lets it swallow prey; its tail tip can glow."],["Anglerfish","🎣","Melanocetus johnsonii","Lights a lure to attract prey in total darkness."],["Vampire squid","🧛","Vampyroteuthis infernalis","Not a true squid; lives in low-oxygen waters and releases glowing mucus."]];
const dc=$('#dc');D.forEach(d=>dc.insertAdjacentHTML('beforeend',`<article class="dc glass"><canvas data-k="${DK[d[0]]}" width="360" height="220" aria-hidden="true"></canvas><h3>${d[0]}</h3><i style="color:var(--aq)">${d[2]}</i><p>${d[3]}</p></article>`));
let shown=0;function more(){const c=dc.children;if(shown<c.length){const e=c[shown++];e.style.display='block';requestAnimationFrame(()=>e.classList.add('show'))}$('#abyss').textContent=shown<c.length?'Explore the abyss':'You reached the bottom'}$('#abyss').onclick=more;more();
// ---- restoration
const cm=$('#cmp'),R=[["🪸",0],["🪸",1],["🪸",2],["🌿",1],["🪸",0],["🐠",3],["🐟",2]];
const cmt=["Heavily bleached and littered. Water quality and temperatures must improve first.","Pollution is reduced; first coral larvae settle.","Some fragments regrow; fish begin to return.","Coral cover is rising slowly. Full recovery can take decades and isn't guaranteed."];
function rest(v){$('#yr').textContent=v;const t=v/20;cm.innerHTML=['🪸','🪸','🪸','🌿','🪸','🐠','🐟'].map((e,i)=>{const live=i<5?(t>=i/6?1:0):t>.3?1:0;const bl=Math.max(0,1-t*1.2);return `<span style="transition:.8s;filter:grayscale(${i<5?bl:0}) opacity(${i<5?.5+t*.5:live?1:0})">${e}</span>`}).join('')+(t<.5?`<span style="position:absolute;left:10%;top:20%;opacity:${1-t*2}">🛍️</span><span style="position:absolute;right:15%;top:35%;opacity:${1-t*2}">🥤</span>`:'');$('#cmt').textContent=cmt[Math.min(3,Math.floor(t*4))]}
$('#rng').oninput=e=>rest(+e.target.value);rest(0);
// ---- procedural animal renderer (no image files needed)
const SP={
clown:{p:[.03,.12,.2,.24,.24,.2,.14,.08,.05],a:'#ff7a14',b:'#ffa84a',s:[[.3,.38,'#fff'],[.55,.62,'#fff'],[.88,.97,'#fff']],d:[.28,.72,.1],e:.022},
tang:{p:[.03,.15,.25,.29,.27,.2,.12,.06,.05],a:'#1f5fe0',b:'#2f86ff',s:[[.32,.8,'#10208a']],d:[.25,.8,.13],tc:'#ffd21f',e:.022,tl:.15},
sardine:{p:[.02,.06,.09,.1,.09,.07,.04,.025,.02],a:'#5d7f93',b:'#e9f2f5',e:.016,tc:'#8aa6b4'},
lantern:{p:[.02,.07,.1,.11,.1,.07,.04,.025,.02],a:'#0e2a3d',b:'#35566b',glow:1,e:.025},
shark:{p:[.01,.05,.09,.11,.11,.09,.06,.035,.03],a:'#6b7b86',b:'#f2f5f6',d:[.36,.5,.17],sw:.05,tl:.17,e:.014,w:.04},
dolphin:{p:[.01,.04,.09,.13,.14,.12,.08,.045,.03],a:'#5e7b8b',b:'#dde8ec',d:[.4,.52,.11],sw:.04,e:.014,w:.05},
whale:{p:[.02,.08,.14,.17,.16,.11,.06,.03,.025],a:'#1b3a52',b:'#cfdde4',d:[.62,.7,.06],sw:.03,tl:.12,e:.012,w:.035},
eel:{p:[.02,.04,.05,.05,.05,.045,.04,.035,.03],a:'#80702e',b:'#cbb65c',d:[.1,.95,.025],k:11,w:.07,tl:.03,e:.016},
angler:{p:[.04,.2,.32,.34,.27,.16,.08,.045,.03],a:'#2d2420',b:'#5a4638',lure:1,glow:1,d:[.55,.8,.1],e:.026,w:.04},
gulper:{p:[.05,.12,.1,.07,.045,.03,.025,.02,.015],a:'#150f1c',b:'#2a1e3a',glow:1,tl:.02,k:9,w:.08,tc:'#7df9ff',e:.02}};
const mix=(c,t)=>c;
function drawSp(c,k,x,y,S,t,al=1){c.save();c.globalAlpha=al;c.translate(x,y);const s=SP[k];s?fish(c,s,S,t):SPF[k]&&SPF[k](c,S,t);c.restore()}
function fish(c,s,S,t){const N=26,w=(s.w||.05)*S,q=s.p,K=s.k||6,top=[],bot=[];
const H=u=>{const f=u*(q.length-1),i=Math.min(q.length-2,f|0);return(q[i]+(q[i+1]-q[i])*(f-i))*S};
const X=u=>S*(.5-u*.84),Y=u=>w*Math.sin(u*K-t*4)*(.15+u*u);
for(let i=0;i<=N;i++){const u=i/N;top.push([X(u),Y(u)-H(u)]);bot.push([X(u),Y(u)+H(u)])}
const path=()=>{c.beginPath();top.forEach((p,i)=>c[i?'lineTo':'moveTo'](p[0],p[1]));for(let i=N;i>=0;i--)c.lineTo(bot[i][0],bot[i][1]);c.closePath()};
const tl=(s.tl||.13)*S,x1=X(1),y1=Y(1),ph=Math.sin(-t*4+K)*tl*.3;
c.fillStyle=s.tc||s.a;c.beginPath();c.moveTo(x1+S*.02,y1);c.lineTo(x1-S*.17,y1-tl+ph);c.quadraticCurveTo(x1-S*.11,y1,x1-S*.17,y1+tl+ph);c.closePath();c.fill();
if(s.d){const[a,b,h]=s.d,ia=a*N|0,ib=b*N|0;c.fillStyle=s.fc||s.a;c.beginPath();c.moveTo(top[ia][0],top[ia][1]+3);c.quadraticCurveTo(top[ia][0],top[ia][1]-h*S,top[ib][0]-S*(s.sw||0),top[ib][1]-h*S*.25);c.lineTo(top[ib][0],top[ib][1]+3);c.closePath();c.fill()}
const g=c.createLinearGradient(0,-S*.2,0,S*.2);g.addColorStop(0,s.a);g.addColorStop(.5,s.a);g.addColorStop(.85,s.b);g.addColorStop(1,s.b);
c.fillStyle=g;path();c.fill();
c.save();path();c.clip();
const strip=(a,b,col,pad)=>{c.fillStyle=col;c.beginPath();for(let i=a*N|0;i<=b*N|0;i++)c[i>a*N|0?'lineTo':'moveTo'](top[i][0],top[i][1]-pad);for(let i=b*N|0;i>=a*N|0;i--)c.lineTo(bot[i][0],bot[i][1]+pad);c.fill()};
(s.s||[]).forEach(([a,b,col])=>{strip(a-.02,b+.02,'#1a0f08',4);strip(a,b,col,4)});
const hl=c.createLinearGradient(0,-S*.2,0,0);hl.addColorStop(0,'rgba(255,255,255,.28)');hl.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=hl;c.fillRect(-S,-S*.3,2*S,S*.3);
const sh=c.createLinearGradient(0,0,0,S*.2);sh.addColorStop(0,'rgba(0,0,0,0)');sh.addColorStop(1,'rgba(0,10,20,.3)');c.fillStyle=sh;c.fillRect(-S,0,2*S,S*.3);
if(s.glow){for(let i=3;i<N-3;i+=3){c.fillStyle=`rgba(125,249,255,${.5+.5*Math.sin(t*3+i)})`;c.beginPath();c.arc(bot[i][0],bot[i][1]-S*.012,S*.007,0,7);c.fill()}}
c.restore();
const px=X(.26),py=Y(.26)+H(.26)*.35;c.fillStyle=s.b;c.globalAlpha*=.85;c.beginPath();c.moveTo(px,py);c.lineTo(px-S*.11,py+S*.06+Math.sin(t*5)*S*.02);c.lineTo(px-S*.03,py+S*.01);c.fill();c.globalAlpha/=.85;
const ex=X(.1),ey=Y(.1)-H(.1)*.22,r=(s.e||.02)*S;c.fillStyle='#f3ecc8';c.beginPath();c.arc(ex,ey,r*1.35,0,7);c.fill();c.fillStyle='#050505';c.beginPath();c.arc(ex,ey,r,0,7);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(ex+r*.3,ey-r*.3,r*.3,0,7);c.fill();
c.strokeStyle='rgba(0,0,0,.25)';c.lineWidth=1.5;c.beginPath();c.moveTo(X(.2),Y(.2)-H(.2)*.7);c.quadraticCurveTo(X(.17),Y(.2),X(.2),Y(.2)+H(.2)*.7);c.stroke();
if(s.lure){const lx=X(.04)+S*.1,ly=Y(.04)-S*.3+Math.sin(t*2)*S*.02;c.strokeStyle='#4a3a30';c.lineWidth=2;c.beginPath();c.moveTo(top[2][0],top[2][1]);c.quadraticCurveTo(top[2][0]+S*.1,top[2][1]-S*.25,lx,ly);c.stroke();
const rg=c.createRadialGradient(lx,ly,0,lx,ly,S*.12);rg.addColorStop(0,'rgba(220,255,255,1)');rg.addColorStop(.3,'rgba(95,240,224,.6)');rg.addColorStop(1,'rgba(95,240,224,0)');c.fillStyle=rg;c.beginPath();c.arc(lx,ly,S*.12,0,7);c.fill()}}
const SPF={
jelly(c,S,t){const pu=1+.1*Math.sin(t*3),r=S*.3;c.translate(0,-S*.12);
c.lineCap='round';for(let k=-4;k<=4;k++){c.strokeStyle='rgba(200,255,255,.45)';c.lineWidth=k%2?1:2.5;c.beginPath();c.moveTo(k*r/4.2,0);for(let i=1;i<=8;i++)c.lineTo(k*r/4.2+Math.sin(t*2+i*.7+k)*S*.025*i/3,i*S*.06);c.stroke()}
const g=c.createRadialGradient(0,-r*.3,r*.1,0,0,r*1.2);g.addColorStop(0,'rgba(255,210,255,.95)');g.addColorStop(.6,'rgba(150,190,255,.55)');g.addColorStop(1,'rgba(110,255,240,.3)');
c.fillStyle=g;c.beginPath();c.ellipse(0,0,r*(2-pu)*1.1,r*pu*.85,0,Math.PI,0);c.quadraticCurveTo(r*.6,r*.12,0,r*.06);c.quadraticCurveTo(-r*.6,r*.12,-r*1.1*(2-pu),0);c.fill();
c.strokeStyle='rgba(255,255,255,.5)';c.lineWidth=1.5;c.beginPath();c.ellipse(0,0,r*.7,r*.6,0,Math.PI*1.1,Math.PI*1.7);c.stroke()},
octo(c,S,t,sq,col,col2){const a=col||'#c0452e';const g=c.createRadialGradient(0,-S*.18,S*.02,0,-S*.1,S*.28);g.addColorStop(0,col2||'#f0a27c');g.addColorStop(1,a);c.lineCap='round';
for(let k=0;k<8;k++){const ang=Math.PI*(.12+k*.108),bx=Math.cos(ang)*S*.12,sw=Math.sin(t*2+k)*S*.05;let px=bx,py=S*.02;for(let i=1;i<=14;i++){const nx=bx*(1+i*.22)+Math.sin(t*2.2+k+i*.5)*S*.012*i+(k-3.5)*S*.01*i*.3,ny=S*.02+i*S*(sq?.034:.026);c.strokeStyle=a;c.lineWidth=Math.max(1.5,S*.05*(1-i/15));c.beginPath();c.moveTo(px,py);c.lineTo(nx,ny);c.stroke();px=nx;py=ny}}
c.fillStyle=g;c.beginPath();c.ellipse(0,sq?-S*.2:-S*.1,S*(sq?.11:.2),S*(sq?.28:.19),0,0,7);c.fill();
if(sq){c.beginPath();c.moveTo(0,-S*.5);c.lineTo(S*.16,-S*.35);c.lineTo(0,-S*.3);c.lineTo(-S*.16,-S*.35);c.fill()}
for(const sx of[-1,1]){c.fillStyle='#f6efd0';c.beginPath();c.arc(sx*S*.075,-S*.04,S*.04,0,7);c.fill();c.fillStyle='#000';c.fillRect(sx*S*.075-S*.03,-S*.045,S*.06,S*.012)}},
squid(c,S,t){SPF.octo(c,S,t,1,'#a8322a','#e87a62')},vampire(c,S,t){SPF.octo(c,S,t,0,'#3b0d18','#7a2433')},
turtle(c,S,t){const fl=Math.sin(t*2.2);c.fillStyle='#8aa35a';c.save();c.translate(S*.1,S*.04);c.rotate(.5+fl*.5);c.beginPath();c.ellipse(S*.12,0,S*.2,S*.045,0,0,7);c.fill();c.restore();
c.beginPath();c.ellipse(-S*.28,S*.1,S*.08,S*.03,-.3+fl*.2,0,7);c.fill();c.beginPath();c.ellipse(S*.36,-S*.02,S*.07,S*.055,0,0,7);c.fillStyle='#9ab66a';c.fill();c.fillStyle='#000';c.beginPath();c.arc(S*.39,-S*.04,S*.009,0,7);c.fill();
const g=c.createLinearGradient(0,-S*.2,0,S*.1);g.addColorStop(0,'#7a6a2a');g.addColorStop(1,'#3d4a22');c.fillStyle=g;c.beginPath();c.ellipse(-S*.02,0,S*.3,S*.17,0,Math.PI,0);c.lineTo(S*.28,S*.04);c.lineTo(-S*.32,S*.04);c.fill();
c.strokeStyle='rgba(30,20,0,.55)';c.lineWidth=2;for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(i*S*.1,S*.03);c.lineTo(i*S*.08,-S*.15*Math.cos(i*.4));c.stroke()}c.beginPath();c.moveTo(-S*.3,-S*.04);c.lineTo(S*.26,-S*.04);c.stroke()},
horse(c,S,t){for(let i=0;i<=34;i++){const v=i/34;let x=S*.08*Math.sin(v*4+t*.8)-S*.02,y=-S*.38+v*S*.7,r=S*.075*(1-v*.75)+S*(v<.4&&v>.12?.03:0);if(v>.72){const a=(v-.72)*Math.PI*9;x+=S*.06*(Math.sin(a)*(1-v)*2.5);y-=S*.03*(1-Math.cos(a))*.5}c.fillStyle=`hsl(${38-v*10},90%,${58-v*14}%)`;c.beginPath();c.arc(x,y,Math.max(2,r),0,7);c.fill()}
c.fillStyle='#e9a23a';c.beginPath();c.ellipse(-S*.12,-S*.35,S*.1,S*.028,.25,0,7);c.fill();c.fillStyle='#000';c.beginPath();c.arc(-S*.02,-S*.4,S*.014,0,7);c.fill();
c.strokeStyle='#ffd27a';c.lineWidth=S*.02;c.beginPath();c.moveTo(S*.08,-S*.2);c.lineTo(S*.12+Math.sin(t*6)*S*.01,-S*.05);c.stroke()},
ray(c,S,t){const f=Math.sin(t*2)*S*.12,g=c.createLinearGradient(0,-S*.3,0,S*.3);g.addColorStop(0,'#1d2d3b');g.addColorStop(1,'#3c5566');c.fillStyle=g;c.beginPath();c.moveTo(S*.42,0);c.quadraticCurveTo(S*.1,-S*.15,-S*.1,-S*.38-f);c.quadraticCurveTo(-S*.2,-S*.1,-S*.22,0);c.quadraticCurveTo(-S*.2,S*.1,-S*.1,S*.38+f);c.quadraticCurveTo(S*.1,S*.15,S*.42,0);c.fill();
c.fillStyle='#f4f8fa';c.beginPath();c.ellipse(S*.1,0,S*.1,S*.05,0,0,7);c.globalAlpha*=.8;c.fill();c.globalAlpha/=.8;c.fillStyle='#050505';c.beginPath();c.arc(S*.3,-S*.03,S*.012,0,7);c.fill();c.strokeStyle='#22303c';c.lineWidth=3;c.beginPath();c.moveTo(-S*.22,0);c.quadraticCurveTo(-S*.35,Math.sin(t*3)*S*.04,-S*.5,0);c.stroke()},
coral(c,S,t){const br=(x,y,a,l,d)=>{if(d<0)return;const nx=x+Math.cos(a)*l,ny=y+Math.sin(a)*l;c.strokeStyle=`hsl(${340+d*8},75%,${50+d*5}%)`;c.lineWidth=d*2+1;c.lineCap='round';c.beginPath();c.moveTo(x,y);c.lineTo(nx,ny);c.stroke();const sw=Math.sin(t+d)*.06;br(nx,ny,a-.45+sw,l*.76,d-1);br(nx,ny,a+.45+sw,l*.76,d-1)};br(0,S*.45,-Math.PI/2,S*.2,4)},
weed(c,S,t){for(let k=-3;k<=3;k++){c.strokeStyle=`hsl(${110+k*6},60%,${30+Math.abs(k)*3}%)`;c.lineWidth=4;c.lineCap='round';c.beginPath();c.moveTo(k*S*.05,S*.45);c.bezierCurveTo(k*S*.05+Math.sin(t+k)*S*.08,S*.2,k*S*.06-Math.sin(t*.9+k)*S*.08,-S*.1,k*S*.08+Math.sin(t+k)*S*.1,-S*.4+Math.abs(k)*S*.04);c.stroke()}},
star(c,S,t){c.fillStyle='#e8672a';c.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,r=i%2?S*.1:S*.3;c.lineTo(Math.cos(a)*r,S*.2+Math.sin(a)*r*.5)}c.fill();c.fillStyle='#ffd0a0';for(let i=0;i<5;i++){const a=i*Math.PI*.4-Math.PI/2;c.beginPath();c.arc(Math.cos(a)*S*.18,S*.2+Math.sin(a)*S*.09,2,0,7);c.fill()}},
crab(c,S,t){c.strokeStyle='#b8321e';c.lineWidth=3;for(let i=-1;i<=1;i+=2)for(let k=0;k<3;k++){c.beginPath();c.moveTo(i*S*.1,S*.28);c.lineTo(i*S*(.22+k*.04),S*.35+Math.sin(t*5+k)*3);c.stroke()}c.fillStyle='#d6402a';c.beginPath();c.ellipse(0,S*.28,S*.16,S*.1,0,0,7);c.fill();for(const i of[-1,1]){c.beginPath();c.arc(i*S*.27,S*.14+Math.sin(t*2)*3,S*.07,0,7);c.fill()}}};
function fishNew(dx,dy){fi.forEach((f,i)=>{f.k=f.k||['clown','tang','sardine'][i%3];f.x+=f.v;if(f.x>1.1)f.x=-.1;if(f.x<-.1)f.x=1.1;cx.save();cx.translate(f.x*W+dx*f.z,f.y*H+Math.sin(T/40+f.ph)*12+dy*f.z);if(f.v<0)cx.scale(-1,1);drawSp(cx,f.k,0,0,50+f.z*50,T/25+f.ph,.95*(1-P*3));cx.restore()})}
function aloop(ts){const t=ts/1000;document.querySelectorAll('canvas[data-k]').forEach(c=>{const r=c.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);drawSp(x,c.dataset.k,c.width/2,c.height/2,c.width*.75,t)});
if(dlg.open){const x=big.getContext('2d');x.clearRect(0,0,520,280);drawSp(x,bigK,260,140,380,t)}requestAnimationFrame(aloop)}

// ---- sea canvas
const cv=$('#sea'),cx=cv.getContext('2d');let W,H,P=0,mx=.5,my=.5,T=0;const stops=[[0,[18,150,176]],[.2,[8,90,125]],[.45,[4,40,70]],[.75,[2,14,30]],[1,[1,4,10]]];
function col(p){for(let i=1;i<stops.length;i++)if(p<=stops[i][0]){const[a,b]=[stops[i-1],stops[i]],t=(p-a[0])/(b[0]-a[0]);return a[1].map((v,k)=>v+(b[1][k]-v)*t|0)}return stops[4][1]}
const rs=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};rs();addEventListener('resize',rs);
const nb=innerWidth<700?30:60,bu=[...Array(nb)].map(()=>({x:Math.random(),y:Math.random(),r:1+Math.random()*4,s:.0006+Math.random()*.001,ph:Math.random()*9})),
sn=[...Array(nb)].map(()=>({x:Math.random(),y:Math.random(),s:.0002+Math.random()*.0004})),
fi=[...Array(22)].map((_,i)=>({x:Math.random(),y:.15+Math.random()*.5,v:(.0003+Math.random()*.0004)*(i%2?1:-1),ph:Math.random()*9,z:Math.random()})),
je=[...Array(4)].map((_,i)=>({x:.15+i*.25,y:.3+Math.random()*.4,ph:i}));
function frame(){T+=RM?0:1;const c=col(P);const g=cx.createLinearGradient(0,0,0,H);g.addColorStop(0,`rgb(${c.map(v=>Math.min(255,v*1.3|0))})`);g.addColorStop(1,`rgb(${c.map(v=>v*.55|0)})`);cx.fillStyle=g;cx.fillRect(0,0,W,H);
const dx=(mx-.5)*30,dy=(my-.5)*20,light=Math.max(0,1-P*2.2);
// rays
if(light>0)for(let i=0;i<6;i++){const x=W*(.1+i*.17)+Math.sin(T/200+i)*40+dx*2;cx.fillStyle=`rgba(200,255,255,${.07*light})`;cx.beginPath();cx.moveTo(x,0);cx.lineTo(x+60,0);cx.lineTo(x+220,H);cx.lineTo(x-120,H);cx.fill()}
// whale (hero only)
if(P<.25){drawSp(cx,'whale',((T*.4)%(W+700))-500+dx,H*.3+dy,560,T/50,.5*(1-P*4))}if(0){const wx=((T*.4)%(W+700))-500;cx.save();cx.globalAlpha=.35*(1-P*4);cx.fillStyle='#04364d';cx.translate(wx+dx,H*.3+dy+Math.sin(T/80)*10);cx.beginPath();cx.ellipse(0,0,230,52,0,0,7);cx.fill();cx.beginPath();cx.moveTo(-200,0);cx.lineTo(-290,-50+Math.sin(T/30)*20);cx.lineTo(-290,40+Math.sin(T/30)*20);cx.fill();cx.restore()}
// fish
if(P<.35){fishNew(dx,dy)}if(0){cx.fillStyle=`rgba(255,220,120,${.8*(1-P*3)})`;fi.forEach(f=>{f.x+=f.v;if(f.x>1.1)f.x=-.1;if(f.x<-.1)f.x=1.1;const x=f.x*W+dx*f.z,y=f.y*H+Math.sin(T/40+f.ph)*12+dy*f.z,d=f.v>0?1:-1,s=5+f.z*5;cx.beginPath();cx.moveTo(x+s*d,y);cx.lineTo(x-s*d,y-s/2);cx.lineTo(x-s*d,y+s/2);cx.fill()})}
// jellyfish
const ja=P<.7?.55:.35;je.forEach(j=>{const x=j.x*W+dx*1.5,y=j.y*H+Math.sin(T/70+j.ph)*30+dy*1.5;drawSp(cx,'jelly',x,y,90,T/60,ja);return;cx.strokeStyle=`rgba(160,255,255,${ja*.6})`;cx.fillStyle=`rgba(140,240,255,${ja*.45})`;cx.beginPath();cx.arc(x,y,24,Math.PI,0);cx.fill();for(let k=-2;k<=2;k++){cx.beginPath();cx.moveTo(x+k*8,y);cx.quadraticCurveTo(x+k*8+Math.sin(T/20+k)*8,y+25,x+k*8,y+48);cx.stroke()}});
// snow / bubbles
sn.forEach(s=>{s.y+=s.s;if(s.y>1)s.y=0;cx.fillStyle=`rgba(220,245,255,${.15+P*.35})`;cx.fillRect(s.x*W+dx*.5,s.y*H,2,2)});
cx.strokeStyle='rgba(200,255,255,.5)';bu.forEach(b=>{b.y-=b.s;if(b.y<-.05)b.y=1.05;cx.beginPath();cx.arc(b.x*W+Math.sin(T/50+b.ph)*8,b.y*H,b.r,0,7);cx.stroke()});
// cursor light
const gl=cx.createRadialGradient(mx*W,my*H,0,mx*W,my*H,220);gl.addColorStop(0,`rgba(125,249,255,${.1+P*.12})`);gl.addColorStop(1,'transparent');cx.fillStyle=gl;cx.fillRect(0,0,W,H);
if(!RM)requestAnimationFrame(frame)}
addEventListener('pointermove',e=>{mx=e.clientX/W;my=e.clientY/H});
const zn=["Sunlight zone","Twilight zone","Midnight zone","Abyssal zone"];
function sc(){const m=document.documentElement.scrollHeight-innerHeight;P=m>0?scrollY/m:0;const d=Math.round(P*6000/10)*10;$('#dm').textContent=d.toLocaleString()+' m';$('#zl').textContent=zn[d<200?0:d<1000?1:d<4000?2:3];$('#top').classList.toggle('v',scrollY>600);if(RM)frame()}
addEventListener('scroll',sc,{passive:true});$('#top').onclick=()=>scrollTo({top:0,behavior:RM?'auto':'smooth'});
sc();frame();aloop(0);setTimeout(()=>{$('#load').style.opacity=0;setTimeout(()=>$('#load').remove(),1000)},900);
// ---- sound (muted by default, generated in-browser)
let ac,gn,on=false,tm;const sb=$('#snd');
function start(){ac=new(window.AudioContext||window.webkitAudioContext)();gn=ac.createGain();gn.gain.value=0;gn.connect(ac.destination);
const buf=ac.createBuffer(1,ac.sampleRate*3,ac.sampleRate),d=buf.getChannelData(0);let l=0;for(let i=0;i<d.length;i++){l=(l+.02*(Math.random()*2-1))/1.02;d[i]=l*3.5}
const s=ac.createBufferSource();s.buffer=buf;s.loop=true;const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=400;s.connect(f).connect(gn);s.start();
const tone=(fr,t,dur,vol,sweep)=>{const o=ac.createOscillator(),g=ac.createGain();o.frequency.setValueAtTime(fr,t);o.frequency.exponentialRampToValueAtTime(sweep,t+dur);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+dur*.3);g.gain.linearRampToValueAtTime(0,t+dur);o.connect(g).connect(gn);o.start(t);o.stop(t+dur)};
(function loop(){if(on){const t=ac.currentTime;if(Math.random()<.5)tone(700+Math.random()*500,t,.12,.05,1400);if(Math.random()<.12){tone(180,t,3,.12,320);tone(240,t+.3,3,.06,420)}}tm=setTimeout(loop,900)})()}
sb.onclick=()=>{if(!ac)start();on=!on;ac.resume();gn.gain.linearRampToValueAtTime(on?.4:0,ac.currentTime+1);sb.textContent=on?'🔊 Sound on':'🔇 Sound off';sb.setAttribute('aria-pressed',on)};
