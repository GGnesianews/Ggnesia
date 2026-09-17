/* =================================
   GGNESIA - MOBILE MENU
   ================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.querySelector(".menu-btn");

    if (!menuButton) return;


    /* ===============================
       BUAT SIDEBAR
       =============================== */

    const sideMenu = document.createElement("aside");

    sideMenu.className = "side-menu";

    sideMenu.innerHTML = `
        <div class="menu-title">
            MENU
        </div>

        <a href="index.html">
            Home
        </a>

        <a href="pages/news.html">
            Berita
        </a>

        <a href="pages/esports.html">
            Esports
        </a>

        <a href="pages/games.html">
            Games
        </a>

        <a href="pages/trending.html">
            Trending
        </a>

        <a href="pages/search.html">
            Cari Berita
        </a>
    `;

    document.body.appendChild(sideMenu);


    /* ===============================
       OVERLAY
       =============================== */

    const overlay = document.createElement("div");

    overlay.className = "menu-overlay";

    document.body.appendChild(overlay);


    /* ===============================
       BUKA MENU
       =============================== */

    menuButton.addEventListener("click", () => {

        document.body.classList.toggle("menu-open");

        const isOpen =
            document.body.classList.contains("menu-open");

        menuButton.textContent =
            isOpen ? "✕" : "☰";

    });


    /* ===============================
       TUTUP OVERLAY
       =============================== */

    overlay.addEventListener("click", closeMenu);


    /* ===============================
       TUTUP SETELAH PILIH MENU
       =============================== */

    sideMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });


    function closeMenu() {

        document.body.classList.remove("menu-open");

        menuButton.textContent = "☰";

    }

});
