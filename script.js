/* ============================================================
   AYUSH PRATAP SINGH — Portfolio Script
   ============================================================ */

/* ── 1. MAGNETIC CURSOR ── */
const mag = document.getElementById('mag');
let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
let mx = cx, my = cy;

document.addEventListener('mousemove', function(e) {
  mx = e.clientX;
  my = e.clientY;
});

(function cursorLoop() {
  cx += (mx - cx) * 0.12;
  cy += (my - cy) * 0.12;
  mag.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
  requestAnimationFrame(cursorLoop);
})();

// Expand cursor on interactive elements
document.querySelectorAll('a, button, .pcard, .vitem, .srv-row, .sk, .info-row').forEach(function(el) {
  el.addEventListener('mouseenter', function() { document.body.classList.add('expand'); });
  el.addEventListener('mouseleave', function() { document.body.classList.remove('expand'); });
});


/* ── 2. HERO PARTICLE CANVAS ── */
var canvas = document.getElementById('heroCanvas');
var ctx = canvas.getContext('2d');
var pts = [];

function resizeCanvas() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  initParticles();
}

function initParticles() {
  pts = [];
  var n = Math.floor(canvas.width * canvas.height / 16000);
  for (var i = 0; i < n; i++) {
    pts.push({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r:  Math.random() * 1.2 + 0.3
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move & draw dots
  pts.forEach(function(p) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(212,168,83,0.55)';
    ctx.fill();
  });

  // Draw connecting lines between nearby dots
  for (var i = 0; i < pts.length; i++) {
    for (var j = i + 1; j < pts.length; j++) {
      var dx = pts[i].x - pts[j].x;
      var dy = pts[i].y - pts[j].y;
      var d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 110) {
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = 'rgba(212,168,83,' + (0.15 * (1 - d / 110)) + ')';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawParticles();


/* ── 3. SCROLL PROGRESS + NAV DARK + REVEAL ── */
window.addEventListener('scroll', function() {
  var s = document.documentElement.scrollTop;
  var h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  document.getElementById('bar').style.width = (s / h * 100) + '%';
  document.getElementById('nav').classList.toggle('dark', s > 60);

  document.querySelectorAll('.reveal').forEach(function(el) {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
      el.classList.add('in');
    }
  });
});

// Run once on load
setTimeout(function() {
  document.querySelectorAll('.reveal').forEach(function(el) {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
      el.classList.add('in');
    }
  });
}, 100);


/* ── 4. TEXT SCRAMBLE on hero name ── */
var scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';

function scramble(el, target, delay) {
  var frame = 0;
  setTimeout(function() {
    var interval = setInterval(function() {
      el.textContent = target.split('').map(function(_, i) {
        return frame > i * 2
          ? target[i]
          : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      }).join('');
      if (++frame > target.length * 2 + 10) clearInterval(interval);
    }, 40);
  }, delay);
}

setTimeout(function() {
  scramble(document.getElementById('sc1'), 'AYUSH', 400);
  scramble(document.getElementById('sc3'), 'SINGH', 800);
}, 600);


/* ── 5. VIDEO HOVER PLAY ── */
document.querySelectorAll('.vitem, .pcard').forEach(function(wrap) {
  var video = wrap.querySelector('video');
  if (!video) return;
  wrap.addEventListener('mouseenter', function() { video.play(); });
  wrap.addEventListener('mouseleave', function() { video.pause(); video.currentTime = 0; });
});


/* ── 6. HIRE ME POPUP ── */
function openPop() {
  document.getElementById('popBg').classList.add('on');
}

function closePop() {
  document.getElementById('popBg').classList.remove('on');
}

document.getElementById('popBg').addEventListener('click', function(e) {
  if (e.target === e.currentTarget) closePop();
});


/* ── 7. MOBILE MENU ── */
function openMob() {
  document.getElementById('mobDraw').classList.add('on');
  document.getElementById('mobVeil').classList.add('on');
}

function closeMob() {
  document.getElementById('mobDraw').classList.remove('on');
  document.getElementById('mobVeil').classList.remove('on');
}


/* ── 8. ESCAPE KEY closes all overlays ── */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closePop();
    closeMob();
  }
});