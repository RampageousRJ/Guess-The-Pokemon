import crypto from "crypto";
import { fetchPokemon } from "../services/fetch.service.js";
import { validateGuess } from "../services/guess.service.js";
import { createGame, getGame, deleteGame } from "../services/session.service.js"

export const getStartGame = async (req,res) => {
    const id = Math.floor(Math.random()*151) + 1;
    const sessionId = crypto.randomUUID();

    const pokemon = await fetchPokemon(id);
    createGame(sessionId, {
        name: pokemon.name
    });
    console.log(`New game created with the SessionID: ${sessionId} for the Pokemon: ${pokemon.name}`);
    res.json({
        sessionId,
        hints: {
            types: pokemon.types,
            abilities: pokemon.abilities,
            color: pokemon.color,
            generation: pokemon.generation,
            habitat: pokemon.habitat,
            shape: pokemon.shape,
            isLegendary: pokemon.isLegendary,
            isMythical: pokemon.isMythical,
            backSprite: pokemon.backSprite,
            frontSprite: pokemon.frontSprite,
            cry: pokemon.cry,
            evolutionStage: pokemon.evolutionStage,
            captureRate: pokemon.captureRate
        }
    }) 
}

export const postGuessGame = async (req,res) => {
    const {sessionId, guess} = req.body;
    const game = getGame(sessionId);
    if(!game) {
        return res.status(400).json({ error: "Invalid Session ID"} );
    }
    const result = await validateGuess(guess, game.name);
    if(result.status !== "wrong"){
        deleteGame(sessionId);
    }
    res.json(result);
}