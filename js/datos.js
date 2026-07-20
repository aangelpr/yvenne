/* ============================================================
   YVENNE — DATOS DE LA TIENDA
   ⚠️ Este archivo lo genera el panel de control (admin.html).
   Aquí vive TODO lo editable: configuración, categorías y catálogo.
   Si lo editas a mano, respeta el formato.
   ============================================================ */

var CONFIG = {
  /* Número de WhatsApp (52 + 10 dígitos, sin espacios) */
  whatsapp: "526642867257",

  /* Texto del letrero negro que corre arriba */
  marquee: "ORDENA TU PEDIDO VÍA WHATSAPP",

  /* Colores del sitio */
  colores: {
    fondo:  "#FFFFFF",   /* fondo general */
    tinta:  "#111111",   /* textos y botones principales */
    lineas: "#E5E5E5",   /* bordes y separadores */
    gris:   "#8A8A8A",   /* textos secundarios */
    verde:  "#3F6B4A"    /* botón de WhatsApp */
  },

  /* Portada del inicio */
  hero: {
    tipo: "gradiente",            /* "gradiente" | "imagen" | "video" */
    src: "",                      /* ruta del archivo si tipo es imagen o video (ej. "img/hero.jpg") */
    grad: "linear-gradient(135deg,#EDE6DA,#C9BFA8)",
    titulo: "Encuentra todo\nlo que necesitas",
    subtitulo: "Miles de productos para ti y tu hogar, al mejor precio.",
    boton: "Ver productos",
    ajuste: "cubrir",             /* "cubrir" (puede recortar) | "completa" (sin recorte) */
    posX: 50,                     /* posición horizontal de la imagen (0-100) */
    posY: 50                      /* posición vertical de la imagen (0-100) */
  },

  /* Etiquetas personalizadas (ej. "Entrega inmediata"): se palomean por
     producto, tienen su página (categoria.html?tag=id) y su sección en el inicio */
  etiquetas: [],

  /* Secciones del inicio: orden y visibilidad */
  secciones: [
    { id: "categorias", visible: true },
    { id: "ofertas",    visible: true },
    { id: "novedades",  visible: true }
  ],

  /* Las 4 ventajas de abajo del inicio */
  perks: [
    { titulo: "Entregas dentro de Oaxaca", sub: "Tu pedido tarda de 4 a 7 días en llegar. Ordena con tiempo si lo necesitas antes." },
    { titulo: "Compra con confianza",      sub: "Confirmamos tu pedido directamente contigo por WhatsApp" },
    { titulo: "Productos de calidad",      sub: "Lo mejor para ti" },
    { titulo: "Atención al cliente",       sub: "Siempre estamos para ayudarte" }
  ],

  /* Pie de página */
  footer: {
    descripcion: "Todo lo que necesitas para crear espacios cómodos, prácticos y con estilo.",
    instagram: "",
    facebook:  ""
  }
};

/* ---------- CATEGORÍAS ---------- */
var CATEGORIAS = [
  { id: "hogar",            nombre: "Hogar",              desc: "Todo para crear espacios cómodos, prácticos y con estilo.", grad: "linear-gradient(160deg,#E8E1D4,#B7A98A)" },
  { id: "cocina",           nombre: "Cocina",             desc: "Utensilios y accesorios para tu cocina de todos los días.", grad: "linear-gradient(160deg,#EDE3D0,#C7B999)" },
  { id: "limpieza",         nombre: "Limpieza",           desc: "Mantén tu casa impecable con estos básicos.",               grad: "linear-gradient(160deg,#F1EDE4,#D8CFBC)" },
  { id: "ninos",            nombre: "Niños",              desc: "Artículos prácticos y divertidos para los más pequeños.",   grad: "linear-gradient(160deg,#DCC9A6,#B08B54)" },
  { id: "decoracion",       nombre: "Decoración",         desc: "Detalles que transforman cualquier espacio.",               grad: "linear-gradient(160deg,#E4D9C6,#B8A582)" },
  { id: "cuidado-personal", nombre: "Cuidado personal",   desc: "Para consentirte todos los días.",                          grad: "linear-gradient(160deg,#EFE7DA,#D6C6AC)" },
  { id: "mascotas",         nombre: "Mascotas",           desc: "Lo que tu mejor amigo necesita.",                           grad: "linear-gradient(160deg,#E9D9BC,#C7A46C)" },
  { id: "juguetes",         nombre: "Juguetes y peluches",desc: "Diversión y ternura para regalar o quedarte.",              grad: "linear-gradient(160deg,#DCC49B,#A9793E)" },
  { id: "fiestas",          nombre: "Fiestas",            desc: "Todo para celebrar tus momentos especiales.",               grad: "linear-gradient(160deg,#E7D8C9,#C7A98D)" },
  { id: "general",          nombre: "Producto general",   desc: "Variedad de artículos útiles al mejor precio.",             grad: "linear-gradient(160deg,#D5D5D5,#8A8A8A)" }
];

