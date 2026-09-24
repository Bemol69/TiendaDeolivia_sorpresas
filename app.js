// ===== CONFIGURACIÓN =====
// Número de WhatsApp en formato internacional, solo dígitos (Chile: 56 + 9 + 8 dígitos)
const WHATSAPP_NUMBER = '56985293655';

const img = (id) => `https://images.unsplash.com/photo-${id}?w=600&q=80`;

const PRODUCTS = [
  { id: 'rosas-rojas-12', name: 'Rosas rojas x12', price: 25990, cat: 'Rosas', badge: 'Más vendido', desc: 'Clásico e infalible. Doce rosas rojas con follaje y papel kraft.', img: img('1591886960571-74d43a9d4166') },
  { id: 'rosas-rosadas-24', name: 'Rosas rosadas x24', price: 39990, cat: 'Rosas', desc: 'Dos docenas de rosas rosadas para un gesto que no se olvida.', img: img('1455659817273-f96807779a8a') },
  { id: 'caja-rosas', name: 'Caja de rosas', price: 34990, cat: 'Rosas', badge: 'Nuevo', desc: 'Rosas en caja sombrerera, elegante y lista para regalar.', img: img('1563241527-3004b7be0ffd') },
  { id: 'tulipanes', name: 'Tulipanes mixtos x10', price: 22990, cat: 'Temporada', desc: 'Tulipanes de colores, frescos y alegres.', img: img('1490750967868-88aa4486c946') },
  { id: 'girasoles', name: 'Girasoles x6', price: 18990, cat: 'Temporada', desc: 'Energía pura: seis girasoles para alegrar el día.', img: img('1470509037663-253afd7f0f51') },
  { id: 'primaveral', name: 'Ramo primaveral', price: 27990, cat: 'Mixtos', desc: 'Mezcla de flores de temporada en tonos pastel.', img: img('1561181286-d3fee7d55364') },
  { id: 'lirios', name: 'Lirios blancos', price: 29990, cat: 'Mixtos', desc: 'Pureza y elegancia. Ideal para condolencias o agradecer.', img: img('1487530811176-3780de880c2d') },
  { id: 'premium', name: 'Ramo premium', price: 44990, cat: 'Mixtos', badge: 'Premium', desc: 'Rosas, liliums y flores finas en un arreglo abundante.', img: img('1519378058457-4c29a0a2efac') },
];

const COMUNAS = [
  ['Retiro en tienda', 0],
  ['Providencia', 3500],
  ['Las Condes', 3500],
  ['Ñuñoa', 3000],
  ['Santiago Centro', 3000],
  ['Macul', 3500],
  ['Vitacura', 4500],
  ['La Reina', 4000],
  ['San Miguel', 4000],
  ['La Florida', 4500],
  ['Peñalolén', 4500],
  ['Maipú', 5000],
  ['Lo Barnechea', 5500],
];

// ===== UTILIDADES =====
const clp = (n) => '$' + n.toLocaleString('es-CL');
const $ = (s) => document.querySelector(s);

function nextOrderNumber() {
  // Correlativo guardado en este navegador (empieza en 0142)
  let n = 141;
  try { n = parseInt(localStorage.getItem('orderCounter') || '141', 10); } catch (e) {}
  return String(n + 1).padStart(4, '0');
}
function commitOrderNumber(num) {
  try { localStorage.setItem('orderCounter', String(parseInt(num, 10))); } catch (e) {}
}

// ===== CATÁLOGO =====
const grid = $('#productGrid');
const filters = $('#filters');
const cats = ['Todos', ...new Set(PRODUCTS.map((p) => p.cat))];

function renderFilters(active = 'Todos') {
  filters.innerHTML = cats
    .map((c) => `<button class="chip ${c === active ? 'is-active' : ''}" data-cat="${c}">${c}</button>`)
    .join('');
}

