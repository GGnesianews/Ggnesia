/* =================================
   GGNESIA - GAMES
   ================================= */

document.addEventListener("DOMContentLoaded", async () => {

    const gameContainer =
        document.querySelector(".games-container");

    if (!gameContainer) {
        return;
    }

    try {

        const response =
            await fetch("../data/games.json");

        if (!response.ok) {
            throw new Error("Gagal mengambil data games");
        }

        const games = await response.json();

        gameContainer.innerHTML = "";

        games.forEach(game => {

            const card =
                document.createElement("article");

            card.className = "game-card";

            card.innerHTML = `
                <div class="game-image">
                    ${escapeHTML(game.name)}
                </div>

                <div class="game-info">

                    <span class="category">
                        ${escapeHTML(game.category)}
                    </span>

                    <h2>
                        ${escapeHTML(game.name)}
                    </h2>

                    <a href="news.html?game=${encodeURIComponent(game.slug)}">
                        Lihat berita →
                    </a>

                </div>
            `;

            gameContainer.appendChild(card);

        });

    } catch (error) {

        console.error("Games error:", error);

        gameContainer.innerHTML = `
            <p>
                Data game belum dapat dimuat.
            </p>
        `;

    }


    function escapeHTML(text = "") {

        const element =
            document.createElement("div");

        element.textContent = text;

        return element.innerHTML;

    }

});
