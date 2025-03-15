export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
}

export interface PokemonCardData {
  id: string;
  name: string;
  types: string[];
  image: string;
  isFavorite: boolean;
}

export interface Pokemon extends PokemonCardData {
  weight?: {
    minimum: string;
    maximum: string;
  };
  height?: {
    minimum: string;
    maximum: string;
  };
  maxCP?: number;
  maxHP?: number;
  sound?: string;
  stats?: PokemonStats;
}

export interface PokemonConnection {
  count: number;
  edges: PokemonCardData[];
}

export interface PokemonQueryVariables {
  limit: number;
  offset: number;
  search?: string;
  filter?: PokemonFilterInput;
}

export interface PokemonFilterInput {
  type?: string;
  isFavorite?: boolean;
} 