/* ---------- CATÁLOGO DE PRODUCTOS ----------
   img: null  → se muestra el degradado (grad) como placeholder.
   nuevo / masVendido → controlan las secciones "Novedades" y "Más vendidos".
   precioAntes → si existe, el producto aparece en "Ofertas" con su descuento. */
var CATALOGO = [
  { id: "florero-ceramico",  nombre: "Florero cerámico minimalista", sub: "",                 precio: 249, categoria: "decoracion", nuevo: true,  masVendido: true,  colores: null, desc: "Florero de cerámica con acabado mate y silueta minimalista. Ideal para flores frescas o secas, o como pieza decorativa por sí solo.", grad: "linear-gradient(160deg,#EDE6DA,#C9BFA8)", img: null },
  { id: "vela-vainilla",     nombre: "Vela aromática de vainilla 200 g", sub: "200 g",        precio: 199, precioAntes: 279, categoria: "hogar", masVendido: true, colores: [["Ámbar","#8A5A2E"],["Blanco","#F2EEE6"],["Verde","#4F6B4A"],["Rosa","#E6A9A6"]], desc: "Vela artesanal con aroma cálido de vainilla. Aproximadamente 40 horas de quemado. Perfecta para crear un ambiente acogedor en cualquier espacio.", grad: "linear-gradient(160deg,#3E2A1C,#8A5A2E)", img: null },
  { id: "cojin-decorativo",  nombre: "Cojín decorativo", sub: "45x45 cm",                     precio: 299, categoria: "decoracion", colores: [["Beige","#D8C9AE"],["Negro","#3E3A34"],["Olivo","#6E7A5E"],["Rosa","#D9A6A0"]], desc: "Cojín suave con funda de tela texturizada y cierre oculto. Medida 45x45 cm, relleno incluido.", grad: "linear-gradient(160deg,#DDD3C3,#B7A88E)", img: null },
  { id: "lampara-ceramica",  nombre: "Lámpara de mesa cerámica", sub: "",                     precio: 599, categoria: "hogar", nuevo: true, colores: [["Beige","#D8C9AE"],["Negro","#3E3A34"],["Olivo","#6E7A5E"]], desc: "Lámpara de mesa con base de cerámica y pantalla de tela. Da una luz cálida perfecta para recámaras y salas.", grad: "linear-gradient(160deg,#EDE3D0,#C7B999)", img: null },
  { id: "luces-led",         nombre: "Serie de luces LED", sub: "5 metros",                   precio: 149, categoria: "decoracion", masVendido: true, colores: null, desc: "Serie de 5 metros con luces LED cálidas. Funciona con USB. Ideal para decorar recámaras, fiestas o fechas especiales.", grad: "linear-gradient(160deg,#2B2118,#5A4530)", img: null },
  { id: "manta-tejida",      nombre: "Manta tejida suave", sub: "130x170 cm",                 precio: 449, categoria: "hogar", colores: [["Beige","#E7D9BE"],["Gris","#C9C2B4"],["Olivo","#7A8065"]], desc: "Manta tejida extra suave de 130x170 cm. Perfecta para el sillón o los pies de la cama.", grad: "linear-gradient(160deg,#B9A98B,#7A6B4F)", img: null },
  { id: "espejo-irregular",  nombre: "Espejo decorativo irregular", sub: "",                  precio: 799, categoria: "decoracion", nuevo: true, colores: null, desc: "Espejo de forma orgánica irregular, sin marco. Se cuelga fácilmente y da un toque moderno a cualquier pared.", grad: "linear-gradient(160deg,#E4DACB,#9A8C6E)", img: null },
  { id: "maceta-madera",     nombre: "Maceta decorativa", sub: "con base de madera",          precio: 349, categoria: "decoracion", colores: [["Beige","#D8C9AE"],["Negro","#3E3A34"],["Olivo","#6E7A5E"]], desc: "Maceta de cerámica con base de madera natural. Para plantas naturales o artificiales de tamaño mediano.", grad: "linear-gradient(160deg,#EFEAE0,#4E6B44)", img: null },
  { id: "olla-ceramica",     nombre: "Olla de cerámica con tapa", sub: "24 cm / 4.2 L",       precio: 699, precioAntes: 999, categoria: "cocina", masVendido: true, colores: null, desc: "Olla de cerámica de 24 cm con capacidad de 4.2 litros. Retiene el calor de manera uniforme, apta para estufa y horno.", grad: "linear-gradient(160deg,#E8E1D4,#B7A98A)", img: null },
  { id: "canasta-mimbre",    nombre: "Canasta organizadora", sub: "de mimbre",                precio: 279, precioAntes: 399, categoria: "hogar", colores: null, desc: "Canasta tejida de mimbre para organizar mantas, juguetes o ropa. Resistente y decorativa.", grad: "linear-gradient(160deg,#C9A876,#8C6A3E)", img: null },
  { id: "difusor-aromas",    nombre: "Difusor de aromas", sub: "120 ml",                      precio: 189, precioAntes: 269, categoria: "cuidado-personal", colores: null, desc: "Difusor ultrasónico de 120 ml con luz ambiental. Incluye apagado automático. Aceites se venden por separado.", grad: "linear-gradient(160deg,#DCD2C0,#A6906A)", img: null },
  { id: "set-toallas",       nombre: "Set de toallas", sub: "3 piezas",                       precio: 249, precioAntes: 349, categoria: "hogar", colores: [["Blanco","#F2EEE6"],["Beige","#D8C9AE"],["Gris","#C9C2B4"]], desc: "Set de 3 toallas de algodón suave y absorbente: baño, medio baño y facial.", grad: "linear-gradient(160deg,#F1EDE4,#D8CFBC)", img: null },
  { id: "bolso-mano",        nombre: "Bolso de mano", sub: "",                                precio: 459, precioAntes: 659, categoria: "general", nuevo: true, colores: [["Camel","#A9793E"],["Negro","#3E3A34"]], desc: "Bolso de mano amplio con cierre y bolsillo interior. Material tipo piel de alta duración.", grad: "linear-gradient(160deg,#E0D2BC,#A9895E)", img: null },
  { id: "audifonos",         nombre: "Audífonos inalámbricos", sub: "",                       precio: 399, precioAntes: 599, categoria: "general", masVendido: true, colores: [["Blanco","#F2EEE6"],["Negro","#3E3A34"]], desc: "Audífonos Bluetooth con estuche de carga. Hasta 20 horas de batería total y micrófono integrado.", grad: "linear-gradient(160deg,#F1F1EE,#D6D6D0)", img: null },
  { id: "licuadora",         nombre: "Licuadora", sub: "1.5 L",                               precio: 699, precioAntes: 999, categoria: "cocina", colores: null, desc: "Licuadora de 1.5 litros con vaso de vidrio y 3 velocidades más pulso. Cuchillas de acero inoxidable.", grad: "linear-gradient(160deg,#E7E2D8,#B9B0A0)", img: null },
  { id: "reloj-inteligente", nombre: "Reloj inteligente", sub: "",                            precio: 899, precioAntes: 1299, categoria: "general", nuevo: true, colores: [["Negro","#3E3A34"],["Rosa","#E6A9A6"]], desc: "Smartwatch con monitor de ritmo cardiaco, notificaciones y hasta 7 días de batería. Compatible con Android y iPhone.", grad: "linear-gradient(160deg,#2B2118,#4C4038)", img: null },
  { id: "sueter-basico",     nombre: "Suéter básico", sub: "",                                precio: 299, precioAntes: 449, categoria: "general", colores: [["Beige","#E7D9BE"],["Negro","#3E3A34"],["Olivo","#7A8065"]], desc: "Suéter básico unisex de tejido suave. Corte holgado, disponible en varios colores.", grad: "linear-gradient(160deg,#DCCBA9,#B79E77)", img: null },
  { id: "jabon-artesanal",   nombre: "Jabón artesanal", sub: "pieza 100 g",                   precio: 79,  categoria: "cuidado-personal", nuevo: true, colores: null, desc: "Jabón artesanal elaborado con ingredientes naturales. Aromas surtidos.", grad: "linear-gradient(160deg,#EFE7DA,#D6C6AC)", img: null },
  { id: "plato-mascota",     nombre: "Plato doble para mascota", sub: "con base antiderrapante", precio: 189, categoria: "mascotas", colores: null, desc: "Plato doble de acero inoxidable con base antiderrapante. Fácil de lavar, para perros y gatos.", grad: "linear-gradient(160deg,#E9D9BC,#C7A46C)", img: null },
  { id: "peluche-oso",       nombre: "Peluche de oso", sub: "35 cm",                          precio: 259, categoria: "juguetes", masVendido: true, colores: null, desc: "Oso de peluche suave de 35 cm. Materiales hipoalergénicos, ideal para regalo.", grad: "linear-gradient(160deg,#DCC49B,#A9793E)", img: null },
  { id: "globos-fiesta",     nombre: "Set de globos", sub: "50 piezas",                       precio: 129, categoria: "fiestas", colores: [["Dorado","#C7A46C"],["Rosa","#E6A9A6"],["Blanco","#F2EEE6"]], desc: "Set de 50 globos de látex en tonos combinados, listos para decorar cualquier celebración.", grad: "linear-gradient(160deg,#E7D8C9,#C7A98D)", img: null },
  { id: "trapeador-plano",   nombre: "Trapeador plano con repuesto", sub: "",                 precio: 219, categoria: "limpieza", colores: null, desc: "Trapeador de microfibra plano con mango extensible y un repuesto extra. Lavable en máquina.", grad: "linear-gradient(160deg,#F1EDE4,#D8CFBC)", img: null },
  { id: "vasos-ninos",       nombre: "Set de vasos infantiles", sub: "4 piezas",              precio: 149, categoria: "ninos", colores: null, desc: "Set de 4 vasos irrompibles con diseños divertidos. Libres de BPA, aptos para lavavajillas.", grad: "linear-gradient(160deg,#DCC9A6,#B08B54)", img: null }
];
