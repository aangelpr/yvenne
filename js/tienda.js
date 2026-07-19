/* ============================================================
   YVENNE — Motor de la tienda
   ⚠️ NO edites este archivo desde el panel: los datos editables
   (productos, precios, colores, textos) viven en js/datos.js
   y se administran desde admin.html.
   ============================================================ */

/* ---------- COLORES DEL SITIO (desde CONFIG) ---------- */
function aplicarColores(){
  const c = CONFIG.colores || {};
  const r = document.documentElement.style;
  if (c.fondo)  { r.setProperty("--cream", c.fondo); r.setProperty("--card", c.fondo); }
  if (c.tinta)  { r.setProperty("--ink", c.tinta); r.setProperty("--accent", c.tinta); }
  if (c.lineas) r.setProperty("--line", c.lineas);
  if (c.gris)   r.setProperty("--muted", c.gris);
  if (c.verde)  r.setProperty("--green", c.verde);
}
aplicarColores();

/* ---------- ARRANQUE: nube primero, respaldo local si falla ---------- */
function arrancarTienda(iniciarPagina){
  if (typeof cargarDatosNube === "function") {
    cargarDatosNube().then(() => { aplicarColores(); }).finally(iniciarPagina);
  } else {
    iniciarPagina();
  }
}

/* ---------- UTILIDADES ---------- */
function fmt(n){ return "$" + n.toLocaleString("es-MX", {minimumFractionDigits:2, maximumFractionDigits:2}); }
function getProducto(id){ return CATALOGO.find(p => p.id === id); }
function getCategoria(id){ return CATEGORIAS.find(c => c.id === id); }
function descuentoPct(p){ return p.precioAntes ? Math.round((1 - p.precio/p.precioAntes) * 100) : 0; }

/* ---------- CARRITO (localStorage, compartido entre páginas) ---------- */
function leerCarrito(){
  try { return JSON.parse(localStorage.getItem("yvenne_carrito")) || []; }
  catch(e){ return []; }
}
function guardarCarrito(c){
  localStorage.setItem("yvenne_carrito", JSON.stringify(c));
  actualizarBadgeCarrito();
}
function agregarAlCarrito(id, qty, color){
  const c = leerCarrito();
  const existente = c.find(i => i.id === id && i.color === (color || null));
  if (existente) existente.qty += qty;
  else c.push({ id, qty, color: color || null });
  guardarCarrito(c);
}
function contarCarrito(){
  return leerCarrito().reduce((s,i) => s + i.qty, 0);
}
function actualizarBadgeCarrito(){
  const n = contarCarrito();
  document.querySelectorAll("[data-cart-count]").forEach(el => el.textContent = n);
  document.querySelectorAll("[data-cart-badge]").forEach(el => {
    el.textContent = n;
    el.style.display = n > 0 ? "flex" : "none";
  });
}

/* ---------- FAVORITOS ---------- */
function leerFavoritos(){
  try { return JSON.parse(localStorage.getItem("yvenne_favoritos")) || []; }
  catch(e){ return []; }
}
function esFavorito(id){ return leerFavoritos().includes(id); }
function toggleFavorito(id){
  let f = leerFavoritos();
  if (f.includes(id)) f = f.filter(x => x !== id);
  else f.push(id);
  localStorage.setItem("yvenne_favoritos", JSON.stringify(f));
  return f.includes(id);
}

