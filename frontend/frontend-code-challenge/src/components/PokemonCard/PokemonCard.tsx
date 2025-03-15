import React, { useState } from 'react';
import Image from 'next/image';
import styles from './PokemonCard.module.scss';
import PokemonModal from '../PokemonModal/PokemonModal';
import { PokemonCardData, Pokemon } from '../../types/pokemon';
import { getPokemonDetails } from '../../utils/graphql';

interface PokemonCardProps {
  pokemon: PokemonCardData;
  isFavorite: boolean;
  onToggleFavorite: (name: string) => void;
  view: 'grid' | 'list';
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isFavorite,
  onToggleFavorite,
  view,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!pokemon) {
    return (
      <div className={`${styles.card} ${styles.loading}`}>
        <div className={styles.imageContainer} />
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.loadingName} />
          </div>
          <div className={styles.types}>
            <div className={styles.loadingType} />
          </div>
        </div>
      </div>
    );
  }

  const handleClick = async () => {
    setIsModalOpen(true);
    if (!pokemonDetails) {
      setIsLoading(true);
      try {
        const details = await getPokemonDetails(pokemon.name);
        setPokemonDetails(details);
      } catch (error) {
        console.error('Failed to fetch Pokemon details:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(pokemon.name);
  };

  const cardClassName = `${styles.card} ${view === 'list' ? styles.listView : ''}`;

  const renderModal = () => {
    if (!isModalOpen) return null;
    
    // If we have details, use them, otherwise use the card data with empty optional fields
    const modalData: Pokemon = pokemonDetails || {
      ...pokemon,
      stats: undefined,
      weight: undefined,
      height: undefined,
      maxCP: undefined,
      maxHP: undefined,
      sound: undefined
    };

    return (
      <PokemonModal
        pokemon={modalData}
        onClose={() => setIsModalOpen(false)}
        loading={isLoading}
      />
    );
  };

  if (view === 'list') {
    return (
      <>
        <div className={cardClassName} onClick={handleClick}>
          <div className={styles.imageContainer}>
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={64}
              height={64}
              className={styles.image}
              quality={100}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.header}>
              <h3 className={styles.name}>{pokemon.name}</h3>
              <div className={styles.types}>
                {pokemon.types.map((type) => (
                  <span key={type} className={styles.type}>
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button
            className={styles.favoriteButton}
            onClick={handleFavoriteClick}
            data-favorite={isFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
        {renderModal()}
      </>
    );
  }

  return (
    <>
      <div className={cardClassName} onClick={handleClick}>
        <div className={styles.imageContainer}>
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={200}
            height={200}
            className={styles.image}
            quality={100}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.name}>{pokemon.name}</h3>
            <button
              className={styles.favoriteButton}
              onClick={handleFavoriteClick}
              data-favorite={isFavorite}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>
          <div className={styles.types}>
            {pokemon.types.map((type) => (
              <span key={type} className={styles.type}>
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
      {renderModal()}
    </>
  );
};

export default PokemonCard; 