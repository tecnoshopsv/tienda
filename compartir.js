// Compartir equipos y mensajes de WhatsApp más claros.
// - Botón "compartir" en cada tarjeta y en la ficha del equipo (enlace directo al modelo).
// - Al abrir tecnoshopsv.com/?equipo=<modelo> se abre la ficha de ese modelo.
// - Mensajes de WhatsApp ordenados: ficha del equipo (contado o Tasa 0%) y calculadora de Tasa 0%.
(function () {
  if (typeof window.pintar !== 'function') return;
  var SITIO = 'https://tecnoshopsv.com/';

  function slug(s) { return norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function enlace(md) { return SITIO + '?equipo=' + slug(md.k); }
  function estado(k) {
    k = String(k || '').trim();
    if (/^nuevo/i.test(k)) return 'Nuevo';
    if (/^(a\+?|open ?box)$/i.test(k)) return 'Seminuevo';
    if (/^b\+?$/i.test(k)) return 'Usado en buen estado';
    return '';
  }

  var CSS = '' +
    '.prod{position:relative}' +
    '.cp-bt{position:absolute;top:10px;right:10px;z-index:3;width:38px;height:38px;border-radius:50%;border:1px solid #E8E4EE;background:rgba(255,255,255,.95);color:#4B1F7A;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 12px rgba(43,15,76,.12);transition:transform .15s,background .15s}' +
    '.cp-bt:hover{background:#F3EEFA;transform:scale(1.06)}.cp-bt svg{width:18px;height:18px}' +
    '.fe-cab .cp-fe{display:inline-flex;align-items:center;gap:6px;border:1px solid #E8E4EE;background:#fff;color:#4B1F7A;font-weight:700;font-size:14px;border-radius:999px;padding:8px 14px;cursor:pointer;margin-right:8px}' +
    '.fe-cab .cp-fe svg{width:16px;height:16px}.fe-cab .cp-fe:hover{background:#F3EEFA}' +
    '.fe-cab > div:last-child{display:flex;align-items:center}' +
    '@media (max-width:520px){.fe-cab .cp-fe span{display:none}.fe-cab .cp-fe{padding:8px 10px}}';
  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  var I_COMP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>';

  function compartir(k) {
    var md = modelos.find(function (x) { return x.k === k; }); if (!md) return;
    var url = enlace(md);
    var texto = '📱 ' + md.m + ' · ' + md.g + (md.desde ? ' desde ' + dinero(md.desde) : '') + ' en TecnoShopSV';
    if (navigator.share) {
      navigator.share({ title: md.m + ' ' + md.g + ' · TecnoShopSV', text: texto, url: url }).catch(function () {});
      return;
    }
    var hecho = function () { aviso('Enlace copiado. Pégalo donde quieras compartirlo.'); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(texto + '\n' + url).then(hecho, function () { prompt('Copia este enlace:', url); });
    else prompt('Copia este enlace:', url);
  }

  // Botón en cada tarjeta
  function ponerBotones() {
    document.querySelectorAll('.prod').forEach(function (p) {
      if (p.querySelector('.cp-bt')) return;
      var f = p.querySelector('[data-modelo]'); if (!f) return;
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'cp-bt'; b.setAttribute('aria-label', 'Compartir este equipo'); b.title = 'Compartir';
      b.setAttribute('data-compartir', f.getAttribute('data-modelo')); b.innerHTML = I_COMP;
      p.appendChild(b);
    });
  }
  var pintarBase = window.pintar;
  window.pintar = function () { pintarBase.apply(this, arguments); ponerBotones(); };
  ponerBotones();

  // Botón en la ficha del equipo (se vuelve a poner cada vez que la ficha se redibuja)
  var det = document.getElementById('modalDet');
  function botonFicha() {
    var cab = det && det.querySelector('.fe-cab'), k = window.modeloAbierto;
    if (!cab || !k || cab.querySelector('.cp-fe')) return;
    var cerrar = cab.querySelector('.cerrar'); if (!cerrar) return;
    var box = document.createElement('div');
    box.innerHTML = '<button type="button" class="cp-fe" data-compartir="' + esc(k) + '">' + I_COMP + '<span>Compartir</span></button>';
    cerrar.parentNode.insertBefore(box, cerrar); box.appendChild(cerrar);
  }
  // Mensaje de "Consultar este equipo" en la ficha (contado o Tasa 0%), leído de lo que muestra la ficha
  function arreglarFicha() {
    var a = det && det.querySelector('a.fe-bt.wa'), k = window.modeloAbierto; if (!a || !k) return;
    var md = modelos.find(function (x) { return x.k === k; }); if (!md) return;
    var d = {}; det.querySelectorAll('.fe-dato').forEach(function (x) { var s = x.querySelector('span'), v = x.querySelector('b'); if (s && v) d[s.textContent.trim()] = v.textContent.trim(); });
    var est = d['Estado'] && d['Estado'] !== '—' ? d['Estado'] : '';
    var bat = d['Batería'] && d['Batería'] !== '—' ? d['Batería'] : '';
    var monto = det.querySelector('.fe-precio .monto'), r = det.querySelector('input[name=fePago]:checked');
    var tasa = r && r.value === 'tasa';
    var precio = monto ? (tasa ? '💳 Tasa 0% con tarjeta: *' + monto.textContent.trim() + '*\n🗓️ Hasta 36 meses según el banco'
      : '💵 Precio de contado: *' + monto.textContent.trim() + '*\n(efectivo o transferencia)') : '💵 Precio: a consultar';
    a.href = linkWA('Hola TecnoShopSV 👋 Me interesa este equipo:\n\n' +
      '📱 *' + md.m + ' · ' + md.g + '*' + (est ? ' (' + est + ')' : '') + '\n' +
      (d['Color'] ? '🎨 Color: ' + d['Color'] + '\n' : '') +
      (d['Categoría'] ? '🏷️ Categoría: ' + d['Categoría'] + (bat ? ' · 🔋 Batería: ' + bat : '') + '\n' : '') +
      '\n' + precio + '\n\n🔗 ' + enlace(md) + '\n\n¿Está disponible?');
  }
  if (det && window.MutationObserver) new MutationObserver(function () { botonFicha(); arreglarFicha(); }).observe(det, { childList: true, subtree: true });

  // Los clics de compartir no deben abrir la ficha
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-compartir]'); if (!b) return;
    e.preventDefault(); e.stopPropagation();
    compartir(b.getAttribute('data-compartir'));
  }, true);

  // Abrir la ficha cuando llega un enlace ?equipo=...
  var pedido = new URLSearchParams(location.search).get('equipo');
  if (pedido) {
    var intentos = 0;
    (function buscar() {
      var md = modelos.find(function (x) { return slug(x.k) === pedido; });
      if (md) {
        var card = document.querySelector('[data-modelo="' + md.k.replace(/"/g, '\\"') + '"]');
        if (card) card.scrollIntoView({ block: 'center' });
        window.abrirModelo(md.k);
        return;
      }
      if (intentos++ < 60) return setTimeout(buscar, 250);
      if (window.aviso) aviso('Ese equipo ya no está disponible. Mira los que tenemos hoy.');
    })();
  }

  // Mensaje de WhatsApp de la calculadora de Tasa 0%
  function mensajeTasa(o, meses, banco) {
    var md = modelos.find(function (x) { return x.m === o.m && x.g === o.g; });
    var est = estado(o.k);
    return 'Hola TecnoShopSV 👋 Quiero este equipo a *Tasa 0%*:\n\n' +
      '📱 *' + o.m + ' · ' + o.g + '*' + (est ? ' (' + est + ')' : '') + '\n' +
      '🎨 Color: ' + o.c + '\n' +
      '🏷️ Categoría: ' + o.k + (o.b ? ' · 🔋 Batería: ' + o.b : '') + '\n\n' +
      '💳 Banco: ' + banco.n + '\n' +
      '🗓️ Plazo: ' + meses + ' meses · *' + dinero(o.r / meses) + '* al mes (aprox.)\n' +
      '💵 Total: *' + dinero(o.r) + '*\n' +
      (md ? '\n🔗 ' + enlace(md) + '\n' : '') +
      '\n¿Está disponible?';
  }
  function arreglarCalculadora() {
    var o = porId[$('cuoEquipo').value], a = document.querySelector('#cuoRes a.btn-wa'); if (!o || !a) return;
    var meses = +$('cuoPlazo').value || 12, banco = BANCOS[+$('cuoBanco').value] || BANCOS[0];
    a.href = linkWA(mensajeTasa(o, meses, banco));
  }
  if (typeof window.calcularCuotas === 'function') {
    var calcBase = window.calcularCuotas;
    window.calcularCuotas = function () { calcBase.apply(this, arguments); arreglarCalculadora(); };
  }
  ['cuoEquipo', 'cuoBanco', 'cuoPlazo'].forEach(function (id) { var el = $(id); if (el) el.addEventListener('change', arreglarCalculadora); });
  // Mensaje del pedido (carrito) con el mismo formato
  var btnPedido = $('enviarPedido');
  if (btnPedido && typeof totales === 'function') {
    btnPedido.addEventListener('click', function (e) {
      e.preventDefault(); e.stopImmediatePropagation();
      var t = totales(); if (!t.ls.length) return;
      var nombre = $('pedNombre').value.trim(), dir = $('pedDir').value.trim(), ent = entrega(), pago = formaPago();
      guardar('ts_tienda_cliente', { nombre: nombre, dir: dir });
      var meses = +$('pedPlazo').value || 12, banco = BANCOS[+$('pedBanco').value] || BANCOS[0];
      var txtPago = pago === 'contado' ? 'Efectivo o transferencia (precio de contado)' : pago === 'tarjeta' ? 'Tarjeta, un solo pago' : 'Tasa 0% con ' + banco.n + ' a ' + meses + ' meses';
      var txtEnt = ent === 'tienda' ? 'Retiro en tienda (Santa Tecla)' : ent === 'motorista' ? 'Motorista personalizado (llega hoy)' : 'C807 Express (llega el ' + fechaLlegada('c807') + ')';
      var lineas = t.ls.map(function (l) {
        var o = l.o, est = estado(o.k), precio = t.regular ? o.r : o.p;
        return '• *' + o.m + ' · ' + o.g + '*' + (est ? ' (' + est + ')' : '') + '\n' +
          '   🎨 ' + o.c + ' · 🏷️ Cat. ' + o.k + (o.b ? ' · 🔋 ' + o.b : '') + '\n' +
          '   💵 ' + (l.n > 1 ? l.n + ' × ' + dinero(precio) + ' = ' + dinero(precio * l.n) : dinero(precio));
      }).join('\n\n');
      var msg = 'Hola TecnoShopSV 👋 Quiero hacer este pedido:\n' +
        (nombre ? '👤 ' + nombre + '\n' : '') +
        '\n🛒 *' + (t.n === 1 ? '1 equipo' : t.n + ' equipos') + '*\n' + lineas + '\n\n' +
        '💳 Pago: ' + txtPago + '\n' +
        '🚚 Entrega: ' + txtEnt + '\n' +
        (ent !== 'tienda' && dir ? '📍 Dirección: ' + dir + '\n' : '') +
        (t.envio ? '📦 Envío: ' + dinero(t.envio) + '\n' : '') +
        '\n💰 *Total: ' + dinero(t.total) + '*' + (ent === 'motorista' ? ' + envío según zona' : '') + '\n' +
        (pago === 'cuotas' ? '🗓️ Aprox. *' + dinero(t.total / meses) + '* al mes\n' : '') +
        '\n¿Me confirman la disponibilidad?';
      window.open(linkWA(msg), '_blank');
    }, true);
  }
})();
