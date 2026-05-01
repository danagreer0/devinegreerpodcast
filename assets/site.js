// Footer year
document.getElementById("year")?.appendChild(document.createTextNode(String(new Date().getFullYear())));

// Episode search
const search = document.getElementById("search");
const list = document.getElementById("episodeList");

if (search && list) {
  const cards = Array.from(list.querySelectorAll(".episode"));

// Simple lightbox for .photo-gallery
(function () {
  function createOverlay() {
    const ov = document.createElement('div');
    ov.id = 'img-overlay';
    ov.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.8);z-index:10000;padding:20px;';
    ov.innerHTML = '<img style="max-width:100%;max-height:100%;border-radius:10px;box-shadow:0 12px 30px rgba(0,0,0,.5)" alt="">';
    ov.addEventListener('click', () => ov.remove());
    document.body.appendChild(ov);
    return ov;
  }

  document.addEventListener('click', function (e) {
    const a = e.target.closest('.photo-gallery a[data-full]');
    if (!a) return;
    e.preventDefault();
    const src = a.getAttribute('href') || a.querySelector('img')?.src;
    if (!src) return;
    let ov = document.getElementById('img-overlay') || createOverlay();
    ov.querySelector('img').src = src;
    const alt = a.querySelector('img')?.alt || '';
    ov.querySelector('img').alt = alt;
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const ov = document.getElementById('img-overlay');
      if (ov) ov.remove();
    }
  });
})();

// Keyboard navigation for galleries and lightbox
document.addEventListener('keydown', function (e) {
  const ov = document.getElementById('img-overlay');
  const LEFT = ['ArrowLeft', 'Left'];
  const RIGHT = ['ArrowRight', 'Right'];

  // If lightbox open, navigate images there by finding current src and moving to next/prev in same gallery
  if (ov && (LEFT.includes(e.key) || RIGHT.includes(e.key))) {
    const img = ov.querySelector('img');
    if (!img) return;
    const curr = img.src;
    // find the anchor in the document that matches this src
    const anchors = Array.from(document.querySelectorAll('.photo-gallery a[data-full]'));
    const idx = anchors.findIndex(a => (a.getAttribute('href') || a.querySelector('img')?.src) === curr);
    if (idx === -1) return;
    const delta = LEFT.includes(e.key) ? -1 : 1;
    const next = anchors[(idx + delta + anchors.length) % anchors.length];
    if (next) {
      img.src = next.getAttribute('href') || next.querySelector('img')?.src;
      img.alt = next.querySelector('img')?.alt || '';
    }
    return;
  }

  // Otherwise, if focus is inside a .photo-gallery or the focused element is an image inside one, scroll that gallery
  const active = document.activeElement;
  const gallery = active?.closest && active.closest('.photo-gallery') || (active && active.classList && active.classList.contains('photo-gallery') ? active : null);
  // if active element isn't in a gallery, try to find a visible gallery under the mouse/viewport
  const visibleGallery = gallery || document.querySelector('.photo-gallery');
  if (!visibleGallery) return;

  if (LEFT.includes(e.key)) {
    visibleGallery.scrollBy({ left: -visibleGallery.clientWidth * 0.6, behavior: 'smooth' });
  } else if (RIGHT.includes(e.key)) {
    visibleGallery.scrollBy({ left: visibleGallery.clientWidth * 0.6, behavior: 'smooth' });
  }
});

  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();

    cards.forEach(card => {
      const haystack = [
        card.getAttribute("data-title") || "",
        card.getAttribute("data-guest") || "",
        card.getAttribute("data-topics") || "",
        card.textContent || ""
      ].join(" ").toLowerCase();

      card.style.display = haystack.includes(q) ? "" : "none";
    });
  });
}
