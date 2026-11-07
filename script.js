const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, {threshold: 0.14});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const audio = document.getElementById('birthdayAudio');
const musicBtn = document.getElementById('musicBtn');
musicBtn.addEventListener('click', async () => {
  if (audio.paused) {
    try { await audio.play(); document.getElementById('musicIcon').textContent = 'Ⅱ'; document.getElementById('musicLabel').textContent = 'Pause music'; }
    catch(e) { document.getElementById('musicLabel').textContent = 'Add music file'; }
  } else { audio.pause(); document.getElementById('musicIcon').textContent = '♫'; document.getElementById('musicLabel').textContent = 'Play music'; }
});

const canvas = document.getElementById('confetti'), ctx = canvas.getContext('2d');
let pieces = [], running = false;
function resize(){canvas.width=innerWidth;canvas.height=innerHeight}
addEventListener('resize',resize); resize();
function celebrate(){
  pieces = Array.from({length:180},()=>({x:Math.random()*canvas.width,y:-Math.random()*canvas.height*.7,w:3+Math.random()*5,h:5+Math.random()*8,v:2+Math.random()*4,a:Math.random()*Math.PI,spin:(Math.random()-.5)*.15,life:100+Math.random()*80}));
  if(!running){running=true; frame();}
}
function frame(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  pieces.forEach(p=>{p.y+=p.v;p.x+=Math.sin(p.a)*1.5;p.a+=p.spin;p.life--;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.a);ctx.fillStyle=['#dfbd86','#c9a6db','#f5e7cf','#9e8cc4'][Math.floor(Math.random()*4)];ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();});
  pieces=pieces.filter(p=>p.life>0&&p.y<canvas.height+20);
  if(pieces.length) requestAnimationFrame(frame); else {running=false;ctx.clearRect(0,0,canvas.width,canvas.height);}
}
document.getElementById('celebrateBtn').addEventListener('click',celebrate);
setTimeout(celebrate,900);
