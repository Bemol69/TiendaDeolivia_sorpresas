// ===== CONFIGURACIÓN =====
// Número de WhatsApp en formato internacional, solo dígitos (Chile: 56 + 9 + 8 dígitos)
const WHATSAPP_NUMBER = '56985293655';

// Días mínimos de anticipación según tipo de entrega
const LEAD_DAYS = { retiro: 2, domicilio: 2, region: 6 };

const ENTREGAS = {
  retiro: 'Retiro presencial en Rancagua',
  domicilio: 'Despacho a domicilio',
  region: 'Envío a región',
};

// Los productos se editan desde el panel /admin y se guardan en data/productos.json
// categorias: aromaticas | jabon | eternas | peluche | girasoles | cajas | mini
let PRODUCTS = [];

const CUSTOM = { id: 'personalizado', name: 'Ramo 100% personalizado', price: 0 };

const FILTERS = [
  ['todos', 'Todos'],
  ['aromaticas', 'Rosas aromáticas'],
  ['jabon', 'Rosas de jabón'],
  ['eternas', 'Rosas eternas'],
  ['peluche', 'Con peluche'],
  ['girasoles', 'Girasoles'],
  ['cajas', 'Cajas corazón'],
  ['mini', 'Mini ramos'],
];

const SORTS = {
  destacados: null,
  'precio-asc': (a, b) => a.price - b.price,
  'precio-desc': (a, b) => b.price - a.price,
};

const EXTRAS = ['🧸 Peluche', '🎈 Globos', '🍫 Chocolates Valentte', '🍫 Chocolates Ferrero', '🍬 Dulces',
  '🦋 Mariposas extra', '👑 Corona / tiara', '🤍 Perlas', '🎁 Caja', '🎀 Papel especial'];