/* ---------- TARJETA DE PRODUCTO (HTML reutilizable) ---------- */
function fotosDe(p){
  if (p.imgs && p.imgs.length) return p.imgs;
  return p.img ? [p.img] : [];
}
function fotoPrincipal(p){ return fotosDe(p)[0] || null; }
function thumbStyle(p){
  const f = fotoPrincipal(p);
  return f
    ? `background-image:url('${f}'); background-size:cover; background-position:center;`
    : `background:${p.grad};`;
}
function cardHTML(p){
  const fav = esFavorito(p.id);
  const oferta = p.precioAntes
    ? `<span class="price-old">${fmt(p.precioAntes)}</span><span class="price-off">-${descuentoPct(p)}%</span>` : "";
  const badge = p.agotado
    ? `<span class="badge" style="background:var(--ink);color:#fff;">AGOTADO</span>`
    : (p.nuevo ? `<span class="badge">NUEVO</span>` : "");
  const swatches = p.colores
    ? `<div class="swatches">${p.colores.map(c => `<span class="swatch" style="background:${c[1]};"></span>`).join("")}</div>` : "";
  return `
  <div class="card" data-id="${p.id}">
    <a class="card-link" href="producto.html?id=${p.id}" aria-label="${p.nombre}">
      <div class="thumb-photo" style="${thumbStyle(p)}"></div>
    </a>
    ${badge}
    <button class="fav ${fav ? "is-fav" : ""}" data-fav="${p.id}" aria-label="Agregar a favoritos">
      <svg viewBox="0 0 24 24" fill="${fav ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.8" style="width:14px;height:14px;"><path d="M12 21C12 21 4 14.5 4 9a4.5 4.5 0 0 1 8-2.7A4.5 4.5 0 0 1 20 9c0 5.5-8 12-8 12z"/></svg>
    </button>
    <a class="caption sans" href="producto.html?id=${p.id}">
      <div class="name">${p.nombre}</div>
      ${p.sub ? `<div class="sub">${p.sub}</div>` : ""}
      <div class="price-row"><span class="price">${fmt(p.precio)}</span>${oferta}</div>
      ${swatches}
    </a>
  </div>`;
}

/* Activa los corazones de favoritos dentro de un contenedor */
function activarFavoritos(scope){
  (scope || document).querySelectorAll("[data-fav]").forEach(btn => {
    if (btn.dataset.favReady) return;
    btn.dataset.favReady = "1";
    btn.addEventListener("click", (e) => {
      e.preventDefault(); e.stopPropagation();
      const activo = toggleFavorito(btn.dataset.fav);
      btn.classList.toggle("is-fav", activo);
      btn.querySelector("svg").setAttribute("fill", activo ? "currentColor" : "none");
      if (typeof onFavoritoCambiado === "function") onFavoritoCambiado();
    });
  });
}

/* Animación de aparición */
function activarReveal(scope){
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) en.target.classList.add("in-view"); });
  }, { threshold: 0.15 });
  (scope || document).querySelectorAll(".card, .cat-card, .offer-card").forEach(el => obs.observe(el));
}

/* ---------- BÚSQUEDA ---------- */
function normalizar(s){
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
// Distancia de edición (Levenshtein) con corte temprano: cuántas letras hay
// que cambiar/insertar/borrar para convertir una palabra en otra
function distanciaEdicion(a, b, max){
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++){
    const cur = [i];
    let minFila = i;
    for (let j = 1; j <= b.length; j++){
      cur[j] = Math.min(prev[j] + 1, cur[j-1] + 1, prev[j-1] + (a[i-1] === b[j-1] ? 0 : 1));
      if (cur[j] < minFila) minFila = cur[j];
    }
    if (minFila > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}
// Errores de ortografía permitidos según el largo de la palabra buscada
function toleranciaPara(palabra){
  if (palabra.length <= 3) return 0;
  if (palabra.length <= 5) return 1;
  return 2;
}
function buscarProductos(q){
  const nq = normalizar(q.trim());
  if (!nq) return [];
  const palabrasBusqueda = nq.split(/\s+/);
  const resultados = [];
  CATALOGO.forEach(p => {
    const cat = getCategoria(p.categoria);
    const texto = normalizar(p.nombre + " " + (p.sub||"") + " " + (cat ? cat.nombre : ""));
    const palabrasTexto = texto.split(/\s+/);
    let puntaje = 0;
    const coincideTodo = palabrasBusqueda.every(pb => {
      if (texto.includes(pb)){ puntaje += 3; return true; }
      const tol = toleranciaPara(pb);
      for (const pt of palabrasTexto){
        if (pt.startsWith(pb)){ puntaje += 2; return true; }
        if (tol > 0 && distanciaEdicion(pb, pt, tol) <= tol){ puntaje += 1; return true; }
      }
      return false;
    });
    if (coincideTodo) resultados.push({ p, puntaje });
  });
  return resultados.sort((a, b) => b.puntaje - a.puntaje).map(r => r.p);
}
function activarBusqueda(){
  document.querySelectorAll("[data-search]").forEach(input => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && input.value.trim()) {
        window.location.href = "categoria.html?q=" + encodeURIComponent(input.value.trim());
      }
    });
  });
}

