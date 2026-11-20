// Contador de visitas de tecnoshopsv.com para el CRM (pestaña «Web»).
// No guarda datos personales: un número al azar por navegador, la página, de dónde llegó y el tipo de dispositivo.
// No cuenta al equipo de TecnoShopSV cuando tiene la sesión iniciada en la tienda.
(function () {
  try {
    var DESTINO = 'https://script.google.com/macros/s/AKfycbw4LVB9cvL2KwWoXQZ4T2WCT8TDELl7NaKc1mzehOrqy5uUl4DEqRAPHYTzm4HYXvBv/exec';
    var ua = navigator.userAgent || '';
    if (navigator.webdriver || /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp\/|headless/i.test(ua)) return;
    var LS = window.localStorage;
    if (LS.getItem('ts_sesion')) return;

    function nuevoId() { return (Math.random().toString(36).slice(2, 10) + Date.now().toString(36)).replace(/[^a-z0-9]/g, ''); }
    var q = new URLSearchParams(location.search);
    var host = '';
    try { host = document.referrer ? new URL(document.referrer).hostname.toLowerCase() : ''; } catch (e) {}
    if (/(^|\.)tecnoshopsv\.com$/.test(host)) host = '';

    function fuente() {
      var utm = (q.get('utm_source') || '').toLowerCase();
      if (q.get('gclid')) return 'Anuncio de Google';
      if (/instagram|^ig$/.test(utm) || /instagram/.test(host) || /Instagram/.test(ua)) return 'Instagram';
      if (/facebook|^fb$|^meta$/.test(utm) || /facebook|(^|\.)fb\.(com|me)$/.test(host) || /FBAN|FBAV|FB_IAB/.test(ua)) return 'Facebook';
      if (q.get('fbclid')) return 'Facebook';
      if (/whatsapp|^wa$/.test(utm) || /whatsapp|(^|\.)wa\.me$/.test(host)) return 'WhatsApp';
      if (/tiktok/.test(utm + ' ' + host) || /musical_ly|TikTok|BytedanceWebview/i.test(ua)) return 'TikTok';
      if (/google/.test(utm) || /(^|\.)google\.|bing\.|yahoo\.|duckduckgo\./.test(host)) return 'Google';
      if (q.get('equipo')) return 'Enlace de equipo';
      if (host) return 'Otro sitio';
      return 'Directo';
    }

    var vis = LS.getItem('ts_vis');
    if (!vis) { vis = nuevoId(); LS.setItem('ts_vis', vis); }
    var ahora = Date.now(), ultima = +LS.getItem('ts_ses_t') || 0, ses = LS.getItem('ts_ses'), f = LS.getItem('ts_ses_f');
    // Visita nueva después de 30 minutos sin actividad, o si llega desde otro lado (anuncio, Instagram, etc.)
    var fNueva = fuente(), externa = fNueva !== 'Directo';
    if (!ses || ahora - ultima > 30 * 60000 || (externa && fNueva !== f)) {
      ses = nuevoId(); f = fNueva;
      LS.setItem('ts_ses', ses); LS.setItem('ts_ses_f', f);
    }
    LS.setItem('ts_ses_t', String(ahora));

    var disp = /iPad|Tablet/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua)) ? 'Tablet' : /Mobi|Android|iPhone|iPod/i.test(ua) ? 'Celular' : 'Computadora';
    var pagina = location.pathname.replace(/\.html$/, '').replace(/\/index$/, '/').replace(/(.)\/$/, '$1') || '/';
    var datos = JSON.stringify({ t: 'web', sitio: 'tienda', v: vis, s: ses, p: pagina, f: f, r: host, d: disp, e: q.get('equipo') || '' });

    var enviado = false;
    if (navigator.sendBeacon) { try { enviado = navigator.sendBeacon(DESTINO, new Blob([datos], { type: 'text/plain;charset=utf-8' })); } catch (e) {} }
    if (!enviado && window.fetch) fetch(DESTINO, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: datos }).catch(function () {});
  } catch (e) {}
})();
