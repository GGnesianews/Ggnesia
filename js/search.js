/* =================================
   GGNESIA - SEARCH
   ================================= */

document.addEventListener("DOMContentLoaded", async () => {

    const searchForm = document.querySelector(".search-form");
    const searchInput = document.querySelector("#searchInput");
    const searchResults = document.querySelector("#searchResults");

    if (!searchForm || !searchInput || !searchResults) {
        return;
    }

    /* Ambil data berita */
    const articles = await getArticles();


    /* Jalankan pencarian */
    searchForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const keyword = searchInput.value.trim();

        if (!keyword) {
            showEmptyMessage();
            return;
        }

        const results = searchArticles(articles, keyword);

        renderResults(results, keyword);

    });


    /* Tampilkan hasil */
    function renderResults(results, keyword) {

        searchResults.innerHTML = "";

        if (results.length === 0) {

            searchResults.innerHTML = `
                <div class="empty-search">
                    <div class="empty-icon">🔍</div>

                    <h3>Tidak ada berita ditemukan</h3>

                    <p>
                        Tidak ada hasil untuk
                        "<strong>${escapeHTML(keyword)}</strong>"
                    </p>
                </div>
            `;

            return;
        }


        results.forEach(article => {

            const card = document.createElement("article");

            card.className = "news-card";

            card.innerHTML = `
                <div class="news-content">

                    <span class="category">
                        ${escapeHTML(article.category)}
                    </span>

                    <h2>
                        ${escapeHTML(article.title)}
                    </h2>

                    <p>
                        ${escapeHTML(article.summary)}
                    </p>

                    <small>
                        ${formatArticleDate(article.publishedAt)}
                    </small>

                </div>

                <div class="news-image">
                    IMAGE
                </div>
            `;


            card.addEventListener("click", () => {

                window.location.href =
                    "article.html?id=" +
                    encodeURIComponent(article.id);

            });


            searchResults.appendChild(card);

        });

    }


    /* Pesan awal */
    function showEmptyMessage() {

        searchResults.innerHTML = `
            <div class="empty-search">

                <div class="empty-icon">
                    🔍
                </div>

                <h3>Masukkan kata kunci</h3>

                <p>
                    Contoh: Mobile Legends,
                    PUBG Mobile, esports...
                </p>

            </div>
        `;

    }


    /* Keamanan teks */
    function escapeHTML(text = "") {

        const element = document.createElement("div");

        element.textContent = text;

        return element.innerHTML;

    }

});
