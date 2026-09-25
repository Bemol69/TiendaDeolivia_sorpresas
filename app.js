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

// tags: aromaticas | jabon | eternas | peluche | girasoles | cajas | mini
const PRODUCTS = [
  { id: 'stitch-60', name: 'Ramo gigante 60 rosas + Stitch', price: 62990, tags: ['jabon', 'peluche'], badge: 'Gigante',
    items: ['60 rosas de jabón', 'Peluche Stitch 25 cm', 'Mariposas', 'Dedicatoria (tarjeta y cinta)'] },
  { id: 'jabon-30', name: 'Ramo 30 rosas corona deluxe', price: 34990, tags: ['jabon'], badge: 'Graduación',
    items: ['30 rosas de jabón', 'Corona deluxe', 'Mariposas', 'Dedicatoria (tarjeta o cinta)'] },

  { id: 'aromaticas-22', name: 'Ramo rosas aromáticas x22', price: 25990, tags: ['aromaticas'], badge: 'Favorito',
    items: ['22 rosas color a elección', 'Chocolates', 'Mariposas', 'Corona', 'Dedicatoria (tarjeta o cinta)'] },
  { id: 'aromaticas-13', name: 'Ramo rosas aromáticas x13', price: 18990, tags: ['aromaticas'],
    items: ['13 rosas', 'Chocolates', 'Mariposas', 'Corona', 'Dedicatoria (tarjeta o cinta)'] },
  { id: 'aromaticas-8', name: 'Ramo rosas aromáticas x8', price: 12990, tags: ['aromaticas'],
    items: ['8 rosas', 'Chocolates', 'Mariposas', 'Dedicatoria'] },

  { id: 'stitch', name: 'Ramo rosas y peluche Stitch', price: 24990, tags: ['peluche', 'aromaticas'], badge: 'Rosado o azul',
    items: ['8 rosas aromáticas', 'Peluche Stitch 20 cm', 'Chocolates Valentte o Bon o Bon', 'Mariposas', 'Dedicatoria (tarjeta)'] },
  { id: 'angela', name: 'Ramo rosas y peluche Angela', price: 25990, tags: ['peluche'],
    items: ['Peluche Angela 20 cm', '11 rosas', 'Chocolates Valentte', 'Mariposas', 'Dedicatoria (tarjeta)'] },
  { id: 'jabon-22-kitty', name: '22 rosas de jabón + Hello Kitty', price: 37990, tags: ['peluche', 'jabon'], badge: 'Premium',
    items: ['22 rosas', 'Peluche Hello Kitty (o a elección)', 'Mariposas', 'Dedicatoria (tarjeta o cinta)'] },
  { id: 'eternas-kitty', name: 'Ramo rosas eternas Kitty', price: 27990, tags: ['peluche', 'eternas'],
    items: ['7 rosas eternas', 'Peluche Hello Kitty 25 cm', 'Mariposas', 'Dedicatoria (tarjeta o cinta)'] },
  { id: 'eternas-peluche', name: 'Rosas eternas con osito', price: 22990, tags: ['peluche', 'eternas'],
    items: ['7 rosas eternas', 'Tiara', 'Osito de peluche 25 cm', 'Caja love', 'Dedicatoria (tarjeta o cinta)'] },
  { id: 'kitty-angel', name: 'Ramo Hello Kitty', price: 18990, tags: ['peluche'],
    items: ['Peluche Hello Kitty', 'Rosas', 'Mariposas', 'Dedicatoria'] },
  { id: 'kitty-18', name: '18 rosas de jabón + Hello Kitty', price: 31990, tags: ['peluche', 'jabon'],
    items: ['18 rosas de jabón', '1 rosa eterna', 'Peluche Hello Kitty 25 cm', 'Mariposas', 'Dedicatoria (tarjeta o cinta)'] },
  { id: 'kitty-collar', name: 'Ramo Hello Kitty con collar', price: 26990, tags: ['peluche', 'jabon'],
    items: ['8 rosas de jabón', 'Peluche Hello Kitty 25 cm', 'Collar Hello Kitty', 'Mariposas', 'Tul perlado'] },
  { id: 'minnie', name: '22 rosas de jabón + Minnie', price: 30990, tags: ['peluche', 'jabon'],
    items: ['22 rosas de jabón', 'Peluche Minnie', 'Chocolate', 'Mariposas', 'Corona', 'Globo', 'Dedicatoria (tarjeta)'] },
  { id: 'angela-25', name: 'Ramo rosas de jabón + Angela', price: 24990, tags: ['peluche', 'jabon'],
    items: ['10 rosas de jabón', 'Peluche Angela 25 cm', 'Chocolate', 'Mariposas', 'Dedicatoria (tarjeta o cinta)'] },
  { id: 'peluche-dulces', name: 'Ramo peluche y dulces', price: 24990, tags: ['peluche', 'jabon'],
    items: ['8 rosas de jabón', '2 dulces a elección', 'Peluche de 25 cm', 'Dedicatoria (tarjeta)'] },
  { id: 'stitch-llaveros', name: 'Rosas eternas + Stitch y Angela', price: 17990, tags: ['peluche', 'eternas'],
    items: ['5 rosas eternas', '2 peluches llaveros Stitch', 'Mariposas', 'Dedicatoria (tarjeta)'] },

  { id: 'caja-kitty', name: 'Caja corazón Hello Kitty', price: 27990, tags: ['cajas', 'peluche'], badge: 'Te amo',
    items: ['11 rosas de jabón', 'Caja corazón', 'Caja de chocolates', 'Peluche Kitty 25 cm con tiara', 'Globo "Te amo"', 'Dedicatoria (tarjeta con fotos)'] },
  { id: 'caja-capibara', name: 'Caja corazón capibara', price: 17990, tags: ['cajas', 'eternas', 'peluche'],
    items: ['4 rosas eternas', 'Caja corazón', 'Capibara llavero', 'Globo', '3 chocolates en acrílico', 'Dedicatoria (tarjeta)'] },

  { id: 'girasoles-7', name: 'Ramo girasoles y rosas', price: 23990, tags: ['girasoles', 'jabon'],
    items: ['10 rosas de jabón', '7 girasoles', 'Chocolate', 'Mariposas', 'Globo', 'Dedicatoria (tarjeta)'] },
  { id: 'girasoles-3', name: 'Ramo rosas con 3 girasoles', price: 16990, tags: ['girasoles', 'jabon'],
    items: ['15 rosas de jabón', '3 girasoles', 'Mariposas', 'Dedicatoria (tarjeta)'] },

  { id: 'futbolero', name: 'Ramo futbolero', price: 16990, tags: ['jabon'], badge: 'Tu equipo',
    items: ['10 rosas de jabón', 'Chocolate', 'Mariposas', 'Chuchito y pelotas', 'Corona', 'Dedicatoria (tarjeta o cinta)'] },

  { id: 'jabon-22-rosa', name: 'Ramo rosas de jabón x22', price: 25990, tags: ['jabon'],
    items: ['22 rosas de jabón', 'Mariposas', 'Corona', 'Dedicatoria (tarjeta o cinta)'] },
  { id: 'jabon-22-rojo', name: 'Ramo rosas de jabón x22 rojas', price: 24990, tags: ['jabon'],
    items: ['22 rosas de jabón', 'Mariposas', 'Corona', 'Dedicatoria (tarjeta o cinta)'] },
  { id: 'jabon-13-mediano', name: 'Ramo rosas de jabón mediano', price: 18990, tags: ['jabon'],
    items: ['13 rosas', '1 rosa eterna', '4 chocolates en acrílicos', 'Mariposas', 'Corona', 'Dedicatoria (tarjeta o cinta)'] },
  { id: 'jabon-12-chocolate', name: 'Ramo 12 rosas con chocolates', price: 18990, tags: ['jabon'],
    items: ['12 rosas de jabón', 'Chocolates', 'Mariposas', 'Dedicatoria (tarjeta)'] },
  { id: 'jabon-15-eterna', name: 'Ramo 15 rosas + rosa eterna', price: 15990, tags: ['jabon', 'eternas'],
    items: ['15 rosas de jabón', '1 rosa eterna', 'Mariposas', 'Dedicatoria (tarjeta o cinta)'] },
  { id: 'jabon-13-tiara', name: 'Ramo 13 rosas con tiara', price: 14990, tags: ['jabon'],
    items: ['13 rosas de jabón', 'Chocolate', 'Mariposas', 'Tiara', 'Dedicatoria (tarjeta y cinta)'] },
  { id: 'jabon-10', name: 'Ramo rosas de jabón x10', price: 12990, tags: ['jabon'],
    items: ['10 rosas de jabón (colores a elección)', 'Mariposas', 'Chocolate', 'Dedicatoria (tarjeta o cinta)'] },
  { id: 'jabon-8-chocolates', name: 'Ramo 8 rosas con chocolates', price: 12990, tags: ['jabon'],
    items: ['8 rosas de jabón', '3 chocolates en acrílicos', 'Mariposas', 'Corona', 'Dedicatoria (tarjeta)'] },
  { id: 'jabon-12', name: 'Ramo rosas de jabón x12', price: 9990, tags: ['jabon'], badge: 'Económico',
    items: ['12 rosas', 'Mariposas', 'Dedicatoria (tarjeta o cinta)'] },

  { id: 'eternas-10', name: 'Ramo rosas eternas x10', price: 17990, tags: ['eternas'],
    items: ['10 rosas eternas', 'Mariposas', 'Dedicatoria (tarjeta)'] },
  { id: 'eternas-8', name: 'Ramo rosas eternas x8', price: 15990, tags: ['eternas'],
    items: ['8 rosas eternas', 'Mariposas', 'Corona', 'Dedicatoria (tarjeta o cinta)'] },
  { id: 'eternas-7', name: 'Ramo rosas eternas x7', price: 12990, tags: ['eternas'],
    items: ['7 rosas eternas', 'Mariposas', 'Tiara', 'Dedicatoria (tarjeta o cinta)'] },

  { id: 'mini-kuromi', name: 'Mini ramo Kuromi', price: 13000, tags: ['mini', 'peluche'],
    items: ['4 rosas de jabón', '2 chocolates en acrílicos', 'Peluche llavero Kuromi', 'Mariposa', 'Tul perlado', 'Dedicatoria (tarjeta)'] },
  { id: 'mini-kitty', name: 'Mini ramo Hello Kitty', price: 12000, tags: ['mini', 'peluche'],
    items: ['5 rosas de jabón', 'Peluche llavero Hello Kitty', 'Mariposa', 'Tul perlado', 'Dedicatoria (tarjeta)'] },
  { id: 'mini-3', name: 'Mini ramo 3 rosas', price: 4990, tags: ['mini', 'jabon'], badge: 'Desde $4.990',
    items: ['3 rosas de jabón', '2 chocolates', 'Mariposas', 'Dedicatoria (tarjeta)'] },
];

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
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
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
    <article class="card">
      <div class="card__img">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
        <img src="img/${p.id}.jpg" alt="${p.name}" loading="lazy">
      </div>
      <div class="card__body">
        <h3>${p.name}</h3>
        <ul>${p.items.map((i) => `<li>${i}</li>`).join('')}</ul>
        <div class="card__foot">
          <span class="price">${clp(p.price)}</span>
          <button class="btn btn--primary btn--sm" data-order="${p.id}">Hacer pedido</button>
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

fRamo.innerHTML =
  `<option value="${CUSTOM.id}">✨ ${CUSTOM.name} (a cotizar)</option>` +
  PRODUCTS.map((p) => `<option value="${p.id}">${p.name} (${clp(p.price)})</option>`).join('');

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

renderFilters('todos');
renderProducts('todos');
