/* =================================
   GGNESIA - MAIN SCRIPT
   ================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       SEARCH BUTTON
       =============================== */

    const searchButton = document.querySelector(".search-btn");

    if (searchButton) {
        searchButton.addEventListener("click", () => {
            window.location.href = "pages/search.html";
        });
    }


    /* ===============================
       FOOTER YEAR
       =============================== */

    const footerYear = document.querySelector(".footer small");

    if (footerYear) {
        footerYear.textContent =
            "© " + new Date().getFullYear() + " GGNesia";
    }

});
