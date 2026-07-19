/* ============================================================
   YVENNE — Conexión con la nube (Supabase)
   Pega aquí los datos de tu proyecto (paso 4 de la guía).
   Si los dejas vacíos, la tienda funciona con js/datos.js
   como siempre (modo sin nube).
   ============================================================ */

const SUPABASE_URL = "https://tqngknsvpcywzmtnjvij.supabase.co";   // ej. "https://abcdefgh.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxbmdrbnN2cGN5d3ptdG5qdmlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0OTA5MjYsImV4cCI6MjEwMDA2NjkyNn0.If2WVSlChNC2n0uzqzs2ru-AFBzlwKvX6oDW3k_um14";   // la llave "anon public" (es pública, no pasa nada por mostrarla)

/* Descarga los datos de la tienda desde la nube y reemplaza
   los de js/datos.js. Si no hay internet o tarda más de 3.5 s,
   se queda con el respaldo local y la tienda sigue jalando. */
async function cargarDatosNube(){
  if (!SUPABASE_URL || !SUPABASE_KEY) return false;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 3500);
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/tienda?id=eq.1&select=config,categorias,catalogo`,
      { headers: { apikey: SUPABASE_KEY, Authorization: "Bearer " + SUPABASE_KEY }, signal: ctrl.signal }
    );
    clearTimeout(timer);
    if (!r.ok) return false;
    const filas = await r.json();
    if (!filas.length) return false;
    const t = filas[0];
    if (t.config)     CONFIG     = t.config;
    if (t.categorias) CATEGORIAS = t.categorias;
    if (t.catalogo)   CATALOGO   = t.catalogo;
    return true;
  } catch(e){
    clearTimeout(timer);
    return false; // sin conexión: la tienda usa el respaldo local
  }
}
