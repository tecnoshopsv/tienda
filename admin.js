/* =====================================================
   TecnoShopSV · Modo vendedor (Iniciar sesión + botón INFO)
   - Enlace discreto "Iniciar sesión" en el pie de página.
   - Con sesión iniciada, cada modelo muestra un botón INFO
     que copia un texto listo para pegar en WhatsApp.
   ===================================================== */
(function () {
  // ---- Ajustes (puedes editar estos textos) ----
  var HASH = 'e47e4b895d7a838f2d64871ba5a1414a895eea865e1e88c27d3df17597faa929';
  var SAL = 'tsv-admin|';
  var CLAVE = 'ts_admin';
  var INCLUYE = [
    'Cargador original (cable + cubo)',
    'Equipo 100% testeado y liberado para todas las redes'
  ];
  var GARANTIA = [
    '3 meses de garantía directa con TecnoShopSV',
    'No cubre golpes, humedad, pantalla quebrada ni equipos abiertos por terceros'
  ];
  var PIE = '📍 7a Av. Norte 2-9, Santa Tecla · Lunes a sábado 8 a.m. – 5 p.m.';

  // ---- Sesión ----
  function leerSesion() { try { return localStorage.getItem(CLAVE) === HASH; } catch (e) { return false; } }
  function guardarSesion(v) { try { v ? localStorage.setItem(CLAVE, HASH) : localStorage.removeItem(CLAVE); } catch (e) {} }
  var admin = leerSesion();

  function sha256(txt) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(txt)).then(function (buf) {
      return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
    });
  }

  // ---- Estilos ----
  var css = document.createElement('style');
  css.textContent =
    '.adm-link{font-size:11px;opacity:.35;color:inherit;background:none;border:0;padding:0;cursor:pointer;text-decoration:underline}' +
    '.adm-link:hover{opacity:.8}' +
    '.adm-fondo{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:9999;padding:16px}' +
    '.adm-caja{background:#fff;color:#222;border-radius:14px;padding:20px;width:100%;max-width:320px;box-shadow:0 10px 30px rgba(0,0,0,.25);font-family:inherit}' +
    '.adm-caja h3{margin:0 0 12px;font-size:17px}' +
    '.adm-caja input{width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid #ccc;border-radius:10px;font-size:15px}' +
    '.adm-caja .adm-err{color:#d23b3b;font-size:13px;min-height:18px;margin:6px 0}' +
    '.adm-caja .adm-btns{display:flex;gap:8px;justify-content:flex-end}' +
    '.adm-caja button{padding:9px 14px;border-radius:10px;border:0;font-weight:600;cursor:pointer;font-family:inherit}' +
    '.adm-ok{background:#4B1F7A;color:#fff}.adm-no{background:#eee;color:#333}' +
    '.btn-info{display:block;width:100%;margin-top:8px;padding:7px 10px;border-radius:10px;border:1.5px solid #4B1F7A;background:#fff;color:#4B1F7A;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit;letter-spacing:.5px}' +
    '.btn-info:hover{background:#4B1F7A;color:#fff}' +
    '.adm-toast{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#222;color:#fff;padding:10px 16px;border-radius:999px;font-size:14px;z-index:10000;box-shadow:0 6px 20px rgba(0,0,0,.25)}';
  document.head.appendChild(css);

  function aviso(txt) {
    var t = document.createElement('div');
    t.className = 'adm-toast';
    t.textContent = txt;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2200);
  }

  // ---- Enlace en el pie de página ----
  var enlace;
  function pintarEnlace() {
    if (!enlace) {
      var cont = document.querySelector('footer .dentro') || document.querySelector('footer') || document.body;
      var p = document.createElement('p');
      p.style.margin = '6px 0 0';
      enlace = document.createElement('button');
      enlace.type = 'button';
      enlace.className = 'adm-link';
      enlace.addEventListener('click', function () { admin ? cerrarSesion() : abrirLogin(); });
      p.appendChild(enlace);
      cont.appendChild(p);
    }
    enlace.textContent = admin ? 'Cerrar sesión' : 'Iniciar sesión';
  }

  function abrirLogin() {
    var f = document.createElement('div');
    f.className = 'adm-fondo';
    f.innerHTML =
      '<form class="adm-caja"><h3>Iniciar sesión</h3>' +
      '<input type="password" placeholder="Contraseña" autocomplete="current-password" required>' +
      '<div class="adm-err"></div>' +
      '<div class="adm-btns"><button type="button" class="adm-no">Cancelar</button><button type="submit" class="adm-ok">Entrar</button></div></form>';
    document.body.appendChild(f);
    var form = f.querySelector('form'), inp = f.querySelector('input'), err = f.querySelector('.adm-err');
    inp.focus();
    f.querySelector('.adm-no').onclick = function () { f.remove(); };
    f.addEventListener('click', function (e) { if (e.target === f) f.remove(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      sha256(SAL + inp.value).then(function (h) {
        if (h === HASH) {
          admin = true; guardarSesion(true); f.remove();
          pintarEnlace(); ponerBotones(); aviso('Sesión iniciada ✓');
        } else {
          err.textContent = 'Contraseña incorrecta';
          inp.select();
        }
      });
    });
  }

  function cerrarSesion() {
    admin = false; guardarSesion(false);
    document.querySelectorAll('.btn-info').forEach(function (b) { b.remove(); });
    pintarEnlace(); aviso('Sesión cerrada');
  }

  // ---- Texto para WhatsApp ----
  function plata(n) {
    return '$' + (+n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function bateria(b) {
    b = String(b || '').trim();
    if (!b) return '';
    return /^\d+(\.\d+)?$/.test(b) ? b + '%' : b;
  }
  function buscarModelo(k) {
    var lista = window.modelos || [];
    for (var i = 0; i < lista.length; i++) if (lista[i].k === k) return lista[i];
    return null;
  }

  function textoInfo(mod) {
    var ops = (mod.ops || []).slice().sort(function (a, b) {
      return String(a.c).localeCompare(String(b.c)) || (a.p - b.p);
    });
    var precios = ops.map(function (o) { return o.p; });
    var unico = precios.every(function (p) { return p === precios[0]; });
    var min = Math.min.apply(null, precios);
    var minR = Math.min.apply(null, ops.map(function (o) { return o.r || o.p; }));

    var L = [];
    L.push('📱 *' + mod.m + ' · ' + mod.g + '*');
    L.push('');
    L.push('💰 *Precio de contado:* ' + (unico ? '' : 'desde ') + plata(min));
    L.push('💳 *Con tarjeta:* ' + (unico ? '' : 'desde ') + plata(minR));
    L.push('_Contado = efectivo o transferencia_');
    L.push('');
    L.push('🎨 *Colores disponibles:*');
    ops.forEach(function (o) {
      var partes = [o.c || 'Color por confirmar'];
      var bt = bateria(o.b);
      if (bt) partes.push('🔋 ' + bt);
      if (!unico) partes.push(plata(o.p) + ' contado / ' + plata(o.r || o.p) + ' tarjeta');
      L.push('• ' + partes.join(' · '));
    });
    L.push('');
    L.push('📦 *Incluye:*');
    INCLUYE.forEach(function (x) { L.push('• ' + x); });
    L.push('');
    L.push('🛡️ *Garantía:*');
    GARANTIA.forEach(function (x) { L.push('• ' + x); });
    L.push('');
    L.push(PIE);
    return L.join('\n');
  }

  function copiar(txt) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(txt).catch(function () { return copiarViejo(txt); });
    }
    return Promise.resolve(copiarViejo(txt));
  }
  function copiarViejo(txt) {
    var ta = document.createElement('textarea');
    ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    ta.remove();
  }

  // ---- Botón INFO en cada tarjeta ----
  function ponerBotones() {
    if (!admin) return;
    document.querySelectorAll('.prod').forEach(function (card) {
      if (card.querySelector('.btn-info')) return;
      var ref = card.querySelector('[data-modelo]');
      var fila = card.querySelector('.fila-precio');
      if (!ref || !fila) return;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn-info';
      b.textContent = '📋 INFO';
      b.dataset.modelo = ref.getAttribute('data-modelo');
      fila.insertAdjacentElement('afterend', b);
    });
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.btn-info');
    if (!b) return;
    e.preventDefault(); e.stopPropagation();
    var mod = buscarModelo(b.dataset.modelo);
    if (!mod) { aviso('No encontré ese modelo'); return; }
    copiar(textoInfo(mod)).then(function () { aviso('Info copiada ✓ Pégala en WhatsApp'); });
  }, true);

  // Volver a poner los botones cuando el catálogo se vuelve a pintar (búsqueda, filtros, etc.)
  var espera;
  new MutationObserver(function () {
    if (!admin) return;
    clearTimeout(espera);
    espera = setTimeout(ponerBotones, 50);
  }).observe(document.body, { childList: true, subtree: true });

  function iniciar() { pintarEnlace(); ponerBotones(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
