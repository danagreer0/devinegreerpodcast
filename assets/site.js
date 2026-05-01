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