/* ---------- WHATSAPP ---------- */
function linkWhatsAppCarrito(){
  const c = leerCarrito();
  let msg = "Hola, quiero ordenar mi pedido de YVENNE:\n";
  let total = 0;
  c.forEach(i => {
    const p = getProducto(i.id);
    if (!p) return;
    const linea = p.precio * i.qty;
    total += linea;
    msg += `- ${p.nombre}${i.color ? " (Color: " + i.color + ")" : ""} x${i.qty} - ${fmt(linea)}\n`;
  });
  msg += `\nTotal: ${fmt(total)}`;
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
}
function linkWhatsAppProducto(p, qty, color){
  const msg = `Hola, me interesa este producto de YVENNE:\n- ${p.nombre}${color ? " (Color: " + color + ")" : ""} x${qty} - ${fmt(p.precio * qty)}`;
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
}

/* ---------- HEADER / NAV / FOOTER COMPARTIDOS ---------- */
function renderHeader(activo, placeholderBusqueda){
  const cont = document.getElementById("siteHeader");
  if (!cont) return;
  const links = [
    ["index.html", "Inicio", "inicio"],
    ["categoria.html?filtro=ofertas", "Ofertas", "ofertas"],
    ["categoria.html?filtro=masvendidos", "Más vendidos", "masvendidos"],
    ["terminos.html", "Términos y Políticas", "terminos"]
  ];
  cont.innerHTML = `
  <header>
    <div class="header-side left icons sans">
      <a class="icon-item" href="favoritos.html"><span class="glyph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21C12 21 4 14.5 4 9a4.5 4.5 0 0 1 8-2.7A4.5 4.5 0 0 1 20 9c0 5.5-8 12-8 12z"/></svg></span>Favoritos</a>
    </div>
    <a class="logo" href="index.html">YVENNE</a>
    <div class="header-side right icons sans">
      <a class="icon-item" href="carrito.html"><span class="glyph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg><span class="cart-badge" data-cart-badge>0</span></span>Carrito <span data-cart-count>0</span></a>
    </div>
  </header>
  <div class="search-row">
    <div class="search sans">
      <span class="glyph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
      <input type="text" data-search placeholder="${placeholderBusqueda || "Buscar productos, categorías..."}">
    </div>
  </div>
  <div class="marquee">
    <span class="marquee-track">${Array(6).fill((CONFIG.marquee || "ORDENA TU PEDIDO VÍA WHATSAPP").toUpperCase()).join(" &nbsp;•&nbsp; ")} &nbsp;•&nbsp;</span>
  </div>
  <nav class="sans">
    ${links.map(([href, txt, key]) => `<a href="${href}" ${key===activo ? 'class="active"' : ""}>${txt}</a>`).join("\n    ")}
  </nav>`;
}

