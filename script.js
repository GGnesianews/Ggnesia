/* =================================
   GGNESIA NEWS
   Main JavaScript
================================= */


/* =================================
   MENU MOBILE
================================= */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");
const overlay = document.getElementById("overlay");


function openMenu() {
    mobileMenu.classList.add("open");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}


function closeMobileMenu() {
    mobileMenu.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
}


if (menuButton) {
    menuButton.addEventListener("click", openMenu);
}


if (closeMenu) {
    closeMenu.addEventListener("click", closeMobileMenu);
}


if (overlay) {
    overlay.addEventListener("click", closeMobileMenu);
}


/* =================================
   SUBMENU
================================= */

const dropdownButtons =
    document.querySelectorAll(".menu-dropdown");


dropdownButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const section = button.parentElement;

        section.classList.toggle("active");

    });

});


/* =================================
   SEARCH
================================= */

const searchButton =
    document.getElementById("searchButton");

const searchBox =
    document.getElementById("searchBox");

const searchClose =
    document.getElementById("searchClose");

const searchInput =
    document.getElementById("searchInput");


function openSearch() {

    searchBox.classList.add("active");

    setTimeout(function() {

        if (searchInput) {
            searchInput.focus();
        }

    }, 300);
}


function closeSearch() {

    searchBox.classList.remove("active");

}


if (searchButton) {

    searchButton.addEventListener(
        "click",
        openSearch
    );

}


if (searchClose) {

    searchClose.addEventListener(
        "click",
        closeSearch
    );

}


/* =================================
   DATA BERITA
================================= */

let articles = [];


/* =================================
   LOAD BERITA
================================= */

async function loadNews() {

    try {

        const response =
            await fetch("data/articles.json");

        if (!response.ok) {
            throw new Error(
                "Gagal mengambil data berita"
            );
        }

        articles = await response.json();

        displayNews(articles);

        setupHero(articles);

    } catch (error) {

        console.error(error);

        showNewsError();

    }

}


/* =================================
   TAMPILKAN BERITA
================================= */

function displayNews(news) {

    const latestNews =
        document.getElementById("latestNews");

    const esportsNews =
        document.getElementById("esportsNews");


    if (!latestNews) return;


    latestNews.innerHTML = "";


    /*
       Menampilkan maksimal 6 berita
    */

    const latest =
        news.slice(0, 6);


    latest.forEach(function(article) {

        latestNews.appendChild(
            createNewsCard(article)
        );

    });


    /*
       Berita esports
    */

    if (esportsNews) {

        esportsNews.innerHTML = "";

        const esports =
            news.filter(function(article) {

                return (
                    article.category &&
                    article.category
                        .toLowerCase()
                        .includes("esport")
                );

            });


        esports
            .slice(0, 6)
            .forEach(function(article) {

                esportsNews.appendChild(
                    createNewsCard(article)
                );

            });

    }

}


/* =================================
   CARD BERITA
================================= */

