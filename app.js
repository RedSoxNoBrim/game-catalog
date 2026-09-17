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