function renderFooter(){
  const cont = document.getElementById("siteFooter");
  if (!cont) return;
  const cats = CATEGORIAS.slice(0, 6).map(c => `<a href="categoria.html?cat=${c.id}">${c.nombre}</a>`).join("");
  cont.innerHTML = `
  <footer id="contacto">
    <div class="foot-grid">
      <div class="foot-col">
        <h3>YVENNE</h3>
        <p>${CONFIG.footer.descripcion}</p>
      </div>
      <div class="foot-col">
        <div class="heading">Categorías</div>
        ${cats}
      </div>
      <div class="foot-col">
        <div class="heading">Ayuda</div>
        <a href="https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Hola, tengo una pregunta sobre YVENNE")}" target="_blank" rel="noopener">Contáctanos por WhatsApp</a>
        <a href="index.html#envios">Envíos y entregas</a>
        <a href="terminos.html#terminos">Términos y condiciones</a>
        <a href="terminos.html#privacidad">Política de privacidad</a>
      </div>
      ${(CONFIG.footer.instagram || CONFIG.footer.facebook) ? `
      <div class="foot-col">
        <div class="heading">Síguenos</div>
        <div class="socials">
          ${CONFIG.footer.instagram ? `<a href="${CONFIG.footer.instagram}" target="_blank" rel="noopener" aria-label="Instagram">IG</a>` : ""}
          ${CONFIG.footer.facebook ? `<a href="${CONFIG.footer.facebook}" target="_blank" rel="noopener" aria-label="Facebook">FB</a>` : ""}
        </div>
      </div>` : ""}
    </div>
    <div class="foot-bottom">
      <div>© ${new Date().getFullYear()} YVENNE. Todos los derechos reservados.</div>
      <div>Pagos por transferencia bancaria o efectivo · Entregas dentro de Oaxaca</div>
    </div>
  </footer>`;
}

/* ---------- INICIALIZACIÓN COMÚN ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderFooter();
  actualizarBadgeCarrito();
  activarBusqueda();
});

/* ---------- PORTADA (HERO) DEL INICIO ---------- */
function renderHero(){
  const cont = document.getElementById("heroMedia");
  const capa = document.getElementById("heroMediaLayer");
  if (!cont || !capa) return;
  const h = CONFIG.hero || {};
  const t = document.getElementById("heroTitulo");
  const s = document.getElementById("heroSubtitulo");
  const b = document.getElementById("heroBoton");
  if (t && h.titulo) t.innerHTML = h.titulo.replace(/\n/g, "<br>").replace(/&lt;br&gt;/g, "<br>");
  if (s && h.subtitulo) s.textContent = h.subtitulo;
  if (b && h.boton) b.textContent = h.boton;

  if (h.tipo === "video" && h.src) {
    cont.classList.add("con-media");
    capa.innerHTML = `<video src="${h.src}" autoplay muted loop playsinline></video>`;
  } else if (h.tipo === "imagen" && h.src) {
    cont.classList.add("con-media");
    capa.innerHTML = `<img src="${h.src}" alt="">`;
  } else {
    cont.classList.remove("con-media");
    capa.innerHTML = "";
    cont.style.background = h.grad || "linear-gradient(135deg,#EDE6DA,#C9BFA8)";
  }
}

/* ---------- PERKS DEL INICIO ---------- */
const PERK_ICONOS = [
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="1" y="7" width="13" height="9"/><path d="M14 10h4l3 3v3h-7z"/><circle cx="5.5" cy="18" r="1.5"/><circle cx="17.5" cy="18" r="1.5"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 14v4a2 2 0 0 1-2 2h-1"/><rect x="3" y="14" width="4" height="6" rx="1"/><rect x="17" y="14" width="4" height="6" rx="1"/></svg>'
];
function renderPerks(){
  const cont = document.getElementById("envios");
  if (!cont) return;
  cont.innerHTML = (CONFIG.perks || []).map((p, i) => `
    <div class="perk">
      <span class="glyph">${PERK_ICONOS[i % PERK_ICONOS.length]}</span>
      <div><div class="title">${p.titulo}</div><div class="sub">${p.sub}</div></div>
    </div>`).join("");
}

/* ---------- ORDEN Y VISIBILIDAD DE SECCIONES DEL INICIO ---------- */
function ordenarSecciones(){
  const lista = CONFIG.secciones || [];
  if (!lista.length) return;
  const mapa = {};
  lista.forEach(s => {
    const el = document.getElementById("sec-" + s.id);
    if (el) mapa[s.id] = el;
  });
  const primero = Object.values(mapa)[0];
  if (!primero) return;
  const padre = primero.parentNode;
  const ancla = document.getElementById("envios") || null;
  lista.forEach(s => {
    const el = mapa[s.id];
    if (!el) return;
    el.style.display = s.visible ? "" : "none";
    padre.insertBefore(el, ancla);
  });
}
