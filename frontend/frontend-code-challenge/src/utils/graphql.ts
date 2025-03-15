import { Pokemon, PokemonConnection, PokemonQueryVariables, PokemonCardData } from '../types/pokemon';

const API_URL = 'http://localhost:4000/graphql';

async function fetchGraphQL<T>(query: string, variables?: any): Promise<T> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const { data, errors } = await response.json();
  if (errors) {
    throw new Error(errors[0].message);
  }

  return data;
}

export async function getPokemons(variables: PokemonQueryVariables): Promise<PokemonConnection> {
  const query = `
    query GetPokemons($limit: Int!, $offset: Int!, $search: String, $filter: PokemonFilterInput) {
      pokemons(query: { limit: $limit, offset: $offset, search: $search, filter: $filter }) {
        count
        edges {
          id
          name
          types
          image
          isFavorite
        }
      }
    }
  `;

  const data = await fetchGraphQL<{ pokemons: PokemonConnection }>(query, variables);
  return data.pokemons;
}

export async function getPokemonDetails(name: string): Promise<Pokemon> {
  const query = `
    query GetPokemonDetails($name: String!) {
      pokemonByName(name: $name) {
        id
        name
        types
        weight {
          minimum
          maximum
        }
        height {
          minimum
          maximum
        }
        maxCP
        maxHP
        image
        sound
        isFavorite
      }
    }
  `;

  const data = await fetchGraphQL<{ pokemonByName: Pokemon }>(query, { name });
  return data.pokemonByName;
}

export async function getPokemonTypes(): Promise<string[]> {
  const query = `
    query GetPokemonTypes {
      pokemonTypes
    }
  `;

  const data = await fetchGraphQL<{ pokemonTypes: string[] }>(query);
  return data.pokemonTypes;
}

export async function toggleFavorite(id: string, isFavorite: boolean): Promise<Pokemon> {
  const mutation = `
    mutation ${isFavorite ? 'UnFavoritePokemon' : 'FavoritePokemon'}($id: ID!) {
      ${isFavorite ? 'unFavoritePokemon' : 'favoritePokemon'}(id: $id) {
        id
        isFavorite
      }
    }
  `;

  const data = await fetchGraphQL<{ [key: string]: Pokemon }>(mutation, { id });
  return data[isFavorite ? 'unFavoritePokemon' : 'favoritePokemon'];
} 