async function getEvolutionStages(speciesUrl, pokemonName) {
  const evolutionResponse = await fetch(speciesUrl);
  const evolutionData = await evolutionResponse.json();
  let stage = 0;
  let current = evolutionData.chain;

  while (current) {
    if (current.species.name === pokemonName) {
      break;
    }
    if (current.evolves_to.length > 0) {
      stage++;
      current = current.evolves_to[0];
    } else {
      break;
    }
  }
  return stage;
}

export async function fetchPokemon(id) {
    try{
        const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeData = await pokeResponse.json();
        
        const pokeMoreInfoResponse = await fetch(pokeData.species.url);
        const pokeMoreInfoData = await pokeMoreInfoResponse.json();
        const evolutionStage = await getEvolutionStages(pokeMoreInfoData.evolution_chain.url, pokeData.name);
        return {
            name: pokeData.name,            
            cry: pokeData.cries.legacy,
            backSprite: pokeData.sprites.back_default,
            frontSprite: pokeData.sprites.front_default,
            captureRate: pokeMoreInfoData.capture_rate,
            color: pokeMoreInfoData.color.name,
            generation: pokeMoreInfoData.generation.name,
            habitat: pokeMoreInfoData.habitat?.name ?? "unknown",
            shape: pokeMoreInfoData.shape.name,
            isLegendary: pokeMoreInfoData.is_legendary,
            isMythical: pokeMoreInfoData.is_mythical,
            types: pokeData.types,
            abilities: pokeData.abilities,
            evolutionStage: evolutionStage
        };
    }
    catch (error){
        console.error(`Error: ${error}`)
    }
} 