// ===== UTILIDADES =====
const clp = (n) => '$' + n.toLocaleString('es-CL');
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const findProduct = (id) => (id === CUSTOM.id ? CUSTOM : PRODUCTS.find((p) => p.id === id));
// Se usa api.whatsapp.com y no wa.me: la redirección de wa.me rompe los emojis (llegan como �)
const waUrl = (text) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}${text ? '&text=' + encodeURIComponent(text) : ''}`;

function isoPlusDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const off = d.getTimezoneOffset() * 60000;
  return new Date(d - off).toISOString().split('T')[0];
}

function nextOrderNumber() {
  // Correlativo guardado en este navegador (empieza en 0142)
  let n = 141;
  try { n = parseInt(localStorage.getItem('orderCounter') || '141', 10) || 141; } catch (e) {}
  return String(n + 1).padStart(4, '0');
}
function commitOrderNumber(num) {
  try { localStorage.setItem('orderCounter', String(parseInt(num, 10))); } catch (e) {}
}

// ===== CATÁLOGO =====
const grid = $('#productGrid');
const filters = $('#filters');

function renderFilters(active) {
  const count = (k) => (k === 'todos' ? PRODUCTS.length : PRODUCTS.filter((p) => p.tags.includes(k)).length);
  filters.innerHTML = FILTERS
    .filter(([k]) => count(k) > 0) // oculta categorías vacías
    .map(([k, label]) => `<button class="tab ${k === active ? 'is-active' : ''}" role="tab" aria-selected="${k === active}" data-cat="${k}">${label}<span class="tab__n">${count(k)}</span></button>`)
    .join('');
}

let currentCat = 'todos';

function renderProducts(cat = currentCat) {
  currentCat = cat;
  let list = cat === 'todos' ? PRODUCTS : PRODUCTS.filter((p) => p.tags.includes(cat));
  const sort = SORTS[$('#sort').value];
  if (sort) list = [...list].sort(sort);
  $('#count').innerHTML = `Mostrando <strong>${list.length}</strong> ${list.length === 1 ? 'ramo' : 'ramos'}`;
  grid.innerHTML = list.map((p) => `
    <article class="card${p.agotado ? ' is-soldout' : ''}">
      <div class="card__img">
        ${p.agotado ? '<span class="badge badge--soldout">Agotado</span>' : p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ''}
        <img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy">
      </div>
      <div class="card__body">
        <h3>${esc(p.name)}</h3>
        ${p.desc ? `<p class="card__desc">${esc(p.desc)}</p>` : ''}
        <ul>${p.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
        <div class="card__foot">
          <span class="price">${clp(p.price)}</span>
          ${p.agotado
            ? `<a class="btn btn--ghost btn--sm" target="_blank" rel="noopener" href="${esc(waUrl(`Hola! ¿Tienen stock de ${p.name}? 🌸`))}">Consultar stock</a>`
            : `<button class="btn btn--primary btn--sm" data-order="${p.id}">Hacer pedido</button>`}
        </div>
      </div>
    </article>`).join('');
}

filters.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-cat]');
  if (!btn) return;
  renderFilters(btn.dataset.cat);
  renderProducts(btn.dataset.cat);
});
$('#sort').addEventListener('change', () => renderProducts());

// ===== FORMULARIO / MODAL =====
const modal = $('#orderModal');
const form = $('#orderForm');
const fRamo = $('#fRamo');
const fFecha = $('#fFecha');
const fPago = $('#fPago');
let orderNumber = nextOrderNumber();

function renderRamoOptions() {
  fRamo.innerHTML =
    `<option value="${CUSTOM.id}">✨ ${CUSTOM.name} (a cotizar)</option>` +
    PRODUCTS.filter((p) => !p.agotado)
      .map((p) => `<option value="${p.id}">${esc(p.name)} (${clp(p.price)})</option>`).join('');
}

$('#fExtras').innerHTML = EXTRAS
  .map((x) => `<label><input type="checkbox" value="${x}"><span>${x}</span></label>`)
  .join('');

const entrega = () => form.querySelector('input[name="entrega"]:checked').value;

function syncDelivery() {
  const tipo = entrega();
  document.querySelectorAll('[data-delivery]').forEach((el) => { el.hidden = tipo === 'retiro'; });

  const min = isoPlusDays(LEAD_DAYS[tipo]);
  fFecha.min = min;
  if (fFecha.value && fFecha.value < min) fFecha.value = '';

  // Efectivo solo si retira presencialmente
  [...fPago.options].find((o) => o.value === 'Efectivo').disabled = tipo !== 'retiro';
  if (tipo !== 'retiro') fPago.value = 'Transferencia';

  $('#fHint').textContent = tipo === 'retiro'
    ? `📌 Agenda con 2 a 4 días de anticipación. Se reserva con abono del 50%.`
    : tipo === 'domicilio'
      ? `📌 Agenda con 2 a 4 días de anticipación. Se paga el 100% por transferencia. Despacho a coordinar.`
      : `📌 Agenda con mínimo 6 días de anticipación. Se paga el 100% por transferencia. Envío a coordinar.`;
}

function getOrder() {
  const tipo = entrega();
  return {
    product: findProduct(fRamo.value),
    colores: $('#fColores').value.trim(),
    extras: [...document.querySelectorAll('#fExtras input:checked')].map((i) => i.value.replace(/^\S+\s/, '')),
    tipo,
    comuna: tipo === 'retiro' ? '' : $('#fComuna').value.trim(),
    direccion: tipo === 'retiro' ? '' : $('#fDireccion').value.trim(),
    fecha: fFecha.value,
    recibe: $('#fRecibe').value.trim(),
    dedicatoria: $('#fDedicatoria').value.trim(),
    dedFormato: $('#fDedFormato').value,
    cliente: $('#fCliente').value.trim(),
    pago: fPago.value,
  };
}

// *texto* = negrita y _texto_ = cursiva en WhatsApp
function buildMessage(o) {
  const custom = o.product.id === CUSTOM.id;
  const L = [`🌸✨ *PEDIDO #${orderNumber}* ✨🌸`, '━━━━━━━━━━━━━━━'];
  L.push(`💐 *Ramo:* ${o.product.name}${custom ? '' : ` (${clp(o.product.price)})`}`);
  if (o.colores) L.push(`🎨 *Colores:* ${o.colores}`);
  if (o.extras.length) L.push(`🎀 *Extras:* ${o.extras.join(', ')}`);
  L.push(`🚚 *Entrega:* ${ENTREGAS[o.tipo]}`);
  if (o.comuna) L.push(`📍 *Comuna/Ciudad:* ${o.comuna}`);
  if (o.direccion) L.push(`🏠 *Dirección:* ${o.direccion}`);
  if (o.fecha) L.push(`📅 *Fecha:* ${o.fecha.split('-').reverse().join('/')}`);
  if (o.recibe) L.push(`🎁 *Recibe:* ${o.recibe}`);
  if (o.dedicatoria) L.push(`💌 *Dedicatoria (${o.dedFormato.toLowerCase()}):* _"${o.dedicatoria}"_`);
  if (o.cliente) L.push(`🙋 *Envía:* ${o.cliente}`);
  L.push(`💳 *Pago:* ${o.pago}`);
  L.push('━━━━━━━━━━━━━━━');
  L.push(custom ? '💰 *TOTAL: A cotizar*' : `💰 *TOTAL RAMO: ${clp(o.product.price)}*`);
  const pendientes = [];
  if (o.extras.length) pendientes.push('extras');
  if (o.tipo !== 'retiro') pendientes.push(o.tipo === 'region' ? 'envío' : 'despacho');
  if (pendientes.length && !custom) L.push(`_(+ ${pendientes.join(' y ')} a coordinar)_`);
  L.push('');
  L.push('¡Hola! Quiero agendar este pedido 🌷');
  return L.join('\n');
}

