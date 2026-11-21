// Menú de navegación del sitio: Equipos, Reparaciones, Gadgets, Garantía, Contacto + buscar y pedido.
// Se carga en todas las páginas. Para agregar o quitar una sección, edita la lista MENU.
(function () {
  var MENU = [
    ['Equipos', '/', 'equipos'],
    ['Reparaciones', '/servicio', 'servicio'],
    ['Gadgets', '/gadgets', 'gadgets'],
    ['Garantía', '/garantia', 'garantia'],
    ['Contacto', '/contacto', 'contacto']
  ];
  var cab = document.querySelector('header .cab');
  if (!cab || document.querySelector('.nv')) return;

  var ruta = location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  var actual = (window.PAGINA || (ruta === '/' || ruta === '/index' ? 'equipos' : ruta.slice(1)));

  var CSS = '' +
    'header .cab{gap:18px}' +
    '.nv{display:flex;align-items:center;gap:2px;margin:0 auto}' +
    '.nv a{position:relative;text-decoration:none;color:#2B0F4C;font-weight:700;font-size:15px;padding:10px 12px;border-radius:10px;white-space:nowrap;transition:background .15s,color .15s}' +
    '.nv a:hover{background:#F3EEFA;color:#4B1F7A}' +
    '.nv a.on{color:#4B1F7A}.nv a.on:after{content:"";position:absolute;left:12px;right:12px;bottom:3px;height:3px;border-radius:3px;background:#FFC52E}' +
    '.nv-ic{display:flex;align-items:center;gap:4px}' +
    '.nv-bt{position:relative;width:42px;height:42px;border:0;border-radius:12px;background:none;color:#2B0F4C;display:flex;align-items:center;justify-content:center;cursor:pointer;text-decoration:none}' +
    '.nv-bt:hover{background:#F3EEFA}.nv-bt svg{width:22px;height:22px}' +
    '.nv-n{position:absolute;top:3px;right:2px;min-width:18px;height:18px;border-radius:9px;background:#1FA855;color:#fff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;padding:0 5px;box-shadow:0 0 0 2px #fff}' +
    '.nv-n[hidden]{display:none}' +
    '.nv-menu{display:none}' +
    '.nv-panel{position:fixed;inset:0;z-index:70;background:rgba(20,10,35,.5);display:flex;justify-content:flex-end}' +
    '.nv-panel[hidden]{display:none}' +
    '.nv-hoja{background:#fff;width:min(320px,86vw);height:100%;padding:18px 16px;display:flex;flex-direction:column;gap:4px;box-shadow:-10px 0 30px rgba(0,0,0,.2)}' +
    '.nv-hoja .nv-x{align-self:flex-end;border:0;background:#F1EEF5;color:#4B1F7A;width:38px;height:38px;border-radius:50%;font-size:22px;cursor:pointer;margin-bottom:8px}' +
    '.nv-hoja a{text-decoration:none;color:#2B0F4C;font-weight:800;font-size:18px;padding:14px 12px;border-radius:12px}' +
    '.nv-hoja a.on{background:#F3EEFA;color:#4B1F7A}' +
    '.nv-hoja .nv-wa{margin-top:auto;background:#1FA855;color:#fff;text-align:center}' +
    '@media (max-width:900px){.nv{display:none}.nv-menu{display:flex}header .btn-ubi{display:none}}' +
    '@media (min-width:901px){header .btn-ubi{display:none}}';
  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  function svg(p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'; }
  var I_BUS = svg('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>');
  var I_CAR = svg('<path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2"/><circle cx="10" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/>');
  var I_MEN = svg('<path d="M4 7h16M4 12h16M4 17h16"/>');

  var links = MENU.map(function (m) { return '<a href="' + m[1] + '"' + (m[2] === actual ? ' class="on" aria-current="page"' : '') + '>' + m[0] + '</a>'; }).join('');
  var nav = document.createElement('nav'); nav.className = 'nv'; nav.setAttribute('aria-label', 'Menú principal');
  nav.innerHTML = links;
  var ic = document.createElement('div'); ic.className = 'nv-ic';
  ic.innerHTML = '<a class="nv-bt" href="/#q" data-nv-buscar aria-label="Buscar equipo">' + I_BUS + '</a>' +
    '<a class="nv-bt" href="/#pedido" data-nv-pedido aria-label="Ver mi pedido">' + I_CAR + '<span class="nv-n" hidden></span></a>' +
    '<button type="button" class="nv-bt nv-menu" aria-label="Abrir menú">' + I_MEN + '</button>';

  var marca = cab.querySelector('.marca');
  if (marca) { marca.href = '/'; marca.after(nav); } else cab.prepend(nav);
  var acc = cab.querySelector('.cab-acc') || cab.querySelector('#waCab');
  if (acc) acc.before(ic); else cab.appendChild(ic);

  var wa = document.getElementById('waCab');
  var panel = document.createElement('div'); panel.className = 'nv-panel'; panel.hidden = true;
  panel.innerHTML = '<div class="nv-hoja" role="dialog" aria-label="Menú"><button type="button" class="nv-x" aria-label="Cerrar">×</button>' + links +
    '<a class="nv-wa" target="_blank" rel="noopener" href="' + (wa && wa.href ? wa.href : 'https://wa.me/50372427154') + '">Escríbenos por WhatsApp</a></div>';
  document.body.appendChild(panel);
  ic.querySelector('.nv-menu').onclick = function () { panel.hidden = false; };
  panel.addEventListener('click', function (e) { if (e.target === panel || e.target.closest('.nv-x')) panel.hidden = true; });

  // Pedido: número de equipos guardados
  var nEl = ic.querySelector('.nv-n');
  function contar() {
    var p = {}; try { p = JSON.parse(localStorage.getItem('ts_tienda_pedido') || '{}') || {}; } catch (e) {}
    var n = Object.keys(p).reduce(function (s, k) { return s + (+p[k] || 0); }, 0);
    nEl.textContent = n; nEl.hidden = !n;
  }
  contar();
  if (typeof window.pintarPedido === 'function') {
    var base = window.pintarPedido;
    window.pintarPedido = function () { base.apply(this, arguments); contar(); };
  }
  window.addEventListener('storage', contar);
  setInterval(contar, 3000);

  var esInicio = !!document.getElementById('grid') && !window.PAGINA;
  function abrirPedido() {
    var b = document.getElementById('verPedido'), bp = document.getElementById('barraPedido');
    if (b && bp && !bp.hidden) { b.click(); return true; }
    return false;
  }
  function irBuscar() {
    var q = document.getElementById('q'); if (!q) return false;
    q.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(function () { q.focus(); }, 300); return true;
  }
  ic.querySelector('[data-nv-pedido]').addEventListener('click', function (e) {
    if (!esInicio) return;
    e.preventDefault();
    if (!abrirPedido() && window.aviso) window.aviso('Tu pedido está vacío. Elige un equipo para agregarlo.');
  });
  ic.querySelector('[data-nv-buscar]').addEventListener('click', function (e) {
    if (!esInicio) return;
    e.preventDefault(); irBuscar();
  });
  if (esInicio) {
    var h = location.hash;
    if (h === '#pedido') setTimeout(function () { abrirPedido(); }, 900);
    if (h === '#q') setTimeout(irBuscar, 600);
  }
})();

// Contador de visitas para el CRM (pestaña Web). Se carga en todas las páginas junto con el menú.
(function () { var s = document.createElement('script'); s.src = '/analitica.js'; s.async = true; document.body.appendChild(s); })();
