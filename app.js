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

const grid = document.querySelector("#grid");

let searchText = "";
let selectedGenres = [];
let selectedPlatforms = [];
let sortBy = "aToZ";

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
                    
                })
            } else if (key === "blurb") {
                    body.appendChild(p) 
                    body.appendChild(genreContainer);
            } 
        })
        card.appendChild(body);
        card.appendChild(footer);

        grid.appendChild(card);
    })
}

const updateGrid = () => {
    let filteredGames = GAMES;

    if (searchText) {
        filteredGames = filteredGames.filter((game) => {
            return game.title.toLowerCase().includes(searchText);
        })
    }

    if (selectedGenres.length > 0) {
        filteredGames = filteredGames.filter((game) => {
            return selectedGenres.some((genre) => {
                return game.genres.includes(genre);
            });
        });
    };

    if (selectedPlatforms.length > 0) {
        filteredGames = filteredGames.filter((game) => {
            return selectedPlatforms.some((platform) => {
                return game.platforms.includes(platform);
            });
        });
    };

    filteredGames = sortGames(sortBy, filteredGames);

    grid.replaceChildren();
    cardGrid(filteredGames);

    let countNumber = filteredGames.length;
    
    const count = document.querySelector("#count");
    
    count.innerHTML = `Currently showing <span class="game-count">${countNumber}</span> of <span class="game-count">${GAMES.length}</span> games`
    
    const emptyState = () => {
        const div = document.createElement("div");
        const header = document.createElement("h2");
        const p = document.createElement("p");
        const button = document.createElement("button");
        

        header.classList.add("emptyHeader");
        p.classList.add("emptyText");
        button.classList.add("emptyButton");
        div.classList.add("emptyContainer");

        if (countNumber === 0) {
            header.textContent = "No games match those filters";
            p.textContent = "Try removing a genre, or widening the platform list";
            button.textContent = "Clear all filters";

            div.appendChild(header);
            div.appendChild(p);
            div.appendChild(button);

            grid.appendChild(div);

            button.addEventListener("click", () => {
                const filters = document.querySelectorAll("button");
                let sort = document.querySelector("#sort");
                let searchInput = document.querySelector("#searchBar");
            
                searchText = "";
                sortBy = "aToZ";
                selectedGenres = [];
                selectedPlatforms = [];

                searchInput.value = "";
                sort.value = sortBy;

                filters.forEach((button) => {
                    button.setAttribute("aria-pressed", "false");
                })

                updateGrid();
            })
        }
    }
    emptyState();
}

const resetFilters = () => {
        const filterButton = document.querySelector(".clearFilters")
        

        

        filterButton.addEventListener("click", () => {
            const filters = document.querySelectorAll("button")
            let sort = document.querySelector("#sort")
            let searchInput = document.querySelector("#searchBar")
            
            searchText = "";
            sortBy = "aToZ";
            selectedGenres = [];
            selectedPlatforms = [];

            searchInput.value = "";
            sort.value = sortBy;

            filters.forEach((button) => {
                button.setAttribute("aria-pressed", "false");
            });

            updateGrid();
        });
};

const searchBar = () => {
    const search = document.querySelector("#searchBar")
    

    search.addEventListener("input", () => {
        searchText = search.value.toLowerCase();
        updateGrid()
    })
}

const sortGames = (sortBy, games) => {
    const [property, direction] = sortBy.split("-");
        
    const highestSorted = games.toSorted((a,b) => a[property] - b[property]);
    const lowestSorted = games.toSorted((a,b) => b[property] - a[property]);
    const sortAtoZ = games.toSorted((a,b) => a.title.localeCompare(b.title));
    const sortZtoA = games.toSorted((a,b) => b.title.localeCompare(a.title));


    /*console.log(property) */
        

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

const sortingOptions = () => {
    const sort = document.querySelector("#sort")

    sort.addEventListener("change", () => {
        sortBy = sort.value;
        console.log(sortBy)
        updateGrid();
    })
}

const createFilterChips = (sortBy) => {
}
const genreFilters = () => {
    const genreRow = document.querySelector("#genreRow");
    const container = document.createElement("div");
    const label = document.createElement("div");

    container.classList.add("chipContainer");

    label.textContent = "Genre";
    genreRow.appendChild(label);
    label.classList.add("labels");
    
    const genres = [];
    const getGenres = () => {
        GAMES.forEach((game) => {
            game.genres.forEach((genre) => {
                if (!genres.includes(genre)) {
                    genres.push(genre);
                };
            });
        });
        genres.sort();
    };

    const createButtons = () => {
        genres.forEach((genre) => {
            const button = document.createElement("button");

            button.textContent = `${genre}`;
            button.id = genre;
            button.setAttribute("aria-pressed", "false");
            button.classList.add("genreButtons");
            container.appendChild(button);
        })

        genreRow.appendChild(container);
    };
    
    getGenres();
    createButtons();

    const getButton = document.querySelectorAll(".genreButtons");
    
    getButton.forEach((button) => {
        button.addEventListener("click", () => {
            const pressed = button.getAttribute("aria-pressed");
            
            if (pressed === "false") {
                button.setAttribute("aria-pressed", "true");
                selectedGenres.push(button.id);
                console.log(selectedGenres);
            } else {
                button.setAttribute("aria-pressed", "false");
                selectedGenres = selectedGenres.filter((genre) => genre !== button.id);
                console.log(selectedGenres)
            }

            updateGrid();

        });
    });
}

const platformFilters = () => {
    const platformRow = document.querySelector("#platformRow")
    const container = document.createElement("div")
    const label = document.createElement("div")

    container.classList.add("chipContainer")

    label.textContent = "Platform"
    platformRow.appendChild(label)
    label.classList.add("labels")

    const platforms = [];
    const getPlatforms = () => {
        GAMES.forEach((game) => {
            game.platforms.forEach((platform) => {
                if (!platforms.includes(platform)) {
                    platforms.push(platform)
                }
            })
        })
    }

    const createButtons = () => {
        platforms.forEach((platform) => {
            const button = document.createElement("button")

            button.textContent = `${platform}`
            button.id = platform
            button.setAttribute("aria-pressed", "false")
            button.classList.add("platformButtons")
            container.appendChild(button)
        })

        platformRow.appendChild(container)
    }

    getPlatforms()
    createButtons()
    
    const getButton = document.querySelectorAll(".platformButtons")

    getButton.forEach((button) => {
        button.addEventListener("click", () => {
            const pressed = button.getAttribute("aria-pressed")

            if (pressed === "false") {
                button.setAttribute("aria-pressed", "true");
                selectedPlatforms.push(button.id);
                console.log(selectedPlatforms)
            } else {
                button.setAttribute("aria-pressed", "false");
                selectedPlatforms = selectedPlatforms.filter((platform) => platform !== button.id)
                console.log(selectedPlatforms)
            }

            updateGrid();
        });
    });
}

resetFilters();
genreFilters();
platformFilters();
searchBar();
sortingOptions();
updateGrid();

