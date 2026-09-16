const fs = require("fs");
const https = require("https");

const SOURCES_FILE = "data/sources.json";
const ARTICLES_FILE = "data/articles.json";

const MAX_ARTICLES = 60;
const REQUEST_TIMEOUT = 15000;


/* ================================
   BACA SOURCES.JSON
================================ */

function readSources() {
    return JSON.parse(
        fs.readFileSync(SOURCES_FILE, "utf8")
    );
}


/* ================================
   DOWNLOAD RSS
================================ */

function fetchRSS(url) {
    return new Promise((resolve, reject) => {

        const request = https.get(
            url,
            {
                headers: {
                    "User-Agent":
                        "GGNesia-News-RSS/1.0"
                }
            },
            response => {

                let data = "";

                response.setEncoding("utf8");

                response.on("data", chunk => {
                    data += chunk;
                });

                response.on("end", () => {

                    if (
                        response.statusCode >= 200 &&
                        response.statusCode < 400
                    ) {
                        resolve(data);
                    } else {
                        reject(
                            new Error(
                                `HTTP ${response.statusCode}`
                            )
                        );
                    }

                });

            }
        );


        request.setTimeout(
            REQUEST_TIMEOUT,
            () => {
                request.destroy();

                reject(
                    new Error("Request timeout")
                );
            }
        );


        request.on("error", reject);

    });
}


/* ================================
   BERSIHKAN HTML
================================ */

function cleanHTML(text) {

    if (!text) return "";

    return text
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/\s+/g, " ")
        .trim();

}


/* ================================
   AMBIL TAG XML
================================ */

function getTag(xml, tag) {

    const regex = new RegExp(
        `<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`,
        "i"
    );

    const match = xml.match(regex);

    return match ? match[1].trim() : "";

}


/* ================================
   PARSE RSS SEDERHANA
================================ */

function parseRSS(xml, source) {

    const items = [];

    const matches =
        xml.match(
            /<item(?:\s[^>]*)?>[\s\S]*?<\/item>/gi
        ) || [];


    matches.forEach(item => {

        const title =
            cleanHTML(
                getTag(item, "title")
            );


        const description =
            cleanHTML(
                getTag(item, "description")
            );


        const link =
            getTag(item, "link");


        const pubDate =
            getTag(item, "pubDate");


        const guid =
            getTag(item, "guid");


        if (!title || !link) {
            return;
        }


        /*
           Gunakan GUID sebagai ID jika tersedia.
           Kalau tidak ada, gunakan URL.
        */

        const id =
            guid ||
            link;


        items.push({

            id: id.trim(),

            title: title.trim(),

            description:
                description
                    .substring(0, 220)
                    .trim(),

            category:
                source.category ||
                "Gaming",

            source:
                source.name,

            time:
                formatDate(pubDate),

            publishedAt:
                pubDate || "",

            image:
                extractImage(item),

            url:
                link.trim()

        });

    });


    return items;

}


/* ================================
   AMBIL GAMBAR RSS
================================ */

function extractImage(item) {

    if (!item) return "";

    // 1. enclosure
    const enclosure = item.match(
        /<enclosure[^>]+url=["']([^"']+)["']/i
    );

    if (enclosure) {
        return enclosure[1];
    }

    // 2. media:content
    const media = item.match(
        /<media:content[^>]+url=["']([^"']+)["']/i
    );

    if (media) {
        return media[1];
    }

    // 3. media:thumbnail
    const thumbnail = item.match(
        /<media:thumbnail[^>]+url=["']([^"']+)["']/i
    );

    if (thumbnail) {
        return thumbnail[1];
    }

    // 4. image di description/content
    const image = item.match(
        /<img[^>]+src=["']([^"']+)["']/i
    );

    if (image) {
        return image[1];
    }

    // 5. og:image jika ada
    const ogImage = item.match(
        /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
    );

    if (ogImage) {
        return ogImage[1];
    }

    return "";
}

/* ================================
   FORMAT WAKTU
================================ */

function formatDate(dateString) {

    if (!dateString) {
        return "Terbaru";
    }


    const date =
        new Date(dateString);


    if (Number.isNaN(date.getTime())) {
        return "Terbaru";
    }


    const now =
        new Date();


    const diff =
        Math.floor(
            (now - date) / 60000
        );


    if (diff < 1) {
        return "Baru saja";
    }


    if (diff < 60) {
        return `${diff} menit lalu`;
    }


    const hours =
        Math.floor(diff / 60);


    if (hours < 24) {
        return `${hours} jam lalu`;
    }


    const days =
        Math.floor(hours / 24);


    if (days === 1) {
        return "Kemarin";
    }


    return `${days} hari lalu`;

}


/* ================================
   HAPUS DUPLIKAT
================================ */

function removeDuplicates(articles) {

    const seen = new Set();

    return articles.filter(article => {

        const key =
            article.url ||
            article.id ||
            article.title;


        if (seen.has(key)) {
            return false;
        }


        seen.add(key);

        return true;

    });

}


/* ================================
   URUTKAN BERITA
================================ */

function sortArticles(articles) {

    return articles.sort(
        (a, b) => {

            const dateA =
                new Date(
                    a.publishedAt || 0
                );

            const dateB =
                new Date(
                    b.publishedAt || 0
                );

            return dateB - dateA;

        }
    );

}


/* ================================
   MAIN
================================ */

async function main() {

    console.log(
        "================================"
    );

    console.log(
        "GGNesia News RSS Updater"
    );

    console.log(
        "================================"
    );


    const sources =
        readSources();


    let allArticles = [];


    for (const source of sources) {

        console.log(
            `\nMengambil: ${source.name}`
        );

        try {

            const xml =
                await fetchRSS(
                    source.feed
                );


            const articles =
                parseRSS(
                    xml,
                    source
                );


            console.log(
                `  → ${articles.length} berita`
            );


            allArticles =
                allArticles.concat(
                    articles
                );


        } catch (error) {

            console.log(
                `  ✕ Gagal: ${error.message}`
            );

        }

    }


    /*
       Hilangkan duplikat
    */

    allArticles =
        removeDuplicates(
            allArticles
        );


    /*
       Urutkan berdasarkan waktu
    */

    allArticles =
        sortArticles(
            allArticles
        );


    /*
       Batasi jumlah berita
    */

    allArticles =
        allArticles.slice(
            0,
            MAX_ARTICLES
        );


    /*
       Simpan
    */

    fs.writeFileSync(
        ARTICLES_FILE,
        JSON.stringify(
            allArticles,
            null,
            2
        ),
        "utf8"
    );


    console.log(
        `\nTotal berita: ${allArticles.length}`
    );

    console.log(
        "articles.json berhasil diperbarui."
    );

}


main().catch(error => {

    console.error(error);

    process.exit(1);

});
