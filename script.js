// =========================
// GGNESIA - MAIN JAVASCRIPT
// =========================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

// Menu mobile
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });
}

// Tombol pencarian
const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    alert("Fitur pencarian akan kita buat pada tahap berikutnya.");
  });
}


// =========================
// LOAD BERITA
// =========================

async function loadNews() {
  try {
    const response = await fetch("data/articles.json");

    if (!response.ok) {
      throw new Error("Data berita tidak ditemukan");
    }

    const articles = await response.json();

    displayLatestNews(articles);
    displayGameNews(articles);

  } catch (error) {
    console.log("Berita belum tersedia:", error);
  }
}


// =========================
// BERITA TERBARU
// =========================

function displayLatestNews(articles) {

  const container = document.getElementById("latestNews");

  if (!container) return;

  container.innerHTML = "";

  articles.slice(0, 6).forEach(article => {

    const card = document.createElement("article");

    card.className = "news-card";

    card.innerHTML = `
      <div class="news-card-image">
        GAMING NEWS
      </div>

      <div class="news-card-content">

        <span class="category">
          ${article.category || "Gaming"}
        </span>

        <h3>
          ${article.title}
        </h3>

        <p>
          ${article.summary || ""}
        </p>

        <div class="news-meta">
          <span>${article.source || "GGNesia"}</span>
          <span>${article.published || ""}</span>
        </div>

      </div>
    `;

    container.appendChild(card);

  });
}


// =========================
// BERITA GAME
// =========================

function displayGameNews(articles) {

  const container = document.getElementById("gameNews");

  if (!container) return;

  container.innerHTML = "";

  articles.slice(0, 3).forEach(article => {

    const card = document.createElement("article");

    card.className = "news-card";

    card.innerHTML = `
      <div class="news-card-image">
        ${article.category || "GAME"}
      </div>

      <div class="news-card-content">

        <span class="category">
          ${article.category || "Gaming"}
        </span>

        <h3>
          ${article.title}
        </h3>

        <p>
          ${article.summary || ""}
        </p>

      </div>
    `;

    container.appendChild(card);

  });
}


// Jalankan saat halaman dibuka
loadNews();
