import { Pokemon, PokemonListResponse, PokemonListItem } from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2';

export class PokemonService {
  static async getPokemonList(limit: number = 20): Promise<PokemonListItem[]> {
    try {
      const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PokemonListResponse = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error loading Pokémon list:', error);
      throw error;
    }
  }

  static async getPokemonDetails(urlOrId: string | number): Promise<Pokemon> {
    try {
      const url =
        typeof urlOrId === 'string'
          ? urlOrId
          : `${BASE_URL}/pokemon/${urlOrId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const pokemon: Pokemon = await response.json();
      return pokemon;
    } catch (error) {
      console.error('Error loading Pokémon details:', error);
      throw error;
    }
  }

  static async getFirstPokemonWithDetails(
    limit: number = 20,
  ): Promise<Pokemon[]> {
    try {
      const pokemonList = await this.getPokemonList(limit);

      const pokemonPromises = pokemonList.map(item =>
        this.getPokemonDetails(item.url),
      );

      const pokemonWithDetails = await Promise.all(pokemonPromises);
      return pokemonWithDetails;
    } catch (error) {
      console.error('Error loading Pokémon with details:', error);
      throw error;
    }
  }
}