function createNewsCard(article) {
    const card = document.createElement("article");
    card.className = "news-card";

    // Bersihkan HTML entity seperti &#039;
    function decodeHTML(text) {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = text || "";
        return textarea.value;
    }

    const title = decodeHTML(
        article.title || "Berita gaming terbaru"
    );

    const description = decodeHTML(
        article.description || "Informasi gaming terbaru untuk pembaca GGNesia News."
    );

    // Rapikan kategori
    let category = article.category || "Game News";

    if (category.toLowerCase() === "gaming") {
        category = "Game News";
    }

    const source = article.source || "GGNesia News";
    const time = article.time || "Terbaru";
    const url = article.url || "#";

    // Gambar asli dari sumber berita
    const originalImage = article.image || "";

    // Proxy gambar agar gambar dari website lain lebih mudah tampil
    const image = originalImage
        ? `https://wsrv.nl/?url=${encodeURIComponent(originalImage)}`
        : "";

    card.innerHTML = `
        <a
            href="${escapeHTML(url)}"
            target="_blank"
            rel="noopener noreferrer"
        >

            <img
                class="news-image"
                src="${image}"
                alt="${escapeHTML(title)}"
                loading="lazy"
                onerror="this.onerror=null; this.src='data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="450">
                        <rect width="100%" height="100%" fill="#151c2e"/>
                        <text x="50%" y="48%" text-anchor="middle"
                              fill="#19c7e8" font-size="28"
                              font-family="Arial">
                            GGNesia
                        </text>
                        <text x="50%" y="58%" text-anchor="middle"
                              fill="#8d98ad" font-size="18"
                              font-family="Arial">
                            Gaming News
                        </text>
                    </svg>
                `)}'"
            >

            <div class="news-body">

                <span class="news-category">
                    ${escapeHTML(category)}
                </span>

                <h3>
                    ${escapeHTML(title)}
                </h3>

                <p>
                    ${escapeHTML(description)}
                </p>

                <div class="news-meta">
                    ${escapeHTML(source)}
                    &nbsp; • &nbsp;
                    ${escapeHTML(time)}
                </div>

            </div>

        </a>
    `;

    return card;
}


/* =================================
   HERO BERITA
================================= */

function setupHero(news) {

    if (!news || news.length === 0) {
        return;
    }


    const article = news[0];


    const heroTitle =
        document.getElementById("heroTitle");

    const heroDescription =
        document.getElementById("heroDescription");

    const heroSource =
        document.getElementById("heroSource");

    const heroTime =
        document.getElementById("heroTime");


    if (heroTitle) {

        heroTitle.textContent =
            article.title ||
            "Berita gaming terbaru";

    }


    if (heroDescription) {

        heroDescription.textContent =
            article.description ||
            "Berita gaming dan esports terbaru.";

    }


    if (heroSource) {

        heroSource.textContent =
            article.source ||
            "GGNesia News";

    }


    if (heroTime) {

        heroTime.textContent =
            article.time ||
            "Terbaru";

    }

}


/* =================================
   PENCARIAN BERITA
================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function() {

            const keyword =
                searchInput.value
                    .toLowerCase()
                    .trim();


            if (!keyword) {

                displayNews(articles);

                return;

            }


            const results =
                articles.filter(function(article) {

                    const title =
                        article.title || "";

                    const description =
                        article.description || "";

                    const category =
                        article.category || "";


                    return (
                        title.toLowerCase()
                            .includes(keyword) ||

                        description.toLowerCase()
                            .includes(keyword) ||

                        category.toLowerCase()
                            .includes(keyword)
                    );

                });


            displayNews(results);

        }
    );

}


/* =================================
   FILTER GAME
================================= */

const gameTabs =
    document.querySelectorAll(
        ".game-tabs button"
    );


gameTabs.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            gameTabs.forEach(function(tab) {

                tab.classList.remove("active");

            });


            button.classList.add("active");


            const game =
                button.textContent
                    .toLowerCase()
                    .trim();


            if (game === "mobile legends") {

                filterGame(
                    ["mobile legends", "mlbb"]
                );

            } else if (game === "pubg mobile") {

                filterGame(
                    ["pubg", "pubg mobile"]
                );

            } else if (game === "free fire") {

                filterGame(
                    ["free fire"]
                );

            } else if (game === "valorant") {

                filterGame(
                    ["valorant"]
                );

            } else if (game === "hok") {

                filterGame(
                    ["honor of kings", "hok"]
                );

            }

        }
    );

});


function filterGame(keywords) {

    const results =
        articles.filter(function(article) {

            const text = (

                (article.title || "") +
                " " +
                (article.description || "") +
                " " +
                (article.category || "")

            ).toLowerCase();


            return keywords.some(function(keyword) {

                return text.includes(keyword);

            });

        });


    const esportsNews =
        document.getElementById("esportsNews");


    if (!esportsNews) return;


    esportsNews.innerHTML = "";


    results
        .slice(0, 6)
        .forEach(function(article) {

            esportsNews.appendChild(
                createNewsCard(article)
            );

        });

}


/* =================================
   ERROR BERITA
================================= */

function showNewsError() {

    const latestNews =
        document.getElementById("latestNews");


    if (!latestNews) return;


    latestNews.innerHTML = `

        <article class="news-card">

            <div class="news-body">

                <span class="news-category">
                    INFO
                </span>

                <h3>
                    Berita belum tersedia
                </h3>

                <p>
                    Data berita belum dapat dimuat.
                    Kita akan menghubungkan GGNesia
                    dengan sumber berita otomatis
                    pada tahap berikutnya.
                </p>

            </div>

        </article>

    `;

}


/* =================================
   KEAMANAN TEKS
================================= */

function escapeHTML(text) {
    if (text === null || text === undefined) {
        return "";
    }

    let value = String(text);

    // Bersihkan CDATA
    value = value
        .replace(/<!\[CDATA\[/gi, "")
        .replace(/\]\]>/gi, "");

    // Decode HTML entity yang mungkin berlapis
    const textarea = document.createElement("textarea");

    for (let i = 0; i < 3; i++) {
        textarea.innerHTML = value;
        const decoded = textarea.value;

        if (decoded === value) {
            break;
        }

        value = decoded;
    }

    // Escape kembali agar aman dimasukkan ke HTML
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
/* =================================
   MULAI WEBSITE
================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadNews();

    }
);
