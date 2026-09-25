// Junta data/productos/*.json y data/categorias/*.json en data/catalogo.json,
// que es el único archivo que lee la web. Lo ejecuta GitHub Actions en cada cambio.
// Uso local: node scripts/build-catalogo.mjs
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, basename } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const DATA = join(ROOT, 'data');

function readFolder(folder) {
  const dir = join(DATA, folder);
  let files = [];
  try { files = readdirSync(dir).filter((f) => f.endsWith('.json')); } catch { return []; }
  const items = [];
  for (const file of files) {
    try {
      items.push({ id: basename(file, '.json'), ...JSON.parse(readFileSync(join(dir, file), 'utf8')) });
    } catch (e) {
      // Un archivo dañado no debe botar todo el catálogo: se omite y se avisa en el log
      console.warn(`⚠️  Se omitió ${folder}/${file}: ${e.message}`);
    }
  }
  return items;
}

const num = (v, def) => (Number.isFinite(Number(v)) && v !== '' && v !== null ? Number(v) : def);
const byOrder = (a, b) => a.orden - b.orden || a.nombre.localeCompare(b.nombre, 'es');

const productos = readFolder('productos')
  .filter((p) => p.visible !== false && typeof p.nombre === 'string' && p.nombre.trim())
  .map((p) => ({
    id: p.id,
    nombre: p.nombre.trim(),
    precio: Math.max(0, Math.round(num(p.precio, 0))),
    foto: typeof p.foto === 'string' && p.foto ? p.foto.replace(/^\//, '') : 'img/logo.jpg',
    descripcion: typeof p.descripcion === 'string' ? p.descripcion.trim() : '',
    incluye: Array.isArray(p.incluye) ? p.incluye.map((i) => String(i).trim()).filter(Boolean) : [],
    etiqueta: typeof p.etiqueta === 'string' ? p.etiqueta.trim() : '',
    agotado: p.agotado === true,
    orden: num(p.orden, 1000),
  }))
  .sort(byOrder);

const ids = new Set(productos.map((p) => p.id));

const categorias = readFolder('categorias')
  .filter((c) => c.visible !== false && typeof c.nombre === 'string' && c.nombre.trim())
  .map((c) => ({
    id: c.id,
    nombre: c.nombre.trim(),
    orden: num(c.orden, 1000),
    // se descartan productos borrados u ocultos, y repetidos
    productos: [...new Set(Array.isArray(c.productos) ? c.productos : [])].filter((id) => ids.has(id)),
  }))
  .sort(byOrder)
  .map(({ orden, ...c }) => c);

const out = {
  _aviso: 'Archivo generado automáticamente por scripts/build-catalogo.mjs. No editar a mano.',
  categorias,
  productos: productos.map(({ orden, ...p }) => p),
};

writeFileSync(join(DATA, 'catalogo.json'), JSON.stringify(out, null, 2) + '\n');
console.log(`✅ catalogo.json: ${productos.length} productos, ${categorias.length} categorías`);
