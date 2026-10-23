const pages=[...document.querySelectorAll(".page")];
const navLinks=[...document.querySelectorAll("[data-page]")];
const soundToggle=document.querySelector("#soundToggle");
const soundLabel=document.querySelector("#soundLabel");
const contactPanel=document.querySelector("#contact");
const serviceSelect=document.querySelector("#serviceSelect");
const toast=document.querySelector("#toast");
let soundEnabled=false, audioContext=null, toastTimer=null;
function ping(){if(!soundEnabled)return;try{audioContext=audioContext||new(window.AudioContext||window.webkitAudioContext)();if(audioContext.state==="suspended")audioContext.resume();const now=audioContext.currentTime;[520,780].forEach((freq,i)=>{const osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.type="square";osc.frequency.setValueAtTime(freq,now+i*.055);gain.gain.setValueAtTime(.0001,now+i*.055);gain.gain.exponentialRampToValueAtTime(.035,now+i*.055+.012);gain.gain.exponentialRampToValueAtTime(.0001,now+i*.055+.09);osc.connect(gain);gain.connect(audioContext.destination);osc.start(now+i*.055);osc.stop(now+i*.055+.1)});}catch(e){}}
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2200)}
function goPage(id,play=true){const target=document.getElementById(id);if(!target||!target.classList.contains("page"))return;const current=pages.find(p=>p.classList.contains("active"));if(current===target)return;if(current){current.classList.add("leaving");setTimeout(()=>{current.classList.remove("active","leaving")},160)}target.classList.add("active");document.querySelectorAll(".nav-link").forEach(link=>link.classList.toggle("active",link.dataset.page===id));if(play)ping();window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});}
navLinks.forEach(el=>el.addEventListener("click",e=>{e.preventDefault();goPage(el.dataset.page)}));
soundToggle.addEventListener("click",()=>{soundEnabled=!soundEnabled;soundToggle.setAttribute("aria-pressed",String(soundEnabled));soundLabel.textContent=soundEnabled?"SOUND ON":"SOUND OFF";soundToggle.style.borderColor=soundEnabled?"#9cff38":"#9cff3855";if(soundEnabled){ping();showToast("GAME AUDIO ENABLED")}else showToast("GAME AUDIO MUTED")});
function openContact(service){if(service)serviceSelect.value=service;contactPanel.classList.remove("hidden");contactPanel.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";ping();setTimeout(()=>contactPanel.querySelector("input").focus(),50)}
function closeContact(){contactPanel.classList.add("hidden");contactPanel.setAttribute("aria-hidden","true");document.body.style.overflow=""}
document.querySelectorAll(".order-btn").forEach(btn=>btn.addEventListener("click",()=>openContact(btn.dataset.service)));
document.querySelectorAll("[data-contact]").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();openContact()}));
document.querySelector("#closeContact").addEventListener("click",closeContact);
contactPanel.addEventListener("click",e=>{if(e.target===contactPanel)closeContact()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeContact()});
document.querySelector("#orderForm").addEventListener("submit",e=>{e.preventDefault();const data=new FormData(e.currentTarget);const request=`UTERLIZ — PROJECT INQUIRY\n\nName: ${data.get("name")}\nService: ${data.get("service")}\nBudget: ₹${data.get("budget")}\nProject details:\n${data.get("details")}\n\nPlease let me know the estimated price and timeline.`;document.querySelector("#requestText").value=request;document.querySelector("#orderOutput").classList.remove("hidden");document.querySelector("#orderOutput").scrollIntoView({behavior:"smooth",block:"nearest"});showToast("REQUEST PREPARED — NOT SENT");});
document.querySelector("#copyRequest").addEventListener("click",async()=>{const text=document.querySelector("#requestText").value;try{await navigator.clipboard.writeText(text);showToast("REQUEST COPIED")}catch{document.querySelector("#requestText").select();document.execCommand("copy");showToast("REQUEST SELECTED — COPY IT")}});
