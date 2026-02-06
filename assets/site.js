// Footer year
document.getElementById("year")?.appendChild(document.createTextNode(String(new Date().getFullYear())));

// Episode search
const search = document.getElementById("search");
const list = document.getElementById("episodeList");

if (search && list) {
  const cards = Array.from(list.querySelectorAll(".episode"));

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
