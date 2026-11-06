/* TecnoShopSV · Inicio de sesión del equipo
   Este archivo es público y NO contiene contraseñas ni herramientas:
   la clave se verifica en el servidor (Apps Script) y las herramientas
   solo se descargan con una sesión válida. */
(function () {
  var CLAVE = 'ts_sesion';
  var URL_API = String(window.API || '').split('?')[0];

  function leer() { try { return localStorage.getItem(CLAVE) || ''; } catch (e) { return ''; } }
  function guardar(t) { try { t ? localStorage.setItem(CLAVE, t) : localStorage.removeItem(CLAVE); } catch (e) {} }
  var token = leer();

  function llamar(datos) {
    return fetch(URL_API, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(datos)
    }).then(function (r) { return r.json(); });
  }

  var css = document.createElement('style');
  css.textContent =
    '.adm-link{font-size:11px;opacity:.35;color:inherit;background:none;border:0;padding:0;cursor:pointer;text-decoration:underline;font-family:inherit}' +
    '.adm-link:hover{opacity:.8}' +
    '.adm-fondo{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:9999;padding:16px}' +
    '.adm-caja{background:#fff;color:#222;border-radius:14px;padding:20px;width:100%;max-width:320px;box-shadow:0 10px 30px rgba(0,0,0,.25);font-family:inherit}' +
    '.adm-caja h3{margin:0 0 12px;font-size:17px}' +
    '.adm-caja input{width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid #ccc;border-radius:10px;font-size:15px}' +
    '.adm-caja .adm-err{color:#d23b3b;font-size:13px;min-height:18px;margin:6px 0}' +
    '.adm-caja .adm-btns{display:flex;gap:8px;justify-content:flex-end}' +
    '.adm-caja button{padding:9px 14px;border-radius:10px;border:0;font-weight:600;cursor:pointer;font-family:inherit}' +
    '.adm-ok{background:#4B1F7A;color:#fff}.adm-ok:disabled{opacity:.6}.adm-no{background:#eee;color:#333}' +
    '.adm-toast{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#222;color:#fff;padding:10px 16px;border-radius:999px;font-size:14px;z-index:10000;box-shadow:0 6px 20px rgba(0,0,0,.25)}';
  document.head.appendChild(css);

  function aviso(txt) {
    var t = document.createElement('div');
    t.className = 'adm-toast';
    t.textContent = txt;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2200);
  }
  window.tsAviso = aviso;

  var enlace;
  function pintarEnlace() {
    if (!enlace) {
      var cont = document.querySelector('footer .dentro') || document.querySelector('footer') || document.body;
      var p = document.createElement('p');
      p.style.margin = '6px 0 0';
      enlace = document.createElement('button');
      enlace.type = 'button';
      enlace.className = 'adm-link';
      enlace.addEventListener('click', function () { token ? cerrarSesion() : abrirLogin(); });
      p.appendChild(enlace);
      cont.appendChild(p);
    }
    enlace.textContent = token ? 'Cerrar sesión' : 'Iniciar sesión';
  }

  function cargarHerramientas() {
    if (!token) return;
    llamar({ fn: 'tiendaherramientas', token: token }).then(function (r) {
      if (r && r.codigo) {
        (new Function(r.codigo))();
      } else if (r && /sesi/i.test(r.error || '')) {
        guardar(''); token = ''; pintarEnlace();
        aviso('Tu sesión venció, inicia sesión de nuevo');
      }
    }).catch(function () {});
  }

  function abrirLogin() {
    var f = document.createElement('div');
    f.className = 'adm-fondo';
    f.innerHTML =
      '<form class="adm-caja"><h3>Iniciar sesión</h3>' +
      '<input type="password" placeholder="Clave del equipo" autocomplete="current-password" required>' +
      '<div class="adm-err"></div>' +
      '<div class="adm-btns"><button type="button" class="adm-no">Cancelar</button><button type="submit" class="adm-ok">Entrar</button></div></form>';
    document.body.appendChild(f);
    var form = f.querySelector('form'), inp = f.querySelector('input'),
        err = f.querySelector('.adm-err'), ok = f.querySelector('.adm-ok');
    inp.focus();
    f.querySelector('.adm-no').onclick = function () { f.remove(); };
    f.addEventListener('click', function (e) { if (e.target === f) f.remove(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      ok.disabled = true; ok.textContent = 'Verificando…'; err.textContent = '';
      llamar({ fn: 'tiendalogin', clave: inp.value }).then(function (r) {
        if (r && r.token) {
          token = r.token; guardar(token); f.remove();
          pintarEnlace(); cargarHerramientas(); aviso('Sesión iniciada ✓');
        } else {
          err.textContent = r && r.error === 'Bloqueado'
            ? 'Demasiados intentos. Espera 15 minutos.'
            : 'Clave incorrecta';
          inp.select();
        }
      }).catch(function () {
        err.textContent = 'Sin conexión, intenta de nuevo';
      }).then(function () { ok.disabled = false; ok.textContent = 'Entrar'; });
    });
  }

  function cerrarSesion() {
    guardar(''); token = '';
    location.reload();
  }

  function iniciar() { pintarEnlace(); cargarHerramientas(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
