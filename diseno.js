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
    return '<div class="prod"><div class="foto" data-modelo="' + k + '">' + fotoDe(md.m) + '<div class="etqs">' + etq + '</div></div>' +
      '<div class="cuerpo"><span class="lbl">' + NOMBRE[md.marca] + '</span><h3 data-modelo="' + k + '">' + esc(md.m) + '</h3>' +
      '<span class="cap">' + esc(md.g) + ' · Cat. ' + esc(cats.join(' / ')) + '</span>' +
      '<div class="colores">' + colores.map(function(c){ return '<span class="punto" title="' + esc(c) + '" style="background:' + colorDe(c) + '"></span>'; }).join('') + '</div>' +
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
