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


export async function validateGuess(guessedPokemon, pokemonName) {
    const g = normalize(guessedPokemon);
    const a = normalize(pokemonName);
    const similarity = 1 - levenshtein(g, a) / Math.max(g.length, a.length);

    if (similarity === 1)
        return { status: "correct" };

    if (similarity > 0.8)
        return { status: "almost", correct: pokemonName };

    return { status: "wrong" };
}
