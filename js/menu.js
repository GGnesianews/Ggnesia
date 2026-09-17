/* =================================
   GGNESIA - MENU
   ================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.querySelector(".menu-btn");

    if (!menuButton) {
        return;
    }

    /* Buat overlay */
    const overlay = document.createElement("div");

    overlay.className = "menu-overlay";

    document.body.appendChild(overlay);


    /* Buka / tutup menu */
    menuButton.addEventListener("click", () => {

        document.body.classList.toggle("menu-open");

        if (document.body.classList.contains("menu-open")) {
            menuButton.textContent = "✕";
        } else {
            menuButton.textContent = "☰";
        }

    });


    /* Tutup ketika overlay diklik */
    overlay.addEventListener("click", () => {

        document.body.classList.remove("menu-open");

        menuButton.textContent = "☰";

    });


    /* Tutup menu setelah memilih link */
    const menuLinks =
        document.querySelectorAll(
            ".navigation a, .side-menu a"
        );

    menuLinks.forEach(link => {

        link.addEventListener("click", () => {

            document.body.classList.remove("menu-open");

            menuButton.textContent = "☰";

        });

    });

});