// Vista previa con el formato de WhatsApp
function formatPreview(text) {
  return esc(text)
    .replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>')
    .replace(/(^|\s)_([^_\n]+)_/g, '$1<em>$2</em>');
}

function update() {
  const o = getOrder();
  $('#msgPreview').innerHTML = formatPreview(buildMessage(o));
  $('#fTotal').textContent = o.product.id === CUSTOM.id ? 'A cotizar' : clp(o.product.price);
}

function openModal(productId) {
  if (productId && findProduct(productId)) fRamo.value = productId;
  $('#formError').hidden = true;
  syncDelivery();
  update();
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
  const orderBtn = e.target.closest('[data-order]');
  if (orderBtn) { openModal(orderBtn.dataset.order); return; }
  if (e.target.closest('[data-close]')) closeModal();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
form.addEventListener('input', update);
form.addEventListener('change', (e) => {
  if (e.target.name === 'entrega') syncDelivery();
  update();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const o = getOrder();
  const missing = [];
  if (!o.recibe) missing.push('quién recibe');
  if (o.tipo !== 'retiro' && !o.comuna) missing.push('comuna o ciudad');
  if (o.tipo !== 'retiro' && !o.direccion) missing.push('dirección');
  if (o.product.id === CUSTOM.id && !o.colores && !o.extras.length) missing.push('colores o extras de tu ramo personalizado');
  if (missing.length) {
    const err = $('#formError');
    err.textContent = 'Falta completar: ' + missing.join(', ') + '.';
    err.hidden = false;
    return;
  }
  window.open(waUrl(buildMessage(o)), '_blank', 'noopener');
  commitOrderNumber(orderNumber);
  orderNumber = nextOrderNumber();
  form.reset();
  closeModal();
});

$('#footerWa').href = waUrl();
$('#contactWa').href = waUrl();
$('#contactWaBtn').href = waUrl();

// Abierto / cerrado según la hora de Chile (07:00 – 23:00)
(function openStatus() {
  const el = $('#openStatus');
  const hour = parseInt(new Intl.DateTimeFormat('es-CL', { hour: 'numeric', hourCycle: 'h23', timeZone: 'America/Santiago' }).format(new Date()), 10);
  const open = hour >= 7 && hour < 23;
  el.textContent = open ? 'Abierto ahora' : 'Cerrado';
  el.className = 'status ' + (open ? 'is-open' : 'is-closed');
})();

// ===== CARGA DE PRODUCTOS =====
const slug = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function loadProducts() {
  try {
    const res = await fetch('data/productos.json', { cache: 'no-cache' });
    const data = await res.json();
    PRODUCTS = (data.productos || [])
      .filter((p) => p.visible !== false && p.nombre)
      .map((p, i) => ({
        id: `${slug(p.nombre)}-${i}`,
        name: p.nombre,
        price: Number(p.precio) || 0,
        // el CMS guarda "/img/productos/x.jpg"; sin la barra inicial funciona también en GitHub Pages
        img: (p.foto || 'img/logo.jpg').replace(/^\//, ''),
        desc: p.descripcion || '',
        items: Array.isArray(p.incluye) ? p.incluye.filter(Boolean) : [],
        tags: Array.isArray(p.categorias) ? p.categorias : [],
        badge: p.etiqueta || '',
        agotado: !!p.agotado,
      }));
  } catch (e) {
    console.error(e);
    grid.innerHTML = '<p class="muted">No se pudo cargar el catálogo. Intenta recargar la página.</p>';
  }
  renderFilters('todos');
  renderProducts('todos');
  renderRamoOptions();
}

loadProducts();
