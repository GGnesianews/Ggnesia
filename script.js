/* =================================
   GGNESIA - SCRIPT JS
   ================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       MENU BUTTON
       =============================== */

    const menuButton = document.querySelector(".menu-btn");

    if (menuButton) {
        menuButton.addEventListener("click", () => {

            document.body.classList.toggle("menu-open");

            if (document.body.classList.contains("menu-open")) {
                menuButton.textContent = "✕";
            } else {
                menuButton.textContent = "☰";
            }

        });
    }


    /* ===============================
       SEARCH BUTTON
       =============================== */

    const searchButton = document.querySelector(".search-btn");

    if (searchButton) {
        searchButton.addEventListener("click", () => {

            const keyword = prompt("Cari berita gaming:");

            if (!keyword) {
                return;
            }

            alert(
                'Pencarian "' +
                keyword +
                '" akan tersedia setelah sistem berita dan halaman pencarian dibuat.'
            );

        });
    }


    /* ===============================
       NAVIGATION
       =============================== */

    const navigationLinks =
        document.querySelectorAll(".navigation a");

    navigationLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const category = link.textContent.trim();

            console.log(
                "Kategori dipilih:",
                category
            );

        });

    });


    /* ===============================
       NEWS CARD
       =============================== */

    const newsCards =
        document.querySelectorAll(
            ".news-card, .trend-card"
        );

    newsCards.forEach(card => {

        card.addEventListener("click", () => {

            console.log(
                "Berita dipilih"
            );

        });

    });


    /* ===============================
       CURRENT YEAR
       =============================== */

    const footerYear =
        document.querySelector(".footer small");

    if (footerYear) {

        const year = new Date().getFullYear();

        footerYear.textContent =
            "© " + year + " GGNesia";

    }

});

<script src="../js/menu.js"></script>
