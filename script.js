// AOS animation
AOS.init({
  duration: 900,
  once: true
});

// Scroll progress bar
window.addEventListener('scroll',()=>{
  const winScroll=document.body.scrollTop||document.documentElement.scrollTop;
  const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;
  document.getElementById('progress').style.width=(winScroll/height)*100+'%';
});

function toggleMenu(){
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");

  menu.classList.toggle("translate-x-full");
  overlay.classList.toggle("hidden");
}

// Hire Me popup
function openPopup(){
  document.getElementById("hirePopup").classList.remove("hidden");
}

function closePopup(){
  document.getElementById("hirePopup").classList.add("hidden");
}

// Mobile navigation
// Slide mobile menu
function toggleMenu(){
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("translate-x-full");
}

// Contact form
const form = document.getElementById('contactForm');

if(form){
form.addEventListener('submit', async (e)=>{
 e.preventDefault();
 document.getElementById('status').innerText="Sending...";

 try{
   const data = Object.fromEntries(new FormData(form));
   const res = await fetch('http://localhost:5000/contact',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(data)
   });
   const msg = await res.json();
   document.getElementById('status').innerText = msg.message;
 }catch{
   document.getElementById('status').innerText = "Backend not connected.";
 }
});
}

// Contact popup
function openContactPopup(){
  document.getElementById("contactPopup").classList.remove("hidden");
}

function closeContactPopup(){
  document.getElementById("contactPopup").classList.add("hidden");
}