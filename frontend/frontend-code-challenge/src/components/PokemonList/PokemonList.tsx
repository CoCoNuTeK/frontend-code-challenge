import React from 'react';
import styles from './PokemonList.module.scss';
import PokemonCard from '../PokemonCard/PokemonCard';
import { Pokemon } from '../../types/pokemon';

interface PokemonListProps {
  pokemons: Pokemon[];
  view: 'grid' | 'list';
  onFavoriteToggle: (name: string) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({
  pokemons,
  view,
  onFavoriteToggle
}) => {
  return (
    <div className={`${styles.container} ${styles[view]}`}>
      {pokemons.map(pokemon => (
        <PokemonCard
          key={pokemon.name}
          pokemon={pokemon}
          isFavorite={pokemon.isFavorite}
          onToggleFavorite={() => onFavoriteToggle(pokemon.name)}
          view={view}
        />
      ))}
    </div>
  );
};

export default PokemonList; 