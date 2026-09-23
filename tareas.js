/* ══════════ Any al peu ══════════ */
document.querySelectorAll('[data-year]').forEach(function(el){ el.textContent = new Date().getFullYear(); });

/* ══════════ Aparicions en fer scroll ══════════ */
var observador = new IntersectionObserver(function(entradas){
  entradas.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('vist'); observador.unobserve(e.target); } });
}, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.apareix').forEach(function(el){ observador.observe(el); });

/* ══════════ Idioma ES / CA ══════════
   Mateix mecanisme que la home: data-ca guarda el text en català,
   dataset.es es desa a l'inici amb el contingut original de l'HTML. */
var traduibles = document.querySelectorAll('[data-ca]');
traduibles.forEach(function(el){ el.dataset.es = el.innerHTML; });

function canviaIdioma(l){
  document.documentElement.lang = l;
  traduibles.forEach(function(el){ el.innerHTML = el.dataset[l] || el.dataset.es; });
  document.querySelectorAll('a.wa[data-msg-es]').forEach(function(a){
    var msg = (l === 'ca' && a.dataset.msgCa) ? a.dataset.msgCa : a.dataset.msgEs;
    var base = a.href.split('?')[0];
    a.href = base + '?text=' + encodeURIComponent(msg);
  });
  document.querySelectorAll('.idioma button').forEach(function(b){ b.classList.toggle('on', b.dataset.lang === l); });
  try{ localStorage.setItem('idioma', l); }catch(e){}
}

document.querySelectorAll('.idioma button').forEach(function(b){
  b.addEventListener('click', function(){ canviaIdioma(b.dataset.lang); });
});

(function(){
  var inicial = 'es';
  try{
    var url = new URLSearchParams(location.search).get('lang');
    var nav = navigator.language.slice(0,2);
    inicial = url || localStorage.getItem('idioma') || (nav === 'ca' ? 'ca' : 'es');
  }catch(e){}
  if(inicial !== 'ca') inicial = 'es';
  canviaIdioma(inicial);
})();
