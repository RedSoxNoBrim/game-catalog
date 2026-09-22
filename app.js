/*
 * GameShelf - your code goes here.
 *
 * The catalog is already loaded. GAMES is an array of 42 game objects,
 * defined in data/games.js, and it is available here because that script
 * tag comes first in index.html.
 *
 * Before you write anything: open index.html in your browser, open the
 * console (F12), and try these.
 *
 *   GAMES.length
 *   GAMES[0]
 *   GAMES[0].genres
 *   GAMES.map((game) => game.title)
 *   GAMES.filter((game) => game.year > 2020)
 *
 * Poking at real data in the console is the fastest way to understand the
 * shape of it, and you will do this for the rest of your career.
 *
 * Delete the line below once you have seen it work.
 */

console.log(`GameShelf loaded ${GAMES.length} games. Here is the first one:`, GAMES[0]);

const grid = document.querySelector("#grid");

const firstCard = () => {
    const cards = document.createElement("div");
    const cover = document.createElement("div");
    const footer = document.createElement("div");

    cards.classList.add("cards");
    cover.classList.add("cover");
    footer.classList.add("footer")

    cover.style.background = `linear-gradient(${GAMES[0].coverFrom}, ${GAMES[0].coverTo})`;
    cards.appendChild(cover);
    

    Object.entries(GAMES[0]).forEach(([key, value]) => {
        const p = document.createElement("p");
        p.classList.add(key);

        p.textContent = ` ${value}`;
        
        if (key === "title" || key === "rating") {
            if (key === "rating") {
                p.textContent = value.toFixed(1);
            }
            cover.appendChild(p)
        } else if (key === "players" || key === "avgHours" || key === "platforms") {
            footer.appendChild(p)
        } else if (key !== "coverFrom" && key !== "coverTo" && key !== "id") {
            cards.appendChild(p) 
        };
        
        cards.appendChild(footer);
    });
    grid.appendChild(cards);

    
};


const cardGrid = (games) => {
    games.forEach((game) => {
        const body = document.createElement("div");
        const card = document.createElement("div");
        const cover = document.createElement("div");
        const footer = document.createElement("div");
        

        const genreContainer = document.createElement("div");
        


        body.classList.add("body")
        card.classList.add("cards");
        cover.classList.add("cover");
        footer.classList.add("footer");
        

        genreContainer.classList.add("genreContainer");
        

        cover.style.background = `linear-gradient(${game.coverFrom}, ${game.coverTo})`;

        
        card.appendChild(cover)


        Object.entries(game).forEach(([key, value]) => {
            const p = document.createElement("p");
            
            p.classList.add(key);

            p.textContent = ` ${value}`;
        
            if (key === "title" || key === "rating") {
                if (key === "rating") {
                    p.textContent = value.toFixed(1);
                    cover.appendChild(p)
                } else {
                    const header = document.createElement("h2")
                    header.classList.add(key);

                    header.textContent = `${value}`
                    cover.appendChild(header);
                }
                
            } else if (key === "platforms") {
                p.textContent = value.join(" · ")
                footer.appendChild(p);
            } else if (key === "players") {
                const platformText = game.platforms.join(" · ");

                if (game.players === "Both" || platformText.length > 8) {
                    p.textContent = `${game.avgHours}h`;
                
                } else {
                p.textContent = `${value} · ${game.avgHours}h`;
                
                }
                footer.appendChild(p)
            } else if (key === "year") {
                    p.textContent = `${game.developer} · ${value}`;
                    body.appendChild(p)
            } else if (key === "genres") {
                game.genres.forEach((genre) => {
                    const genres = document.createElement("p");
                    genres.classList.add("genreTags")

                    genres.textContent = `${genre}`;
                    genreContainer.appendChild(genres);
                    body.appendChild(genreContainer);
                })
            } else if (key === "blurb") {
                    body.appendChild(p) 
            }

            
        
        
        
        })
        card.appendChild(body);
        card.appendChild(footer);

        grid.appendChild(card);
    })
}

cardGrid(GAMES);


const searchBar = () => {
    const search = document.querySelector("#searchBar")
    const grid = document.querySelector("#grid")

    search.addEventListener("input", () => {
        console.log("Yea you searchin")
        grid.replaceChildren();
        const filteredGames = GAMES.filter((game) => game.title.toLowerCase().includes(search.value.toLowerCase()))
        console.log(filteredGames)
        cardGrid(filteredGames);
        
    })
}


searchBar();


const sortingOptions = () => {
    const grid = document.querySelector("#grid")
    const sort = document.querySelector("#sort")
            

    const sortGames = (sortBy) => {
        const [property, direction] = sortBy.split("-");
        
        const highestSorted = GAMES.toSorted((a,b) => a[property] - b[property]);
        const lowestSorted = GAMES.toSorted((a,b) => b[property] - a[property]);
        const sortAtoZ = GAMES.toSorted((a,b) => a.title.localeCompare(b.title));
        const sortZtoA = GAMES.toSorted((a,b) => b.title.localeCompare(a.title));


        console.log(property)
        

        if (direction === "asc") {
            return highestSorted;
        } else if (direction === "desc") {
            return lowestSorted;
        }else if (sortBy === "aToZ") {
            return sortAtoZ;
        } else {
            return sortZtoA;
        }
        
    }
    
    sort.addEventListener("change", () => {
        grid.replaceChildren();

        console.log(sort.value)

        const sortedGames = sortGames(sort.value);

        cardGrid(sortedGames)
    })
    
}


sortingOptions()