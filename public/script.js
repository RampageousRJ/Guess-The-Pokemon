let id = Math.floor(Math.random() * 151) + 1;
let legacyCryUrl = null;
let sessionId = null;

const pokemonType = document.getElementById('pokemon-type');
const pokemonAbilities = document.getElementById('pokemon-abilities');
const pokemonCaptureRate = document.getElementById('pokemon-capture-rate');
const pokemonColor = document.getElementById('pokemon-color');
const pokemonGeneration = document.getElementById('pokemon-generation');
const pokemonHabitat = document.getElementById('pokemon-habitat');
const pokemonShape = document.getElementById('pokemon-shape');
const pokemonIsLegendary = document.getElementById('pokemon-is-legendary');
const pokemonIsMythical = document.getElementById('pokemon-is-mythical');
const pokemonSprite = document.getElementById('pokemon-sprite');
const imageHintButton = document.getElementById('image-hint');
const submitGuessButton = document.getElementById('submit-guess');
const guessText = document.getElementById('pokemon-guess');
const playLegacySoundButton = document.getElementById('play-cry-legacy')
const pokemonCry = document.getElementById('pokemon-cry')
const pokemonEvolutionStage = document.getElementById("pokemon-evolution-stage");

imageHintButton.addEventListener('click', () => {
  imageHintButton.style.display = 'none';
  pokemonSprite.style.display = 'block';
});

playLegacySoundButton.addEventListener('click', () => {
  pokemonCry.src = legacyCryUrl;
  pokemonCry.play();
});

submitGuessButton.addEventListener('click', async () => {
    const guess = guessText.value;

    if (!sessionId) {
      alert("Game not initialized yet. Please refresh.");
      return;
    }

    const res = await fetch("/api/game/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, guess })
    });
    const data = await res.json();
    const result = data.status;
    if (result === "correct") {
      alert("Hooray! You guessed correctly!");
      location.reload();
    }
    else if (result === "almost") {
      alert(`You just missed the spelling a bit! The correct spelling is ${res.correct}! Congratulations!`)
      location.reload();
    }
    else {
      alert("Thats not quite right! Guess again!");
    }
}); 

function romanToInt(roman) {
  const romanNumerals = {
    'i': 1,
    'v': 5,
    'x': 10,
    'l': 50,
    'c': 100,
    'd': 500,
    'm': 1000
  };
  let total = 0;
  let prevValue = 0;
  for (let i = roman.length - 1; i >= 0; i--) {
    const currentValue = romanNumerals[roman[i]];
    if (currentValue < prevValue) {
      total -= currentValue;
    } else {
      total += currentValue;
    } 
    prevValue = currentValue;
  }
  return total;
}



async function fetchPokemonData(id) {
  try{
    // Fetch basic Pokémon data
    const pokeResponse = await fetch(`/api/game/start`);
    const pokemon = await pokeResponse.json();
    sessionId = pokemon.sessionId;
    // Extract relevant information
    legacyCryUrl = pokemon.hints.cry;
    const captureRate = pokemon.hints.captureRate;
    const color = pokemon.hints.color;
    const generation = pokemon.hints.generation;
    const habitat = pokemon.hints.habitat ? pokemon.hints.habitat : 'unknown';
    const shape = pokemon.hints.shape;
    const isLegendary = pokemon.hints.is_legendary;
    const isMythical = pokemon.hints.is_mythical;
    const spriteUrl = pokemon.hints.frontSprite;

    let type = []
    pokemon.hints.types.forEach(t => {
      let typeName = t.type.name;
      type.push(typeName.charAt(0).toUpperCase() + typeName.slice(1));
    })
    
    let abilities = []
    pokemon.hints.abilities.forEach(a => {
      let abilityName = a.ability.name;
      abilities.push(abilityName.charAt(0).toUpperCase() + abilityName.slice(1));
    })

    const evolutionStage = pokemon.hints.evolutionStage;

    pokemonType.textContent = `${type.join(', ')}`;
    pokemonAbilities.textContent = `${abilities.join(', ')}`;
    pokemonColor.textContent = `${color.charAt(0).toUpperCase() + color.slice(1)}`;
    pokemonCaptureRate.textContent = `${captureRate}`;
    pokemonGeneration.textContent = `Generation ${romanToInt(generation.charAt(generation.length - 1))}`;
    pokemonHabitat.textContent = `${habitat.charAt(0).toUpperCase() + habitat.slice(1)}`;
    pokemonShape.textContent = `${shape.charAt(0).toUpperCase() + shape.slice(1)}`;
    pokemonIsLegendary.textContent = isLegendary ? 'Yes' : 'No';
    pokemonIsMythical.textContent = isMythical ? 'Yes' : 'No';
    pokemonSprite.src = spriteUrl;
    pokemonEvolutionStage.textContent =
    evolutionStage === 0 ? 'Basic form' :
    evolutionStage === 1 ? 'First evolution' :
    evolutionStage === 2 ? 'Second evolution' :
    `Evolution stage ${evolutionStage}`;
  }
  catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
}

// Use fuzzy matching functions
function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // delete
          dp[i][j - 1],     // insert
          dp[i - 1][j - 1]  // replace
        );
      }
    }
  }

  return dp[a.length][b.length];
}

function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}


function similarityScore(a, b) {
  const distance = levenshtein(a, b);
  return 1 - distance / Math.max(a.length, b.length);
}


function isFuzzyMatch(guess, actual) {
  const g = normalize(guess);
  const a = normalize(actual);

  if (!g || !a) return 0.0;

  if (g === a) return 1.0;

  return similarityScore(g, a);
}


fetchPokemonData(id);