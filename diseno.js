// Diseño 2 · catálogo por secciones (se carga después del script principal)
(function(){
  var MAPA = 'https://www.google.com/maps/search/?api=1&query=7a%20Avenida%20Norte%202-9%20Santa%20Tecla%20La%20Libertad';
  var mes = new Date().toLocaleDateString('es-SV', { month: 'long', year: 'numeric' }).toUpperCase();

  // Encabezado: botón de ubicación
  var wa = $('waCab');
  if (wa && !document.querySelector('.btn-ubi')) {
    var acc = document.createElement('div'); acc.className = 'cab-acc';
    wa.parentNode.insertBefore(acc, wa);
    acc.innerHTML = '<a class="btn-ubi" href="' + MAPA + '" target="_blank" rel="noopener">📍 Ubicación</a>';
    acc.appendChild(wa); wa.textContent = '💬 Escríbenos';
  }

  // Portada
  var por = document.querySelector('.portada .dentro');
  por.innerHTML = '<span class="cat-mes">CATÁLOGO · ' + esc(mes) + '</span>' +
    '<h1>Tu próximo celular, <span>garantizado.</span></h1>' +
    '<p>iPhone y Samsung nuevos y seminuevos, 100% testeados y liberados. Precios reales, 3 meses de garantía y envíos a todo El Salvador.</p>' +
    '<div class="sellos"><span class="sello">✓ 3 meses de garantía</span><span class="sello">🔌 Cargador original</span>' +
    '<span class="sello">💳 Tarjeta y cuotas</span><span class="sello">🚚 Envíos a todo el país</span></div>' +
    '<div class="mostrando">Mostrando <b id="mostrN">…</b> equipos disponibles</div>';
  var fr = document.createElement('div'); fr.className = 'franja';
  fr.innerHTML = '<div class="dentro">💵 Precios de contado al pagar en <b>efectivo o transferencia</b> · Con tarjeta o en cuotas aplica el precio regular</div>';
  document.querySelector('.portada').after(fr);
  // Bancos participantes en cuotas
  var bn = document.createElement('div'); bn.className = 'bancos';
  bn.innerHTML = '<div class="dentro"><span class="bancos-t">💳 Cuotas con:</span>' +
    BANCOS.map(function(b){ return '<span class="banco"><b>' + esc(b.n) + '</b><small>hasta ' + b.max + ' meses</small></span>'; }).join('') + '</div>';
  fr.after(bn);

  // Filtros
  var orden = $('orden');
  $('filtros').innerHTML = '<button class="chip on" data-marca="">Todos</button><button class="chip" data-marca="iphone">iPhone</button>' +
    '<button class="chip" data-marca="samsung">Samsung</button><button class="chip" data-marca="nuevo">🆕 Nuevos</button>' +
    '<button class="chip" data-marca="semi">⭐ Seminuevos</button><button class="chip" data-cuotas="1">💳 Cuotas</button>';
  $('filtros').appendChild(orden);

  // Fotos de referencia por modelo y color (carpeta /fotos). Para agregar una: subir "modelo--color.webp" y anotarla aquí.
  // Colores extra para los puntitos
  COLORES.anaranjado = '#f07a2a'; COLORES.naranja = '#f07a2a'; COLORES.silver = '#d9d9d9';
  var FOTOS_COLOR = ('iphone-11--blanco iphone-11--negro iphone-11--morado iphone-11-pro-max--blanco iphone-11-pro-max--verde iphone-11-pro-max--negro iphone-11-pro-max--dorado iphone-12--verde iphone-12--azul iphone-12--negro iphone-13--verde iphone-13--celeste iphone-13--blanco iphone-13--negro iphone-13--rojo iphone-13-pro--celeste iphone-13-pro--blanco iphone-13-pro--dorado iphone-13-pro--verde iphone-13-pro--negro iphone-13-pro-max--negro iphone-14--negro iphone-14--blanco iphone-14-pro--negro iphone-14-pro-max--negro iphone-15--amarillo iphone-15-plus--rosado iphone-15-pro--negro iphone-15-pro-max--azul iphone-16-pro--dorado iphone-16-pro-max--gris iphone-16-pro-max--negro iphone-16-pro-max--dorado iphone-17-pro-max--azul iphone-17-pro-max--anaranjado iphone-17-pro-max--blanco samsung-s21-ultra--silver samsung-s21-ultra--negro samsung-s22-ultra--burgundy samsung-s22-ultra--verde samsung-s22-ultra--negro samsung-s22-ultra--blanco samsung-s23-ultra--negro samsung-s25--celeste samsung-s25-ultra--gris samsung-s26--negro samsung-s25-ultra--celeste samsung-z-flip-4--amarillo samsung-z-flip-4--blanco').split(' ');
  function slug(s){ return norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  window.fotoColor = function(m, c){ var f = slug(m) + '--' + slug(c); return FOTOS_COLOR.indexOf(f) >= 0 ? 'fotos/' + f + '.webp' : ''; };
  var fotoBase = window.fotoDe;
  window.fotoDe = function(m, c){
    var src = c ? fotoColor(m, c) : '';
    if (!c) { var md = modelos.find(function(x){ return x.m === m; }); if (md) md.ops.some(function(o){ return (src = fotoColor(m, o.c)); }); }
    return src ? '<img class="fc" src="' + src + '" alt="' + esc(m + (c ? ' ' + c : '')) + '" loading="lazy">' : fotoBase(m);
  };
  var est = document.createElement('style');
  est.textContent = '.prod .foto img.fc,.det-foto img.fc{clip-path:none;transform:none;padding:7%;box-sizing:border-box}' +
    '.prod .punto.sel{box-shadow:0 0 0 2px #fff,0 0 0 4px #7B3FC4}.prod .punto[data-foto]{cursor:pointer}' +
    '#modalDet .op{transition:border-color .15s,box-shadow .15s}#modalDet .op.sel{border-color:#7B3FC4;box-shadow:0 0 0 1px #7B3FC4}';
  document.head.appendChild(est);
  // Al pasar el cursor sobre un color, la foto de la tarjeta cambia a ese color
  document.addEventListener('mouseover', function(e){
    var p = e.target.closest && e.target.closest('.prod .punto[data-foto]'); if (!p || p.classList.contains('sel')) return;
    var prod = p.closest('.prod'), img = prod.querySelector('.foto img');
    if (img) { img.className = 'fc'; img.src = p.getAttribute('data-foto'); img.alt = p.title; }
    prod.querySelectorAll('.punto').forEach(function(x){ x.classList.toggle('sel', x === p); });
  });
  // Dentro del modelo: al pasar el cursor o tocar una opción, la foto muestra ese color
  function fotoOpcion(e){
    var op = e.target.closest && e.target.closest('#modalDet .op'); if (!op || op.classList.contains('sel')) return;
    var md = modelos.find(function(x){ return x.k === modeloAbierto; }), t = op.querySelector('.op-t'); if (!md || !t) return;
    var src = fotoColor(md.m, t.textContent.trim()), img = document.querySelector('#modalDet .det-foto img');
    document.querySelectorAll('#modalDet .op').forEach(function(x){ x.classList.toggle('sel', x === op); });
    if (src && img) { img.className = 'fc'; img.src = src; img.alt = md.m + ' ' + t.textContent.trim(); }
  }
  document.addEventListener('mouseover', fotoOpcion);
  document.addEventListener('click', fotoOpcion);

  // Miniatura del equipo (color exacto si hay foto) para el pedido y la calculadora
  function miniDe(o){
    var src = fotoColor(o.m, o.c);
    return '<span class="mini">' + (src ? '<img src="' + src + '" alt="' + esc(o.m + ' ' + o.c) + '">' : fotoBase(o.m)) + '</span>';
  }
  est.textContent += '.mini{width:52px;height:52px;border-radius:12px;background:#F5F4F8;display:flex;align-items:center;justify-content:center;overflow:hidden;flex:none}' +
    '.mini img{width:100%;height:100%;object-fit:contain;padding:4px;box-sizing:border-box;clip-path:none;transform:none}.mini svg{width:50%;color:#B7A9CC}' +
    '.linea.con-mini{grid-template-columns:auto 1fr auto;align-items:center}.cuo-eq{display:flex;gap:12px;align-items:center;margin:4px 0 10px}.cuo-eq .mini{width:72px;height:72px}';
  var pintarPedidoBase = window.pintarPedido;
  window.pintarPedido = function(){
    pintarPedidoBase();
    var ls = totales().ls, filas = document.querySelectorAll('#pedLista .linea');
    filas.forEach(function(f, i){ if (ls[i] && !f.querySelector('.mini')) { f.classList.add('con-mini'); f.insertAdjacentHTML('afterbegin', miniDe(ls[i].o)); } });
  };
  var calcularCuotasBase = window.calcularCuotas;
  function miniCuotas(){
    var o = porId[$('cuoEquipo').value], res = $('cuoRes'), box = $('cuoMini');
    if (!box) { box = document.createElement('div'); box.id = 'cuoMini'; box.className = 'cuo-eq'; res.parentNode.insertBefore(box, res); }
    box.innerHTML = o ? miniDe(o) + '<div><b>' + esc(o.m + ' ' + o.g) + '</b><div class="op-s">' + esc(o.c + ' · Cat. ' + o.k) + '</div></div>' : '';
  }
  window.calcularCuotas = function(){ calcularCuotasBase(); miniCuotas(); };
  $('cuoEquipo').addEventListener('change', miniCuotas);
  if (typeof pintarPedido === 'function') pintarPedido();

  function esNuevo(o){ return /nuevo|open box/i.test(o.k); }
  var NOMBRE = { iphone: 'iPhone', samsung: 'Samsung', otro: 'Otras marcas' };

  window.visibles = function(){
    var palabras = norm(vista.q).split(' ').filter(Boolean), m = vista.marca;
    var lista = modelos.filter(function(md){
      if ((m === 'iphone' || m === 'samsung') && md.marca !== m) return false;
      if (m === 'nuevo' && !md.ops.some(esNuevo)) return false;
      if (m === 'semi' && md.ops.every(esNuevo)) return false;
      return palabras.every(function(p){ return md.busca.indexOf(p) >= 0; });
    });
    lista.sort(function(a, b){
      if (vista.orden === 'menor') return (a.desde || 1e9) - (b.desde || 1e9);
      if (vista.orden === 'mayor') return (b.desde || 0) - (a.desde || 0);
      var x = claveOrden(a.m), y = claveOrden(b.m); return x < y ? -1 : x > y ? 1 : (parseInt(a.g) || 0) - (parseInt(b.g) || 0);
    });
    return lista;
  };

  function tarjeta(md){
    var colores = []; md.ops.forEach(function(o){ if (colores.indexOf(o.c) < 0) colores.push(o.c); });
    var con = md.ops.filter(function(o){ return o.p; }).sort(function(a, b){ return a.p - b.p; });
    var o = con[0], varios = con.length && con[con.length - 1].p !== o.p;
    var etq = '';
    if (md.nuevo) etq += '<i class="e-nuevo">NUEVO</i>';
    if (md.ops.some(function(x){ return !esNuevo(x); })) etq += '<i class="e-sem">SEMINUEVO</i>';
    if (md.unidades <= 2) etq += '<i class="e-ult">ÚLTIMOS</i>';
    var cats = []; md.ops.forEach(function(x){ if (cats.indexOf(x.k) < 0) cats.push(x.k); });
    var k = esc(md.k);
    var precio = o
      ? '<span class="tag-precio">PRECIO DE CONTADO</span><div class="fila-precio"><span class="precio-neg">' + (varios ? '<small>Desde</small>' : '') + dinero(o.p) + '</span>' +
        '<button class="btn-int" data-modelo="' + k + '">💬 Me interesa</button></div>' +
        '<div class="nota-p">Efectivo o transferencia' + (o.r ? '<br>Con tarjeta: <b>' + dinero(o.r) + '</b>' : '') + '</div>' +
        (o.r ? '<details class="cuotas-acc"><summary>💳 Ver cuotas con tarjeta</summary><ul>' +
          '<li><span>1 pago</span><b>' + dinero(o.r) + '</b></li>' +
          [3, 6, 12, 18, 24, 36].map(function(m){ var bs = BANCOS.filter(function(b){ return b.max >= m; }).map(function(b){ return b.n.replace('Banco ', ''); }); return '<li><span>' + m + ' meses' + (bs.length < BANCOS.length ? '<small>Solo ' + esc(bs.join(' y ')) + '</small>' : '') + '</span><b>' + dinero(o.r / m) + '</b></li>'; }).join('') +
          '</ul></details>' : '')
      : '<div class="fila-precio"><button class="btn-int" data-modelo="' + k + '">💬 Consultar</button></div>';
    var c0 = colores.find(function(c){ return fotoColor(md.m, c); });
    return '<div class="prod"><div class="foto" data-modelo="' + k + '">' + fotoDe(md.m, c0) + '<div class="etqs">' + etq + '</div></div>' +
      '<div class="cuerpo"><span class="lbl">' + NOMBRE[md.marca] + '</span><h3 data-modelo="' + k + '">' + esc(md.m) + '</h3>' +
      '<span class="cap">' + esc(md.g) + ' · Cat. ' + esc(cats.join(' / ')) + '</span>' +
      '<div class="colores">' + colores.map(function(c){ var f = fotoColor(md.m, c); return '<span class="punto' + (c === c0 ? ' sel' : '') + '" title="' + esc(c) + '"' + (f ? ' data-foto="' + f + '" role="button" tabindex="0"' : '') + ' style="background:' + colorDe(c) + '"></span>'; }).join('') + '</div>' +
      precio + '</div></div>';
  }

  window.pintar = function(){
    if (!modelos.length) return;
    var lista = visibles(), g = $('grid');
    var unidades = lista.reduce(function(s, m){ return s + m.unidades; }, 0);
    $('mostrN').textContent = unidades;
    g.className = 'catalogo';
    if (!lista.length) {
      g.innerHTML = '<div class="vacio">No tenemos ese modelo en este momento. <a href="' + linkWA('Hola, busco este celular: ' + vista.q) + '" target="_blank" rel="noopener">Pregúntanos por WhatsApp</a>, te avisamos cuando llegue.</div>';
      return;
    }
    var grupos;
    if (vista.orden === 'modelo') {
      grupos = ['iphone', 'samsung', 'otro'].map(function(m){ return { t: NOMBRE[m], l: lista.filter(function(md){ return md.marca === m; }) }; })
        .filter(function(x){ return x.l.length; });
    } else grupos = [{ t: vista.orden === 'menor' ? 'Menor precio' : 'Mayor precio', l: lista }];
    g.innerHTML = grupos.map(function(x){
      var u = x.l.reduce(function(s, m){ return s + m.unidades; }, 0);
      return '<div class="seccion"><h2>' + x.t + '</h2><span>' + x.l.length + (x.l.length === 1 ? ' modelo' : ' modelos') + ' · ' + u + ' equipos</span></div>' +
        '<div class="grid">' + x.l.map(tarjeta).join('') + '</div>';
    }).join('');
  };

  // Botón para volver arriba
  var up = document.createElement('button'); up.className = 'arriba'; up.setAttribute('aria-label', 'Volver arriba'); up.textContent = '↑';
  up.onclick = function(){ window.scrollTo({ top: 0, behavior: 'smooth' }); };
  document.body.appendChild(up);
  window.addEventListener('scroll', function(){ up.classList.toggle('ver', window.scrollY > 600); }, { passive: true });

  pintar();
})();
