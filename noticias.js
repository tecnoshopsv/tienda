// Portada tipo noticias: reemplaza el banner fijo por un carrusel que cambia solo.
// Si algo falla, se queda el banner original.
(function () {
  var WA = 'https://wa.me/50372427154';
  var CSS = '' +
    '.nt{position:relative;overflow:hidden;min-height:250px}' +
    '.nt-pista{display:flex;transition:transform .6s cubic-bezier(.22,.8,.3,1)}' +
    '.nt-sl{flex:0 0 100%;display:flex;align-items:center;gap:28px;min-height:250px;box-sizing:border-box;padding:4px 2px}' +
    '.nt-tx{flex:1 1 auto;min-width:0}' +
    '.nt-et{display:inline-block;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;background:#FFC52E;color:#3a1660;border-radius:999px;padding:5px 12px;margin-bottom:12px}' +
    '.nt h2{font-size:clamp(26px,4.2vw,46px);line-height:1.05;margin:0 0 10px;color:#fff;font-weight:900}' +
    '.nt h2 span{color:#FFC52E}' +
    '.nt p{margin:0 0 14px;color:rgba(255,255,255,.88);font-size:clamp(14px,1.6vw,18px);max-width:640px}' +
    '.nt-bt{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#3a1660;font-weight:800;border-radius:999px;padding:10px 18px;text-decoration:none;font-size:15px}' +
    '.nt-bt:hover{background:#FFC52E}' +
    '.nt-img{flex:0 0 auto;width:min(30vw,230px);display:flex;justify-content:center}' +
    '.nt-img img{width:100%;height:auto;filter:drop-shadow(0 18px 28px rgba(0,0,0,.35))}' +
    '.nt-ico{font-size:clamp(70px,10vw,120px);line-height:1}' +
    '.nt-bancos{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 14px}' +
    '.nt-bancos span{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25);border-radius:10px;padding:6px 10px;color:#fff;font-size:13px;font-weight:700}' +
    '.nt-pie{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:10px;flex-wrap:wrap}' +
    '.nt-pts{display:flex;gap:8px}' +
    '.nt-pts button{width:10px;height:10px;border-radius:999px;border:0;background:rgba(255,255,255,.35);padding:0;cursor:pointer;transition:width .3s,background .3s}' +
    '.nt-pts button[aria-current="true"]{width:28px;background:#FFC52E}' +
    '.nt-fl{display:flex;gap:8px}' +
    '.nt-fl button{width:36px;height:36px;border-radius:999px;border:1px solid rgba(255,255,255,.35);background:rgba(255,255,255,.08);color:#fff;font-size:18px;cursor:pointer}' +
    '.nt-fl button:hover{background:rgba(255,255,255,.2)}' +
    '@media (max-width:640px){.nt,.nt-sl{min-height:300px}.nt-sl{gap:10px}.nt-img{width:32vw}.nt-fl{display:none}}' +
    '@media (prefers-reduced-motion:reduce){.nt-pista{transition:none}}';

  function iniciar() {
    var portada = document.querySelector('section.portada .dentro');
    if (!portada || document.querySelector('.nt')) return;
    var mostrando = portada.querySelector('.mostrando');

    // Lo más nuevo: el iPhone de generación más alta que esté en el catálogo, con su foto
    var nuevo = null;
    document.querySelectorAll('.prod').forEach(function (p) {
      var m = (p.innerText || '').match(/iPhone (\d{2})( Pro Max| Pro| Plus)?/);
      if (!m) return;
      var n = Number(m[1]), rango = m[2] === ' Pro Max' ? 3 : m[2] === ' Pro' ? 2 : m[2] === ' Plus' ? 1 : 0;
      var img = p.querySelector('.foto img'), src = img ? img.getAttribute('src') : '';
      if (src && src.indexOf('data:') === 0) src = '';
      if (!nuevo || n > nuevo.n || (n === nuevo.n && rango > nuevo.r)) nuevo = { n: n, r: rango, nombre: m[0], src: src };
    });

    var sl = [];
    sl.push({ et: 'Catálogo · ' + new Date().toLocaleDateString('es-SV', { month: 'long', year: 'numeric' }),
      h: 'Tu próximo celular, <span>garantizado.</span>',
      p: 'iPhone y Samsung nuevos y seminuevos, 100% testeados y liberados. 3 meses de garantía y cargador original incluido.',
      bt: ['Ver equipos', '#filtros'], ico: '📱' });
    if (nuevo) sl.push({ et: 'Recién llegado', h: 'Ya tenemos el <span>' + nuevo.nombre + '</span>',
      p: 'Lo más nuevo de Apple, listo para entregar. Consulta colores y capacidades disponibles.',
      bt: ['Me interesa', WA + '?text=' + encodeURIComponent('Hola, me interesa el ' + nuevo.nombre)], img: nuevo.src, ico: '✨' });
    sl.push({ et: 'Pago con tarjeta', h: 'Llévatelo a <span>Tasa 0%</span>',
      p: 'Paga en meses sin intereses con tu tarjeta de crédito de estos bancos:',
      bancos: ['BAC', 'Banco Agrícola', 'Banco Cuscatlán', 'Banco Promerica'], bt: ['Ver equipos', '#filtros'], ico: '💳' });
    sl.push({ et: 'Envíos', h: 'Te lo llevamos a <span>todo el país</span>',
      p: 'Envíos a todos los departamentos de El Salvador. O retíralo en tienda: 7a Av. Norte 2-9, Santa Tecla, de lunes a sábado de 8 am a 5 pm.',
      bt: ['Escríbenos', WA], ico: '🚚' });
    sl.push({ et: 'Servicio técnico', h: '¿Se te arruinó el celular? <span>Lo reparamos.</span>',
      p: 'Pantallas, baterías y más, con garantía en la reparación.',
      bt: ['Ver precios', 'servicio.html'], ico: '🛠️' });

    var css = document.createElement('style'); css.textContent = CSS; document.head.appendChild(css);
    var raiz = document.createElement('div'); raiz.className = 'nt'; raiz.setAttribute('aria-roledescription', 'carrusel');
    raiz.innerHTML = '<div class="nt-pista">' + sl.map(function (s, i) {
      var vis = s.img ? '<div class="nt-img"><img src="' + s.img + '" alt=""></div>' : '<div class="nt-img nt-ico" aria-hidden="true">' + s.ico + '</div>';
      return '<div class="nt-sl" role="group" aria-label="' + (i + 1) + ' de ' + sl.length + '"><div class="nt-tx">' +
        '<span class="nt-et">' + s.et + '</span><h2>' + s.h + '</h2><p>' + s.p + '</p>' +
        (s.bancos ? '<div class="nt-bancos">' + s.bancos.map(function (b) { return '<span>' + b + '</span>'; }).join('') + '</div>' : '') +
        '<a class="nt-bt" href="' + s.bt[1] + '"' + (/^https?:/.test(s.bt[1]) ? ' target="_blank" rel="noopener"' : '') + '>' + s.bt[0] + ' →</a>' +
        '</div>' + vis + '</div>';
    }).join('') + '</div><div class="nt-pie"><div class="nt-pts">' +
      sl.map(function (_, i) { return '<button type="button" aria-label="Ir a la noticia ' + (i + 1) + '"></button>'; }).join('') +
      '</div><div class="nt-fl"><button type="button" aria-label="Anterior">‹</button><button type="button" aria-label="Siguiente">›</button></div></div>';

    portada.innerHTML = '';
    portada.appendChild(raiz);
    if (mostrando) { mostrando.style.marginTop = '14px'; portada.appendChild(mostrando); }

    var pista = raiz.querySelector('.nt-pista'), pts = raiz.querySelectorAll('.nt-pts button'), act = 0, timer = null;
    function ir(i) {
      act = (i + sl.length) % sl.length;
      pista.style.transform = 'translateX(' + (-100 * act) + '%)';
      pts.forEach(function (b, k) { b.setAttribute('aria-current', k === act ? 'true' : 'false'); });
    }
    function auto() { clearInterval(timer); timer = setInterval(function () { ir(act + 1); }, 6000); }
    pts.forEach(function (b, k) { b.onclick = function () { ir(k); auto(); }; });
    var fl = raiz.querySelectorAll('.nt-fl button');
    fl[0].onclick = function () { ir(act - 1); auto(); };
    fl[1].onclick = function () { ir(act + 1); auto(); };
    raiz.addEventListener('mouseenter', function () { clearInterval(timer); });
    raiz.addEventListener('mouseleave', auto);
    var x0 = null;
    raiz.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; clearInterval(timer); }, { passive: true });
    raiz.addEventListener('touchend', function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) ir(act + (dx < 0 ? 1 : -1)); auto();
    }, { passive: true });
    document.addEventListener('visibilitychange', function () { if (document.hidden) clearInterval(timer); else auto(); });
    ir(0); auto();
  }

  // Espera a que el catálogo pinte los equipos (para saber qué es lo más nuevo)
  var intentos = 0;
  (function esperar() {
    if (document.querySelector('.prod') || intentos++ > 40) { try { iniciar(); } catch (e) {} return; }
    setTimeout(esperar, 150);
  })();
})();
