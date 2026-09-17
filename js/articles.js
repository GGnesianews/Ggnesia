/* =================================
   GGNESIA - ARTICLES
   ================================= */

const ARTICLES_URL = "../data/articles.json";


/* Ambil semua berita */
async function getArticles() {

    try {

        const response = await fetch(ARTICLES_URL);

        if (!response.ok) {
            throw new Error("Gagal mengambil data berita");
        }

        const articles = await response.json();

        return articles;

    } catch (error) {

        console.error("Error:", error);

        return [];

    }
}


/* Urutkan berita terbaru */
function sortLatestArticles(articles) {

    return [...articles].sort((a, b) => {

        return new Date(b.publishedAt) -
               new Date(a.publishedAt);

    });

}


/* Cari berita berdasarkan kategori */
function filterByCategory(articles, category) {

    if (!category || category === "Semua") {
        return articles;
    }

    return articles.filter(article =>
        article.category.toLowerCase() ===
        category.toLowerCase()
    );

}


/* Cari berita berdasarkan kata */
function searchArticles(articles, keyword) {

    const search = keyword.toLowerCase().trim();

    if (!search) {
        return articles;
    }

    return articles.filter(article => {

        return (
            article.title.toLowerCase().includes(search) ||
            article.category.toLowerCase().includes(search) ||
            article.summary.toLowerCase().includes(search)
        );

    });

}


/* Buat format waktu */
function formatArticleDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

}
