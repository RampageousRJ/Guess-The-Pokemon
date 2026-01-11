// Store sessions for different users to interact with
const games = new Map();

export function createGame(sessionId, pokemonData) {
    games.set(sessionId, pokemonData);
}

export function getGame(sessionId) {
    return games.get(sessionId);
}

export function deleteGame(sessionId) {
    games.delete(sessionId);
}
