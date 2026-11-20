// Ficha del equipo: ventana de detalle con foto grande, datos claros y forma de pago.
// Reemplaza la ventana de detalle anterior (abrirModelo). Se carga al final de index.html.
(function () {
  if (typeof window.abrirModelo !== 'function' || !document.getElementById('modalDet')) return;

  var CSS = '' +
    '#modalDet .modal.fe{max-width:980px;width:100%}' +
    '.fe-cab{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;padding:18px 22px 14px;border-bottom:1px solid var(--linea)}' +
    '.fe-kick{display:block;font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--suave);margin-bottom:4px}' +
    '.fe-cab h3{margin:0;font-size:26px;line-height:1.1;color:var(--morado-2);letter-spacing:-.01em}' +
    '.fe-cab h3 small{display:inline;font-size:26px;color:var(--suave);font-weight:600}' +
    '.fe-cuerpo{overflow:auto;padding:20px 22px 22px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:28px}' +
    '.fe-foto{position:relative;border:1px solid var(--linea);border-radius:18px;background:linear-gradient(180deg,#FBFAFD,#F1EDF7);aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;overflow:hidden}' +
    '.fe-foto img{width:100%;height:100%;object-fit:contain;padding:9%;box-sizing:border-box;clip-path:none;transform:none;transition:opacity .2s}' +
    '.fe-foto svg{width:38%;color:#B7A9CC}' +
    '.fe-etq{position:absolute;top:12px;left:12px;font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;border-radius:999px;padding:5px 10px;background:var(--morado-suave);color:var(--morado)}' +
    '.fe-etq.nuevo{background:var(--verde);color:#fff}.fe-etq.usado{background:#FFF1CC;color:#6B4A00}' +
    '.fe-ref{font-size:11px;color:var(--suave);text-align:center;margin:8px 0 0}' +
    '.fe-colores{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:14px}' +
    '.fe-color{display:flex;flex-direction:column;align-items:center;gap:5px;border:0;background:none;cursor:pointer;padding:0;color:var(--texto);font-size:12px}' +
    '.fe-color i{width:34px;height:34px;border-radius:50%;border:1px solid rgba(0,0,0,.15);box-shadow:0 0 0 3px #fff}' +
    '.fe-color.sel i{box-shadow:0 0 0 3px #fff,0 0 0 5px var(--morado)}.fe-color.sel{font-weight:700;color:var(--morado)}' +
    '.fe-variantes{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 14px}' +
    '.fe-var{border:1px solid var(--linea);background:#fff;border-radius:12px;padding:8px 12px;cursor:pointer;text-align:left;font-size:13px;color:var(--texto)}' +
    '.fe-var b{display:block;font-size:14px}.fe-var.sel{border-color:var(--morado);background:var(--morado-suave);box-shadow:0 0 0 1px var(--morado)}' +
    '.fe-sub{font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--suave);margin:0 0 8px}' +
    '.fe-datos{display:grid;grid-template-columns:1fr 1fr;column-gap:22px;margin-bottom:18px}' +
    '.fe-dato{padding:10px 0 11px;border-bottom:1px solid var(--linea)}' +
    '.fe-dato span{display:block;font-size:12px;color:var(--suave);margin-bottom:3px}' +
    '.fe-dato b{font-size:16px;color:var(--texto)}.fe-dato b.ok{color:var(--verde)}' +
    '.fe-nota{font-size:13px;color:#6B4A00;background:#FFF6DA;border-radius:10px;padding:8px 12px;margin:-6px 0 16px}' +
    '.fe-pago{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}' +
    '.fe-op{display:flex;gap:10px;align-items:flex-start;border:1px solid var(--linea);background:#F8F7FB;border-radius:14px;padding:12px 14px;cursor:pointer}' +
    '.fe-op input{margin-top:3px;accent-color:var(--morado);width:17px;height:17px;flex:none}' +
    '.fe-op b{display:block;font-size:15px}.fe-op small{font-size:12px;color:var(--suave)}' +
    '.fe-op:has(input:checked){border-color:var(--morado);background:#fff;box-shadow:0 0 0 1px var(--morado)}' +
    '.fe-precio{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;margin-bottom:6px}' +
    '.fe-precio .tach{font-size:13px;color:var(--suave)}.fe-precio .tach s{margin-left:4px}' +
    '.fe-precio .lbl{display:block;font-weight:800;font-size:15px;color:var(--morado)}' +
    '.fe-precio .monto{font-size:38px;font-weight:900;letter-spacing:-.02em;color:var(--morado-2);line-height:1}' +
    '.fe-chk{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--suave);margin:2px 0 14px}' +
    '.fe-chk svg{width:16px;height:16px;color:var(--verde);flex:none}' +
    '.fe-cuotas{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:4px 0 14px}' +
    '.fe-cuota{border:1px solid var(--linea);border-radius:10px;padding:7px 8px;text-align:center;font-size:12px;color:var(--suave)}' +
    '.fe-cuota b{display:block;font-size:15px;color:var(--texto)}' +
    '.fe-acc{display:grid;grid-template-columns:1fr 1fr;gap:10px}' +
    '.fe-bt{display:flex;align-items:center;justify-content:center;gap:8px;border:0;border-radius:14px;padding:15px 14px;font-weight:800;font-size:15px;cursor:pointer;text-decoration:none}' +
    '.fe-bt.wa{background:var(--verde);color:#fff}.fe-bt.add{background:var(--morado);color:#fff}.fe-bt.en{background:var(--morado-suave);color:var(--morado)}' +
    '.fe-bt svg{width:18px;height:18px}' +
    '.fe-incluye{display:flex;flex-wrap:wrap;gap:6px 16px;margin:16px 0 0;padding:12px 0 0;border-top:1px solid var(--linea);font-size:13px;color:#3C3645}' +
    '.fe-incluye span{display:inline-flex;align-items:center;gap:6px}.fe-incluye svg{width:16px;height:16px;color:var(--morado)}' +
    '.fe-pie{font-size:12px;color:var(--suave);text-align:center;margin:12px 0 0}' +
    '.fe-link{border:0;background:none;color:var(--morado);font-weight:700;font-size:13px;text-decoration:underline;cursor:pointer;padding:0}' +
    '@media (max-width:760px){.fe-cuerpo{grid-template-columns:1fr;gap:16px;padding:14px 16px 18px}.fe-cab{padding:14px 16px 12px}' +
    '.fe-cab h3,.fe-cab h3 small{font-size:21px}.fe-foto{aspect-ratio:auto;height:260px}.fe-precio .monto{font-size:32px}.fe-acc{grid-template-columns:1fr}}';
  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  function svg(p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'; }
  var I_CHK = svg('<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/>');
  var I_WA = svg('<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20z"/>');
  var I_ESC = svg('<path d="M12 3l7 3v5c0 4.5-3 8.3-7 9.5C8 19.3 5 15.5 5 11V6l7-3z"/>');
  var I_CARG = svg('<path d="M9 3v4M15 3v4M7 7h10v3a5 5 0 0 1-10 0V7zM12 15v6"/>');
  var I_RED = svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>');

  // Estado según la categoría: Nuevo / Seminuevo / Usado en buen estado
  function estado(k) {
    k = String(k || '').trim();
    if (/^nuevo/i.test(k)) return 'Nuevo';
    if (/^(a\+?|open ?box)$/i.test(k)) return 'Seminuevo';
    if (/^b\+?$/i.test(k)) return 'Usado en buen estado';
    return '';
  }
  // Garantía: Apple nuevo 1 año; lo demás 3 meses
  function garantia(o) { return /iphone|ipad|apple/i.test(o.m) && estado(o.k) === 'Nuevo' ? '1 año' : '3 meses'; }

  var sel = {}; // por modelo: { c: color, id: variante, pago: 'contado'|'tasa' }

  function opcionesColor(md, c) { return md.ops.filter(function (o) { return o.c === c; }); }

  function pintarFicha(k) {
    var md = modelos.find(function (x) { return x.k === k; }); if (!md) return;
    window.modeloAbierto = k;
    var colores = []; md.ops.forEach(function (o) { if (colores.indexOf(o.c) < 0) colores.push(o.c); });
    var s = sel[k] || (sel[k] = { pago: 'contado' });
    if (colores.indexOf(s.c) < 0) s.c = colores.find(function (c) { return fotoColor(md.m, c); }) || colores[0];
    var vars = opcionesColor(md, s.c);
    var o = vars.find(function (x) { return x.id === s.id; }) || vars[0]; s.id = o.id;
    var mismoPrecio = vars.every(function (x) { return x.p === o.p; });

    var foto = fotoColor(md.m, o.c);
    var est = estado(o.k);
    var etq = est ? '<span class="fe-etq' + (est === 'Nuevo' ? ' nuevo' : est === 'Usado en buen estado' ? ' usado' : '') + '">' + esc(est) + '</span>' : '';
    var enPedido = pedido[o.id] || 0;
    var tasa = s.pago === 'tasa' && o.r;

    var datos = [
      ['Capacidad', md.g], ['Color', o.c],
      ['Estado', est || '—'], ['Batería', o.b || '—'],
      ['Categoría', o.k], ['Disponibles', o.n === 1 ? 'Última unidad' : String(o.n)],
      ['Garantía', garantia(o)], ['Liberado', 'Todas las redes']
    ];

    var precioHTML;
    if (!o.p) {
      precioHTML = '<div class="fe-precio"><div><span class="lbl">Precio a consultar</span></div></div>';
    } else if (tasa) {
      var plazos = [3, 6, 12, 18, 24, 36].filter(function (m) { return BANCOS.some(function (b) { return b.max >= m; }); });
      precioHTML = '<div class="fe-precio"><div><span class="tach">Precio de contado ' + dinero(o.p) + '</span><span class="lbl">Precio regular · Tasa 0%</span></div>' +
        '<div class="monto">' + dinero(o.r) + '</div></div>' +
        '<div class="fe-cuotas">' + plazos.map(function (m) { return '<div class="fe-cuota"><b>' + dinero(o.r / m) + '</b>' + m + ' meses</div>'; }).join('') + '</div>' +
        '<div class="fe-chk">' + I_CHK + 'Con tarjeta de BAC, Agrícola, Cuscatlán o Promerica · <button type="button" class="fe-link" data-fe-calc="' + esc(o.id) + '">ver plazos por banco</button></div>';
    } else {
      precioHTML = '<div class="fe-precio"><div>' + (o.r ? '<span class="tach">Precio regular<s>' + dinero(o.r) + '</s></span>' : '') +
        '<span class="lbl">Precio de contado</span></div><div class="monto">' + dinero(o.p) + '</div></div>' +
        '<div class="fe-chk">' + I_CHK + 'Pagando en efectivo o transferencia</div>';
    }

    var msg = 'Hola TecnoShopSV, me interesa este equipo:\n📱 ' + md.m + ' · ' + md.g + (est ? ' (' + est + ')' : '') +
      '\n🎨 Color: ' + o.c + ' · Categoría ' + o.k + (o.b ? ' · Batería ' + o.b : '') +
      (o.p ? '\n💵 ' + (tasa ? 'Tasa 0% con tarjeta: ' + dinero(o.r) : 'Precio de contado: ' + dinero(o.p)) : '') +
      '\n¿Sigue disponible?';

    var m = document.querySelector('#modalDet .modal');
    m.classList.add('fe');
    m.innerHTML =
      '<div class="fe-cab"><div><span class="fe-kick">Detalles del equipo</span><h3 id="detTit">' + esc(md.m) + ' <small>· ' + esc(md.g) + '</small></h3></div>' +
      '<button class="cerrar" data-cerrar="modalDet" aria-label="Cerrar">×</button></div>' +
      '<div class="fe-cuerpo">' +
      '<div><div class="fe-foto">' + (foto ? '<img src="' + foto + '" alt="' + esc(md.m + ' ' + o.c) + '">' : fotoDe(md.m)) + etq + '</div>' +
      '<p class="fe-ref">Foto de referencia del modelo y color</p>' +
      (colores.length > 1 ? '<div class="fe-colores">' + colores.map(function (c) {
        return '<button type="button" class="fe-color' + (c === o.c ? ' sel' : '') + '" data-fe-color="' + esc(c) + '"><i style="background:' + colorDe(c) + '"></i>' + esc(c) + '</button>';
      }).join('') + '</div>' : '') + '</div>' +
      '<div>' +
      (vars.length > 1 ? '<p class="fe-sub">Elige una opción en ' + esc(o.c) + '</p><div class="fe-variantes">' + vars.map(function (v) {
        return '<button type="button" class="fe-var' + (v.id === o.id ? ' sel' : '') + '" data-fe-var="' + esc(v.id) + '"><b>' + (mismoPrecio ? 'Categoría ' + esc(v.k) : (v.p ? dinero(v.p) : 'Consultar')) + '</b>' +
          esc((mismoPrecio ? '' : 'Cat. ' + v.k) + (v.b ? (mismoPrecio ? '' : ' · ') + 'Batería ' + v.b : '')) + '</button>';
      }).join('') + '</div>' : '') +
      '<div class="fe-datos">' + datos.map(function (d) {
        return '<div class="fe-dato"><span>' + d[0] + '</span><b' + (d[0] === 'Batería' && parseInt(d[1]) >= 90 ? ' class="ok"' : '') + '>' + esc(d[1]) + '</b></div>';
      }).join('') + '</div>' +
      (o.o ? '<div class="fe-nota">📝 ' + esc(o.o) + '</div>' : '') +
      (o.p && o.r ? '<p class="fe-sub">¿Cómo quieres pagar?</p><div class="fe-pago">' +
        '<label class="fe-op"><input type="radio" name="fePago" value="contado"' + (!tasa ? ' checked' : '') + '><div><b>Al contado</b><small>Efectivo o transferencia</small></div></label>' +
        '<label class="fe-op"><input type="radio" name="fePago" value="tasa"' + (tasa ? ' checked' : '') + '><div><b>Tasa 0%</b><small>Con tarjeta, precio regular</small></div></label></div>' : '') +
      precioHTML +
      '<div class="fe-acc">' +
      '<a class="fe-bt wa" target="_blank" rel="noopener" href="' + linkWA(msg) + '">' + I_WA + 'Consultar este equipo</a>' +
      (!o.p ? '' : enPedido
        ? '<button type="button" class="fe-bt en" data-fe-verpedido="1">✓ En tu pedido (' + enPedido + ') · Ver</button>'
        : '<button type="button" class="fe-bt add" data-mas="' + esc(o.id) + '">Agregar al pedido</button>') +
      '</div>' +
      '<div class="fe-incluye"><span>' + I_ESC + 'Garantía de ' + garantia(o) + '</span><span>' + I_CARG + 'Cargador original</span><span>' + I_RED + 'Liberado</span></div>' +
      '<p class="fe-pie">Confirmamos el estado y la disponibilidad contigo antes de la compra.</p>' +
      '</div></div>';
    $('modalDet').hidden = false;
  }

  window.abrirModelo = function (k) { pintarFicha(k); };

  document.addEventListener('click', function (e) {
    var t = e.target, k = window.modeloAbierto, s = sel[k];
    if (!t.closest || !t.closest('#modalDet') || !s) return;
    var c = t.closest('[data-fe-color]'); if (c) { s.c = c.getAttribute('data-fe-color'); s.id = null; pintarFicha(k); return; }
    var v = t.closest('[data-fe-var]'); if (v) { s.id = v.getAttribute('data-fe-var'); pintarFicha(k); return; }
    var calc = t.closest('[data-fe-calc]'); if (calc) { $('modalDet').hidden = true; abrirCuotas(calc.getAttribute('data-fe-calc')); return; }
    if (t.closest('[data-fe-verpedido]')) { $('modalDet').hidden = true; $('verPedido').click(); }
  });
  document.addEventListener('change', function (e) {
    if (e.target.name !== 'fePago') return;
    var k = window.modeloAbierto; if (!sel[k]) return;
    sel[k].pago = e.target.value; pintarFicha(k);
  });
})();
