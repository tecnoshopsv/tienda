// Gadgets y servicio técnico (datos: pestaña «Gadgets» y «TABLA DE PRECIOS»)
(function(){
  var SERVICIO = window.PAGINA === 'servicio';
  var API_EXTRAS = API.replace('fn=tienda', 'fn=extras');
  var GUARDA_EX = 'ts_tienda_extras';
  var ETQ = { 'bateria': 'Batería', 'baterias': 'Baterías', 'camara trasera': 'Cámara trasera', 'camara frontal': 'Cámara frontal',
    'lente o vidrio de camara': 'Lente de cámara', 'lente de la camara': 'Lente de cámara', 'cambio de glass': 'Cambio de vidrio de pantalla',
    'cambio de cristal pantalla': 'Cambio de vidrio de pantalla', 'mojado': 'Equipo mojado (revisión)', 'no enciende': 'No enciende (revisión)',
    'wifi/bluetoot (placa)': 'WiFi/Bluetooth (placa)', 'senal chip (placa)': 'Señal / chip (placa)', 'apagados (placa)': 'No enciende (placa)',
    'auricular bocina arriba': 'Bocina de llamada', 'altavoz bocina abajo': 'Altavoz', 'tapadera/backglass': 'Tapa trasera', 'tapadera': 'Tapa trasera',
    'flex de volumen/encendido': 'Botones (volumen / encendido)', 'bocinas': 'Bocinas', 'aumento memoria': 'Aumento de memoria' };
  function etq(s){ return ETQ[norm(s)] || s; }
  function txt(v){ return String(v).replace(/\bdias\b/gi, 'días').replace(/\bdia\b/gi, 'día').replace(/(\d)\s*h\b/gi, '$1 h'); }

  var st = document.createElement('style');
  st.textContent =
    '.ex-sec{margin-top:34px;scroll-margin-top:150px}' +
    '.ex-intro{color:#6B6575;font-size:14px;margin:-2px 0 14px}' +
    '.gad .foto img{clip-path:none!important;transform:none!important;object-fit:contain;padding:10px}' +
    '.ex-vacio{background:#fff;border:1px dashed #DDD6E6;border-radius:16px;padding:22px;text-align:center;color:#6B6575}' +
    '.st-sellos{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px}' +
    '.st-sellos span{font-size:12px;font-weight:700;border-radius:999px;padding:6px 12px;background:#F3EEFA;color:#4B1F7A}' +
    '.st-lista{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:16px}' +
    '.st-item{background:#fff;border:1px solid #E8E4EE;border-radius:16px;padding:14px}' +
    '.st-item b{display:block;font-size:15px;margin-bottom:4px}.st-item span{font-size:13px;color:#6B6575}.st-item i{font-style:normal;font-size:22px;display:block;margin-bottom:6px}' +
    '.st-cot{background:linear-gradient(135deg,#1E0838,#4B1F7A);color:#fff;border-radius:20px;padding:18px}' +
    '.st-cot h3{margin:0 0 4px;font-size:18px}.st-cot p{margin:0 0 12px;font-size:13px;opacity:.85}' +
    '.st-fila{display:grid;grid-template-columns:1fr 1fr;gap:10px}' +
    '.st-cot select{width:100%;border:0;border-radius:12px;padding:11px 12px;font-size:15px;background:#fff;color:#17141C}' +
    '.st-serv{display:grid;gap:8px;margin-top:12px}' +
    '.st-op{display:flex;justify-content:space-between;align-items:center;gap:10px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:10px 12px;cursor:pointer}' +
    '.st-op input{accent-color:#FFC52E;width:18px;height:18px;flex:none}' +
    '.st-op .n{flex:1;font-size:14px;font-weight:600}' +
    '.st-op .v{font-size:13px;font-weight:800;background:#FFC52E;color:#2B0F4C;border-radius:8px;padding:4px 8px;max-width:58%;text-align:right;line-height:1.3}' +
    '.st-op:has(input:checked){background:rgba(255,197,46,.16);border-color:#FFC52E}' +
    '.st-acc{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}' +
    '.st-acc .btn{font-size:14px}.st-nota{font-size:12px;opacity:.75;margin-top:10px}' +
    '@media (max-width:520px){.st-fila{grid-template-columns:1fr}.st-lista{grid-template-columns:1fr 1fr}}' +
    '@media (min-width:700px){.st-lista{grid-template-columns:repeat(4,1fr)}}' +
    '.st-promo{display:flex;gap:14px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin-top:34px;background:linear-gradient(135deg,#1E0838,#4B1F7A);color:#fff;border-radius:20px;padding:18px 20px;text-decoration:none}' +
    '.st-promo b{display:block;font-size:18px;margin-bottom:2px}.st-promo span{font-size:13px;opacity:.85}' +
    '.st-promo i{font-style:normal;background:#FFC52E;color:#2B0F4C;font-weight:800;border-radius:12px;padding:10px 16px;white-space:nowrap}' +
    'a.chip{text-decoration:none;display:inline-flex;align-items:center}' +
    'body.pag-servicio .franja,body.pag-servicio .bancos,body.pag-servicio .barra,body.pag-servicio #resumen,body.pag-servicio #grid,' +
    'body.pag-servicio #info,body.pag-servicio .barra-pedido,body.pag-servicio .estado{display:none!important}' +
    'body.pag-servicio #secServicio{margin-top:8px}body.pag-servicio .st-sellos{display:none}';
  document.head.appendChild(st);

  // Botones en los filtros
  var orden = $('orden');
  ['<button class="chip" data-ir="secGadgets">🎧 Gadgets</button>', '<a class="chip" href="/servicio">🔧 Servicio técnico</a>'].forEach(function(h){
    orden.insertAdjacentHTML('beforebegin', h);
  });
  document.addEventListener('click', function(e){
    var b = e.target.closest('[data-ir]'); if (!b) return;
    var s = $(b.getAttribute('data-ir')); if (s) s.scrollIntoView({ behavior: 'smooth' });
  });

  // Secciones
  var cont = document.createElement('div');
  cont.innerHTML =
    '<section class="ex-sec" id="secGadgets"><div class="seccion"><h2>Gadgets</h2><span id="gadN"></span></div>' +
    '<p class="ex-intro">Audífonos, cargadores, relojes y accesorios. Pregunta por disponibilidad por WhatsApp.</p><div id="gadGrid"></div></section>' +
    '<section class="ex-sec" id="secServicio"><div class="seccion"><h2>Servicio técnico</h2><span>Reparamos en Santa Tecla</span></div>' +
    '<div class="st-sellos"><span>✓ Garantía de 2 a 3 meses</span><span>⏱ El tiempo de cada reparación aparece en la cotización</span><span>📍 7a Av. Norte 2-9, Santa Tecla</span></div>' +
    '<div class="st-lista">' +
      [['📱', 'Pantallas', 'Cambio de pantalla y de vidrio, originales y certificadas.'],
       ['🔋', 'Baterías', 'Cambio de batería para que tu equipo vuelva a durar el día.'],
       ['🔌', 'Puerto de carga', '¿No carga o carga a ratos? Lo cambiamos.'],
       ['📷', 'Cámaras', 'Cámara trasera, frontal y lente de cámara.'],
       ['💧', 'Equipo mojado', 'Revisión y limpieza de equipos mojados.'],
       ['⚡', 'No enciende', 'Diagnóstico y reparación de placa.'],
       ['🔊', 'Audio y bocinas', 'Bocina de llamada, altavoz y micrófono.'],
       ['💻', 'iPad, MacBook y más', 'Tablets, laptops, Apple Watch y otras marcas.']].map(function(x){
        return '<div class="st-item"><i>' + x[0] + '</i><b>' + x[1] + '</b><span>' + x[2] + '</span></div>';
      }).join('') +
    '</div>' +
    '<div class="st-cot"><h3>Cotiza tu reparación</h3><p>Elige tu equipo y la falla para ver el precio y el tiempo.</p>' +
    '<div class="st-fila"><select id="stMarca" aria-label="Marca"><option value="">Cargando…</option></select><select id="stModelo" aria-label="Modelo"></select></div>' +
    '<div class="st-serv" id="stServ"></div>' +
    '<div class="st-acc"><a class="btn btn-wa" id="stWa" target="_blank" rel="noopener">💬 Cotizar por WhatsApp</a></div>' +
    '<p class="st-nota">Precios de referencia, sujetos a revisión del equipo. Si tu modelo o la falla no aparece, escríbenos y te cotizamos.</p></div>' +
    '</section>';
  var info = $('info');
  var secG = cont.querySelector('#secGadgets'), secS = cont.querySelector('#secServicio');
  if (SERVICIO) {
    // Página aparte: solo servicio técnico
    document.body.classList.add('pag-servicio');
    document.title = 'Servicio técnico · TecnoShopSV Santa Tecla';
    var por = document.querySelector('.portada .dentro');
    if (por) por.innerHTML = '<span class="cat-mes">SERVICIO TÉCNICO · SANTA TECLA</span>' +
      '<h1>Reparamos tu celular, <span>con garantía.</span></h1>' +
      '<p>Pantallas, baterías, puertos de carga, cámaras y más. iPhone, Samsung, Huawei, Motorola, Xiaomi, iPad, MacBook y otras marcas. Cotiza aquí y escríbenos por WhatsApp.</p>' +
      '<div class="sellos"><span class="sello">✓ Garantía de 2 a 3 meses</span><span class="sello">⏱ Precio y tiempo en la cotización</span><span class="sello">📍 7a Av. Norte 2-9, Santa Tecla</span></div>' +
      '<div class="mostrando"><a href="/" style="color:#FFC52E;font-weight:800">← Ver celulares a la venta</a><b id="mostrN" hidden></b></div>';
    var marca = document.querySelector('a.marca'); if (marca) marca.href = '/';
    info.parentNode.insertBefore(secS, info);
    secG.remove();
  } else {
    info.parentNode.insertBefore(secG, info);
    var promo = document.createElement('a'); promo.className = 'st-promo'; promo.href = '/servicio';
    promo.innerHTML = '<div><b>🔧 Servicio técnico</b><span>Pantallas, baterías, puertos de carga y más. Cotiza tu reparación con precio y tiempo.</span></div><i>Cotizar reparación →</i>';
    info.parentNode.insertBefore(promo, info);
    secS.remove();
  }

  var datos = leer(GUARDA_EX, null);

  function pintarGadgets(){
    var g = (datos && datos.gadgets) || [];
    $('gadN').textContent = g.length ? g.length + (g.length === 1 ? ' producto' : ' productos') : '';
    if (!g.length) {
      $('gadGrid').innerHTML = '<div class="ex-vacio">Muy pronto verás aquí nuestros gadgets. <a href="' + linkWA('Hola, ¿qué gadgets tienen disponibles?') + '" target="_blank" rel="noopener">Pregúntanos por WhatsApp</a>.</div>';
      return;
    }
    $('gadGrid').innerHTML = '<div class="grid">' + g.map(function(x){
      var p = +x.p || 0, r = +x.r || 0;
      var foto = x.f ? '<img src="' + esc(x.f) + '" alt="" loading="lazy" referrerpolicy="no-referrer">' : '<span style="font-size:48px">🎧</span>';
      var wa = linkWA('Hola, me interesa: ' + x.n + (p ? ' (' + dinero(p) + ')' : ''));
      return '<div class="prod gad"><div class="foto">' + foto + '</div><div class="cuerpo"><span class="lbl">' + esc(x.c) + '</span><h3>' + esc(x.n) + '</h3>' +
        (x.d ? '<span class="cap">' + esc(x.d) + '</span>' : '') +
        (p ? '<span class="tag-precio" style="margin-top:8px">PRECIO DE CONTADO</span><div class="fila-precio"><span class="precio-neg">' + dinero(p) + '</span>' +
             '<a class="btn-int" style="text-decoration:none;text-align:center" href="' + wa + '" target="_blank" rel="noopener">💬 Me interesa</a></div>' +
             (r ? '<div class="nota-p">Efectivo o transferencia<br>Con tarjeta: <b>' + dinero(r) + '</b></div>' : '')
           : '<div class="fila-precio" style="margin-top:8px"><a class="btn-int" style="text-decoration:none;text-align:center" href="' + wa + '" target="_blank" rel="noopener">💬 Consultar</a></div>') +
        '</div></div>';
    }).join('') + '</div>';
  }

  function servMarca(){ var s = (datos && datos.servicio) || []; return s[+$('stMarca').value] || null; }
  function pintarMarcas(){
    var s = (datos && datos.servicio) || [], sel = $('stMarca'), antes = sel.value;
    if (!s.length) { sel.innerHTML = '<option value="">Escríbenos por WhatsApp</option>'; $('stModelo').innerHTML = ''; pintarServicios(); return; }
    sel.innerHTML = '<option value="">Marca</option>' + s.map(function(m, i){ return '<option value="' + i + '">' + esc(m.m) + '</option>'; }).join('');
    if (antes && s[+antes]) sel.value = antes;
    pintarModelos();
  }
  function pintarModelos(){
    var m = servMarca(), sel = $('stModelo'), antes = sel.value;
    sel.innerHTML = m ? '<option value="">Modelo</option>' + m.d.map(function(x, i){ return '<option value="' + i + '">' + esc(x[0]) + '</option>'; }).join('')
                      : '<option value="">Modelo</option>';
    sel.disabled = !m;
    if (m && antes && m.d[+antes]) sel.value = antes;
    pintarServicios();
  }
  function pintarServicios(){
    var m = servMarca(), md = m && m.d[+$('stModelo').value];
    if (!md || $('stModelo').value === '') { $('stServ').innerHTML = ''; actualizarWa(); return; }
    var ops = m.s.map(function(s, i){ return [etq(s), md[1][i]]; }).filter(function(x){ return x[1]; });
    $('stServ').innerHTML = ops.length ? ops.map(function(x, i){
      return '<label class="st-op"><input type="checkbox" value="' + i + '" data-n="' + esc(x[0]) + '" data-v="' + esc(txt(x[1])) + '"><span class="n">' + esc(x[0]) + '</span><span class="v">' + esc(txt(x[1])) + '</span></label>';
    }).join('') : '<p class="st-nota">Escríbenos para cotizar este modelo.</p>';
    actualizarWa();
  }
  function actualizarWa(){
    var m = servMarca(), md = m && m.d[+$('stModelo').value];
    var marcados = Array.prototype.map.call(document.querySelectorAll('#stServ input:checked'), function(x){ return '• ' + x.dataset.n + ': ' + x.dataset.v; });
    var t = 'Hola TecnoShopSV, quiero cotizar una reparación';
    if (m && md && $('stModelo').value !== '') t += ' para mi ' + (/^(iphone|samsung|huawei|motorola|xiaomi|ipad|lg|google)/i.test(md[0]) ? '' : m.m + ' ') + md[0];
    t += marcados.length ? ':\n' + marcados.join('\n') : '.';
    $('stWa').href = linkWA(t);
  }
  var hayServ = !!$('stMarca');
  if (hayServ) $('stMarca').addEventListener('change', function(){ $('stModelo').value = ''; pintarModelos(); });
  if (hayServ) { $('stModelo').addEventListener('change', pintarServicios); $('stServ').addEventListener('change', actualizarWa); }

  function recibirEx(d){ if (!d) return; datos = d; guardar(GUARDA_EX, d); if ($('gadGrid')) pintarGadgets(); if (hayServ) pintarMarcas(); }
  function cargarEx(){
    fetch(API_EXTRAS, { cache: 'no-store' }).then(function(r){ return r.json(); }).then(function(d){ if (d && (d.gadgets || d.servicio)) recibirEx(d); }).catch(function(){});
  }
  if ($('gadGrid')) pintarGadgets(); if (hayServ) pintarMarcas();
  if (datos) recibirEx(datos);
  cargarEx();
  setInterval(function(){ if (!document.hidden) cargarEx(); }, 300000);
})();
