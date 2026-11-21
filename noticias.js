// Portada tipo noticias: reemplaza el banner fijo por un carrusel que cambia solo.
// Para cambiar textos, edita la lista "sl" más abajo. Si algo falla, se queda el banner original.
(function () {
  var WA = 'https://wa.me/50372427154';
  var F = 'fotos/';
  var IC = {
    escudo: '<path d="M12 3l7 3v5c0 4.5-3 8.3-7 9.5C8 19.3 5 15.5 5 11V6l7-3z"/><path d="M9 11.5l2 2 4-4"/>',
    rayo: '<path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z"/>',
    caja: '<path d="M3 8l9-5 9 5v8l-9 5-9-5V8z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
    camion: '<path d="M2 7h11v9H2zM13 10h4l3 3v3h-7"/><circle cx="6" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
    tienda: '<path d="M4 10h16v10H4zM3 10l2-6h14l2 6"/><path d="M10 20v-5h4v5"/>',
    chat: '<path d="M4 5h16v11H8l-4 4V5z"/>',
    pantalla: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    bateria: '<rect x="3" y="7" width="16" height="10" rx="2"/><path d="M21 11v2M6 10v4M9 10v4"/>',
    puerto: '<path d="M8 3v5M16 3v5M6 8h12v3a6 6 0 0 1-12 0V8zM12 17v4"/>',
    reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
  };
  function ic(n) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + IC[n] + '</svg>'; }

  var CSS = '' +
    '.nt{position:relative;overflow:hidden;margin:-6px 0 0}' +
    '.nt-pista{display:flex;transition:transform .7s cubic-bezier(.22,.8,.3,1)}' +
    '.nt-sl{flex:0 0 100%;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);align-items:center;gap:36px;min-height:300px;box-sizing:border-box;padding:6px 2px}' +
    '.nt-kick{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#FFC52E;margin-bottom:14px}' +
    '.nt-kick:before{content:"";width:22px;height:2px;background:#FFC52E;border-radius:2px}' +
    '.nt h1,.nt h2{font-size:clamp(28px,4vw,48px);line-height:1.04;letter-spacing:-.02em;margin:0 0 14px;color:#fff;font-weight:800}' +
    '.nt h1 em,.nt h2 em{font-style:normal;color:#FFC52E}' +
    '.nt-sub{margin:0 0 20px;color:rgba(255,255,255,.78);font-size:clamp(14px,1.5vw,17px);line-height:1.5;max-width:520px}' +
    '.nt-acc{display:flex;align-items:center;gap:18px;flex-wrap:wrap}' +
    '.nt-bt{display:inline-flex;align-items:center;gap:10px;background:#FFC52E;color:#2a0f4a;font-weight:800;border-radius:12px;padding:13px 20px;text-decoration:none;font-size:15px;box-shadow:0 10px 24px -10px rgba(255,197,46,.7);transition:transform .2s,box-shadow .2s}' +
    '.nt-bt:hover{transform:translateY(-1px);box-shadow:0 14px 28px -10px rgba(255,197,46,.85)}' +
    '.nt-bt svg{width:18px;height:18px}' +
    '.nt-lk{color:#fff;font-weight:600;font-size:14px;text-decoration:none;border-bottom:1px solid rgba(255,255,255,.35);padding-bottom:2px}' +
    '.nt-lk:hover{border-color:#FFC52E;color:#FFC52E}' +
    '.nt-chips{display:flex;flex-wrap:wrap;gap:18px;margin:0 0 22px;color:rgba(255,255,255,.85);font-size:13px;font-weight:600}' +
    '.nt-chips span{display:inline-flex;align-items:center;gap:7px}.nt-chips svg{width:17px;height:17px;color:#FFC52E}' +
    // Visuales
    '.nt-vis{position:relative;height:280px;display:flex;align-items:center;justify-content:center}' +
    '.nt-vis:before{content:"";position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(255,197,46,.28),rgba(255,197,46,0) 65%);filter:blur(4px)}' +
    '.nt-trio{position:relative;width:320px;height:270px}' +
    '.nt-trio img{position:absolute;bottom:0;width:190px;filter:drop-shadow(0 22px 30px rgba(0,0,0,.45))}' +
    '.nt-trio img:nth-child(1){left:0;transform:rotate(-9deg) scale(.86);transform-origin:bottom center;opacity:.95}' +
    '.nt-trio img:nth-child(2){right:0;transform:rotate(9deg) scale(.86);transform-origin:bottom center;opacity:.95}' +
    '.nt-trio img:nth-child(3){left:50%;margin-left:-95px;z-index:2}' +
    '.nt-uno{position:relative;width:250px;filter:drop-shadow(0 26px 34px rgba(0,0,0,.5))}' +
    '.nt-sello{position:absolute;top:18px;right:8%;z-index:3;background:#fff;color:#2a0f4a;font-weight:800;font-size:12px;letter-spacing:.1em;text-transform:uppercase;border-radius:999px;padding:8px 14px;box-shadow:0 10px 20px rgba(0,0,0,.25)}' +
    '.nt-tarjeta{position:relative;z-index:1;width:300px;height:186px;border-radius:18px;padding:22px;box-sizing:border-box;background:linear-gradient(135deg,#FFC52E,#f59e0b 55%,#e07b00);box-shadow:0 30px 50px -18px rgba(0,0,0,.6);color:#2a0f4a;transform:rotate(-6deg)}' +
    '.nt-tarjeta b{display:block;font-size:44px;line-height:1;font-weight:900;letter-spacing:-.03em}' +
    '.nt-tarjeta small{display:block;font-weight:700;margin-top:4px;opacity:.85}' +
    '.nt-chip{position:absolute;left:22px;bottom:24px;width:42px;height:30px;border-radius:6px;background:linear-gradient(135deg,#fff6d6,#e9c46a);opacity:.9}' +
    '.nt-tarjeta i{position:absolute;right:22px;bottom:22px;font-style:normal;font-weight:800;letter-spacing:.2em;font-size:13px;opacity:.8}' +
    '.nt-bancos{display:flex;flex-wrap:wrap;gap:10px;margin:0 0 22px}' +
    '.nt-bancos span{background:#fff;border-radius:10px;height:40px;padding:0 12px;display:flex;align-items:center;box-shadow:0 6px 14px -8px rgba(0,0,0,.4)}' +
    '.nt-bancos img{max-height:24px;max-width:110px;width:auto}' +
    '.nt-pasos{position:relative;z-index:1;display:flex;flex-direction:column;gap:12px;width:300px}' +
    '.nt-paso{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(6px);border-radius:14px;padding:13px 16px;color:#fff}' +
    '.nt-paso svg{flex:0 0 auto;width:38px;height:38px;padding:8px;box-sizing:border-box;border-radius:10px;background:rgba(255,197,46,.16);color:#FFC52E}' +
    '.nt-paso b{display:block;font-size:14px}.nt-paso small{display:block;color:rgba(255,255,255,.7);font-size:12px;margin-top:2px}' +
    '.nt-paso:nth-child(2){margin-left:22px}.nt-paso:nth-child(3){margin-left:44px}' +
    '.nt-rep{position:relative;z-index:1;display:grid;grid-template-columns:repeat(2,140px);gap:12px}' +
    '.nt-rep div{background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.16);border-radius:16px;padding:16px;color:#fff}' +
    '.nt-rep svg{width:30px;height:30px;color:#FFC52E;display:block;margin-bottom:10px}' +
    '.nt-rep b{font-size:14px}.nt-rep div:last-child{background:#FFC52E;color:#2a0f4a;border-color:#FFC52E}.nt-rep div:last-child svg{color:#2a0f4a}' +
    // Pie
    '.nt-pie{display:flex;align-items:center;gap:18px;margin-top:8px}' +
    '.nt-bar{flex:1 1 auto;display:flex;gap:6px;max-width:420px}' +
    '.nt-bar button{flex:1 1 0;height:4px;border:0;border-radius:4px;background:rgba(255,255,255,.22);padding:0;cursor:pointer;position:relative;overflow:hidden}' +
    '.nt-bar button i{position:absolute;inset:0;width:0;background:#FFC52E;border-radius:4px}' +
    '.nt-bar button.ya i{width:100%}' +
    '.nt-bar button.act i{animation:ntbar var(--nt-t,7s) linear forwards}' +
    '.nt.pausa .nt-bar button.act i{animation-play-state:paused}' +
    '@keyframes ntbar{from{width:0}to{width:100%}}' +
    '.nt-num{color:rgba(255,255,255,.6);font-size:13px;font-weight:600;font-variant-numeric:tabular-nums;min-width:44px}' +
    '.nt-fl{display:flex;gap:8px;margin-left:auto}' +
    '.nt-fl button{width:40px;height:40px;border-radius:12px;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.06);color:#fff;font-size:20px;line-height:1;cursor:pointer;transition:background .2s}' +
    '.nt-fl button:hover{background:rgba(255,255,255,.16)}' +
    '@media (max-width:760px){.nt-sl{grid-template-columns:1fr;gap:4px;min-height:0}.nt-vis{display:none}.nt-sl{padding-bottom:6px}.nt-fl{display:none}.nt-bar{max-width:none}}' +
    '@media (prefers-reduced-motion:reduce){.nt-pista{transition:none}.nt-bar button.act i{animation:none;width:100%}}';

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
    // Logos de bancos que ya usa la página
    var logos = [];
    document.querySelectorAll('.banco img').forEach(function (i) { if (logos.length < 4 && logos.indexOf(i.getAttribute('src')) < 0) logos.push(i.getAttribute('src')); });

    var mes = new Date().toLocaleDateString('es-SV', { month: 'long', year: 'numeric' });
    var sl = [];
    sl.push({ k: 'Catálogo de ' + mes, h: 'Tu próximo celular, <em>garantizado.</em>',
      s: 'iPhone y Samsung nuevos y seminuevos, revisados uno por uno y liberados para cualquier compañía.',
      chips: [['escudo', '3 meses de garantía'], ['rayo', 'Cargador original'], ['caja', 'Envíos a todo el país']],
      bt: ['Ver equipos', '#filtros'],
      vis: '<div class="nt-trio"><img src="' + F + 'samsung-s24-ultra--negro.webp" alt=""><img src="' + F + 'iphone-16-pro-max--dorado.webp" alt=""><img src="' + F + 'iphone-17-pro-max--anaranjado.webp" alt=""></div>' });
    if (nuevo && nuevo.src) sl.push({ k: 'Recién llegado', h: 'Ya está aquí el <em>' + nuevo.nombre + '</em>',
      s: 'Lo más nuevo de Apple, disponible para entrega inmediata. Pregúntanos por colores y capacidades.',
      bt: ['Me interesa', WA + '?text=' + encodeURIComponent('Hola, me interesa el ' + nuevo.nombre)], lk: ['Ver todos los iPhone', '#filtros'],
      vis: '<span class="nt-sello">Nuevo</span><img class="nt-uno" src="' + nuevo.src + '" alt="' + nuevo.nombre + '">' });
    sl.push({ k: 'Pago con tarjeta', h: 'Llévatelo hoy a <em>Tasa 0%</em>',
      s: 'Divide el pago de tu celular en meses con tu tarjeta de crédito de estos bancos:',
      bancos: logos, bt: ['Ver equipos', '#filtros'],
      vis: '<div class="nt-tarjeta"><b>0%</b><small>Tasa 0% con tarjeta</small><span class="nt-chip"></span><i>TECNOSHOPSV</i></div>' });
    sl.push({ k: 'Envíos', h: 'Te lo llevamos a <em>todo el país</em>',
      s: 'Pide por WhatsApp y recíbelo en tu casa, o pasa por él a nuestra tienda en Santa Tecla.',
      bt: ['Pedir por WhatsApp', WA], lk: ['7a Av. Norte 2-9, Santa Tecla', 'https://maps.google.com/?q=TecnoShopSV+Santa+Tecla'],
      vis: '<div class="nt-pasos"><div class="nt-paso">' + ic('chat') + '<div><b>Haz tu pedido</b><small>Por WhatsApp, en minutos</small></div></div>' +
        '<div class="nt-paso">' + ic('camion') + '<div><b>Lo enviamos</b><small>A cualquier departamento</small></div></div>' +
        '<div class="nt-paso">' + ic('tienda') + '<div><b>O retíralo en tienda</b><small>Lunes a sábado, 8 am a 5 pm</small></div></div></div>' });
    sl.push({ k: 'Servicio técnico', h: 'Reparamos tu celular <em>con garantía</em>',
      s: 'Técnicos especializados en iPhone y Samsung. Consulta precios y tiempos antes de traerlo.',
      bt: ['Ver precios', 'servicio.html'], lk: ['Consultar por WhatsApp', WA],
      vis: '<div class="nt-rep"><div>' + ic('pantalla') + '<b>Pantallas</b></div><div>' + ic('bateria') + '<b>Baterías</b></div>' +
        '<div>' + ic('puerto') + '<b>Puertos de carga</b></div><div>' + ic('escudo') + '<b>Con garantía</b></div></div>' });

    var css = document.createElement('style'); css.textContent = CSS; document.head.appendChild(css);
    var ext = function (u) { return /^https?:/.test(u) ? ' target="_blank" rel="noopener"' : ''; };
    var raiz = document.createElement('div'); raiz.className = 'nt'; raiz.setAttribute('aria-roledescription', 'carrusel');
    raiz.innerHTML = '<div class="nt-pista">' + sl.map(function (s, i) {
      return '<div class="nt-sl" role="group" aria-label="' + (i + 1) + ' de ' + sl.length + '"><div>' +
        '<div class="nt-kick">' + s.k + '</div>' + (i ? '<h2>' : '<h1>') + s.h + (i ? '</h2>' : '</h1>') + '<p class="nt-sub">' + s.s + '</p>' +
        (s.chips ? '<div class="nt-chips">' + s.chips.map(function (c) { return '<span>' + ic(c[0]) + c[1] + '</span>'; }).join('') + '</div>' : '') +
        (s.bancos && s.bancos.length ? '<div class="nt-bancos">' + s.bancos.map(function (b) { return '<span><img src="' + b + '" alt=""></span>'; }).join('') + '</div>' : '') +
        '<div class="nt-acc"><a class="nt-bt" href="' + s.bt[1] + '"' + ext(s.bt[1]) + '>' + s.bt[0] +
        ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>' +
        (s.lk ? '<a class="nt-lk" href="' + s.lk[1] + '"' + ext(s.lk[1]) + '>' + s.lk[0] + '</a>' : '') + '</div>' +
        '</div><div class="nt-vis">' + s.vis + '</div></div>';
    }).join('') + '</div><div class="nt-pie"><span class="nt-num"></span><div class="nt-bar">' +
      sl.map(function (_, i) { return '<button type="button" aria-label="Ir a la noticia ' + (i + 1) + '"><i></i></button>'; }).join('') +
      '</div><div class="nt-fl"><button type="button" aria-label="Anterior">‹</button><button type="button" aria-label="Siguiente">›</button></div></div>';

    portada.innerHTML = '';
    portada.appendChild(raiz);
    if (mostrando) { mostrando.style.marginTop = '16px'; portada.appendChild(mostrando); }

    var T = 7000, pista = raiz.querySelector('.nt-pista'), bar = raiz.querySelectorAll('.nt-bar button'), num = raiz.querySelector('.nt-num'), act = 0, timer = null;
    raiz.style.setProperty('--nt-t', (T / 1000) + 's');
    function ir(i) {
      act = (i + sl.length) % sl.length;
      pista.style.transform = 'translateX(' + (-100 * act) + '%)';
      bar.forEach(function (b, k) { b.className = k < act ? 'ya' : ''; var x = b.querySelector('i'); x.style.animation = 'none'; void x.offsetWidth; x.style.animation = ''; });
      bar[act].className = 'act';
      num.textContent = String(act + 1).padStart(2, '0') + ' / ' + String(sl.length).padStart(2, '0');
    }
    function auto() { clearTimeout(timer); timer = setTimeout(function paso() { ir(act + 1); timer = setTimeout(paso, T); }, T); }
    bar.forEach(function (b, k) { b.onclick = function () { ir(k); auto(); }; });
    var fl = raiz.querySelectorAll('.nt-fl button');
    fl[0].onclick = function () { ir(act - 1); auto(); };
    fl[1].onclick = function () { ir(act + 1); auto(); };
    raiz.addEventListener('mouseenter', function () { clearTimeout(timer); raiz.classList.add('pausa'); });
    raiz.addEventListener('mouseleave', function () { raiz.classList.remove('pausa'); ir(act); auto(); });
    var x0 = null;
    raiz.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    raiz.addEventListener('touchend', function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { ir(act + (dx < 0 ? 1 : -1)); auto(); }
    }, { passive: true });
    document.addEventListener('visibilitychange', function () { if (document.hidden) clearTimeout(timer); else { ir(act); auto(); } });
    ir(0); auto();
  }

  // Espera a que el catálogo pinte los equipos (para saber qué es lo más nuevo)
  var intentos = 0;
  (function esperar() {
    if (document.querySelector('.prod') || intentos++ > 40) { try { iniciar(); } catch (e) {} return; }
    setTimeout(esperar, 150);
  })();
})();