function renderProducts(cat = 'Todos') {
  const list = cat === 'Todos' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat);
  grid.innerHTML = list.map((p) => `
    <article class="card">
      <div class="card__img">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="card__body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
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

$('#shippingList').innerHTML = COMUNAS
  .map(([c, f]) => `<div>${c}<span>${f ? clp(f) : 'Gratis'}</span></div>`)
  .join('');

// ===== FORMULARIO / MODAL =====
const modal = $('#orderModal');
const form = $('#orderForm');
const fRamo = $('#fRamo');
const fComuna = $('#fComuna');
let orderNumber = nextOrderNumber();

fRamo.innerHTML = PRODUCTS.map((p) => `<option value="${p.id}">${p.name} (${clp(p.price)})</option>`).join('');
fComuna.innerHTML = '<option value="">Selecciona una comuna</option>' +
  COMUNAS.map(([c, f], i) => `<option value="${i}">${c}${f ? ` (+${clp(f)} despacho)` : ''}</option>`).join('');

$('#fFecha').min = new Date().toISOString().split('T')[0];

function getOrder() {
  const p = PRODUCTS.find((x) => x.id === fRamo.value);
  const c = fComuna.value !== '' ? COMUNAS[fComuna.value] : null;
  return {
    product: p,
    comuna: c,
    recibe: $('#fRecibe').value.trim(),
    fecha: $('#fFecha').value,
    direccion: $('#fDireccion').value.trim(),
    dedicatoria: $('#fDedicatoria').value.trim(),
    cliente: $('#fCliente').value.trim(),
    total: p.price + (c ? c[1] : 0),
  };
}

function buildMessage(o) {
  // *texto* = negrita y _texto_ = cursiva en WhatsApp
  const lines = [
    `🌸✨ *PEDIDO #${orderNumber}* ✨🌸`,
    '━━━━━━━━━━━━━━━',
    `💐 *Ramo:* ${o.product.name} (${clp(o.product.price)})`,
  ];
  if (o.comuna) lines.push(`📍 *Comuna:* ${o.comuna[0]}${o.comuna[1] ? ` (+${clp(o.comuna[1])} despacho)` : ' (sin costo)'}`);
  if (o.direccion) lines.push(`🏠 *Dirección:* ${o.direccion}`);
  if (o.fecha) lines.push(`📅 *Fecha:* ${o.fecha.split('-').reverse().join('/')}`);
  if (o.recibe) lines.push(`🎁 *Recibe:* ${o.recibe}`);
  if (o.dedicatoria) lines.push(`💌 *Dedicatoria:* _"${o.dedicatoria}"_`);
  if (o.cliente) lines.push(`🙋 *Envía:* ${o.cliente}`);
  lines.push('━━━━━━━━━━━━━━━');
  lines.push(`💰 *TOTAL: ${clp(o.total)}*`);
  lines.push('');
  lines.push('¡Gracias por tu pedido! 🌷');
  return lines.join('\n');
}

function update() {
  const o = getOrder();
  $('#msgPreview').textContent = buildMessage(o);
  $('#fTotal').textContent = clp(o.total);
}

function openModal(productId) {
  if (productId && PRODUCTS.some((p) => p.id === productId)) fRamo.value = productId;
  $('#formError').hidden = true;
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

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const o = getOrder();
  const missing = [];
  if (!o.comuna) missing.push('comuna');
  if (!o.recibe) missing.push('quién recibe');
  if (missing.length) {
    const err = $('#formError');
    err.textContent = 'Falta completar: ' + missing.join(', ') + '.';
    err.hidden = false;
    return;
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(o))}`;
  window.open(url, '_blank', 'noopener');
  commitOrderNumber(orderNumber);
  orderNumber = nextOrderNumber();
  form.reset();
  closeModal();
});

$('#footerWa').href = `https://wa.me/${WHATSAPP_NUMBER}`;

renderFilters();
renderProducts();
