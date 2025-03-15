import React, { useRef } from 'react';
import Image from 'next/image';
import styles from './PokemonModal.module.scss';
import { Pokemon } from '../../types/pokemon';

interface PokemonModalProps {
  pokemon: Pokemon;
  onClose: () => void;
  loading?: boolean;
}

const PokemonModal: React.FC<PokemonModalProps> = ({
  pokemon,
  onClose,
  loading = false,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = () => {
    if (pokemon.sound && audioRef.current) {
      audioRef.current.play();
    }
  };

  const getBarWidth = (value: number, max: number = 4000) => {
    return Math.min((value / max) * 100, 100);
  };

  if (loading) {
    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          <div className={styles.loading}>Loading details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        <div className={styles.content}>
          <div className={styles.imageSection}>
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={300}
              height={300}
              className={styles.image}
              priority
            />
            {pokemon.sound && (
              <>
                <audio ref={audioRef} src={pokemon.sound} />
                <button className={styles.soundButton} onClick={playSound} aria-label="Play Pokemon sound">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                  </svg>
                </button>
              </>
            )}
          </div>

          <div className={styles.details}>
            <h2 className={styles.name}>{pokemon.name}</h2>
            
            <div className={styles.types}>
              {pokemon.types.map(type => (
                <span key={type} className={styles.type}>
                  {type}
                </span>
              ))}
            </div>

            <div className={styles.stats}>
              {pokemon.maxCP && (
                <div className={styles.statBar}>
                  <span className={styles.statLabel}>CP: {pokemon.maxCP}</span>
                  <div className={styles.barContainer}>
                    <div 
                      className={`${styles.bar} ${styles.cpBar}`} 
                      style={{ width: `${getBarWidth(pokemon.maxCP)}%` }} 
                    />
                  </div>
                </div>
              )}
              {pokemon.maxHP && (
                <div className={styles.statBar}>
                  <span className={styles.statLabel}>HP: {pokemon.maxHP}</span>
                  <div className={styles.barContainer}>
                    <div 
                      className={`${styles.bar} ${styles.hpBar}`} 
                      style={{ width: `${getBarWidth(pokemon.maxHP)}%` }} 
                    />
                  </div>
                </div>
              )}
            </div>

            {(pokemon.weight || pokemon.height) && (
              <div className={styles.dimensions}>
                {pokemon.weight && (
                  <div className={styles.dimension}>
                    <h3>Weight</h3>
                    <p>{pokemon.weight.minimum} - {pokemon.weight.maximum}</p>
                  </div>
                )}
                {pokemon.height && (
                  <div className={styles.dimension}>
                    <h3>Height</h3>
                    <p>{pokemon.height.minimum} - {pokemon.height.maximum}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal; 