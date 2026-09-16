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

    const card =
        document.createElement("article");

    card.className = "news-card";


    const image =
        article.image ||
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80";


    const title =
        article.title ||
        "Berita gaming terbaru";


    const description =
        article.description ||
        "Informasi gaming terbaru untuk pembaca GGNesia News.";


    const category =
        article.category ||
        "GAMING";


    const source =
        article.source ||
        "GGNesia News";


    const time =
        article.time ||
        "Terbaru";


    const url =
        article.url ||
        "#";


    card.innerHTML = `

        <a
            href="${url}"
            target="_blank"
            rel="noopener noreferrer"
        >
<img
    class="news-image"
    src="${image}"
    alt="${escapeHTML(title)}"
    loading="lazy"
    onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80';"
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
