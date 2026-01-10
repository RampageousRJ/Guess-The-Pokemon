import express from "express";
import crypto from "crypto";
import { fetchPokemon } from "./fetchPokemon.js";
import { validateGuess } from "./guess.js";
import { createGame, getGame, deleteGame } from "./session.js"


const app = express();
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get("/api/game/start", async (req,res) => {
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
});


app.post("/api/game/guess", async (req,res) => {
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
});


app.listen(3000, () =>
    console.log("Server running on http://localhost:3000")  
);