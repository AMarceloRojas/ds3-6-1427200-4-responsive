document.addEventListener('DOMContentLoaded', () => {
  // Inserta el navbar y luego ata todos los eventos
  fetch('./components/navbar.html')
    .then(r => r.text())
    .then(html => {
      document.body.insertAdjacentHTML('afterbegin', html);
      setupNavbar();
    })
    .catch(err => console.error('Error loading navbar:', err));
});

function setupNavbar() {
  const $  = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  /* ---------------- MENU LATERAL (offcanvas) ---------------- */
  const offcanvas   = $('#offcanvas');
  const openMenu    = $$('#btnMenu');        // admite 1..n botones
  const closeMenu   = $$('#btnCloseMenu');   // admite 1..n botones

  function openOffcanvas(e) {
    if (e) e.preventDefault();
    if (!offcanvas) return;
    offcanvas.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeOffcanvas() {
    if (!offcanvas) return;
    offcanvas.classList.add('hidden');
    document.body.style.overflow = '';
  }

  openMenu.forEach(b => b.addEventListener('click', openOffcanvas));
  closeMenu.forEach(b => b.addEventListener('click', closeOffcanvas));
  offcanvas?.addEventListener('click', (e) => {
    // clic en el velo oscuro (fuera del aside)
    if (e.target === offcanvas) closeOffcanvas();
  });

  /* ---------------- BUSCADOR (searchPanel) ---------------- */
  const searchPanel   = $('#searchPanel');
  const searchInput   = $('#searchInput');
  const openSearch    = $$('#btnSearch');
  const closeSearch   = $$('#btnCloseSearch');

  function showSearch(e) {
    if (e) e.preventDefault(); // evita que un <a> navegue
    if (!searchPanel) return;
    searchPanel.classList.remove('hidden');
    setTimeout(() => searchInput?.focus(), 50);
  }
  function hideSearch() {
    if (!searchPanel) return;
    searchPanel.classList.add('hidden');
  }

  openSearch.forEach(b => b.addEventListener('click', showSearch));
  closeSearch.forEach(b => b.addEventListener('click', hideSearch));
  searchPanel?.addEventListener('click', (e) => {
    if (e.target === searchPanel) hideSearch(); // clic fuera de la tarjeta
  });

  // Cerrar con ESC ambos paneles
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { hideSearch(); closeOffcanvas(); }
  });

  /* ---------------- LÓGICA DE BÚSQUEDA ---------------- */
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const q = e.target.value.trim().toLowerCase();

      // Mapa de rutas por patrón (añade más si quieres)
      const routes = [
        [/(^|\s)(cat\s*5e|5e|219590-4)(\s|$)/, "https://www.ds3comunicaciones.com/AMP/219590-4.html"],
        [/(^|\s)(cat\s*6a|6a|1859345-2)(\s|$)/, "https://www.ds3comunicaciones.com/AMP/1859345-2.html"],
        [/(^|\s)(cat\s*6|6-1427200-4|1427200)(\s|$)/, "https://www.ds3comunicaciones.com/AMP/6-1427200-4.html"],
        [/(^|\s)(cat\s*7|7a|9-1499102-1)(\s|$)/, "https://www.ds3comunicaciones.com/AMP/9-1499102-1.html"]
      ];

      for (const [pattern, url] of routes) {
        if (pattern.test(q)) {
          window.location.href = url;
          return;
        }
      }
      alert("No se encontró el producto. Prueba: Cat5e, Cat6, Cat6A o Cat7.");
    });
  }

  /* ---------------- Estilos utilitarios (opcional) ---------------- */
  const style = document.createElement('style');
  style.textContent =
    `.scrollbar-hide::-webkit-scrollbar{display:none}
     .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}`;
  document.head.appendChild(style);
}
