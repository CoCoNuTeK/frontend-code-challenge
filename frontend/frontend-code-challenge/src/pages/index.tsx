import { Geist } from "next/font/google";
import React, { useState, useEffect } from 'react';
import TabNavigation from '../components/TabNavigation/TabNavigation';
import ControlsBar from '../components/ControlsBar/ControlsBar';
import PokemonList from '../components/PokemonList/PokemonList';
import styles from './index.module.scss';
import { getPokemons, getPokemonTypes, toggleFavorite } from '../utils/graphql';
import { PokemonCardData } from '../types/pokemon';

const geist = Geist({
  subsets: ["latin"],
});

const ITEMS_PER_PAGE = 1000;

export default function Home() {
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [pokemons, setPokemons] = useState<PokemonCardData[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const types = await getPokemonTypes();
        setAvailableTypes(types);
      } catch (error) {
        console.error('Failed to load Pokemon types:', error);
      }
    };
    loadTypes();
  }, []);

  useEffect(() => {
    const loadPokemons = async () => {
      setLoading(true);
      try {
        const result = await getPokemons({
          limit: ITEMS_PER_PAGE,
          offset: 0,
          search: searchQuery || undefined,
          filter: {
            type: selectedTypes.length === 1 ? selectedTypes[0] : undefined,
            isFavorite: activeTab === 'favorites' ? true : undefined
          }
        });
        setPokemons(result.edges);
      } catch (error) {
        console.error('Failed to load Pokemons:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, [searchQuery, selectedTypes, activeTab]);

  const handleFavoriteToggle = async (name: string) => {
    const pokemon = pokemons.find(p => p.name === name);
    if (pokemon) {
      try {
        await toggleFavorite(pokemon.id, pokemon.isFavorite);
        // If we're in favorites tab and unfavoriting, remove the Pokemon from the list
        if (activeTab === 'favorites') {
          setPokemons(prevPokemons => prevPokemons.filter(p => p.name !== name));
        } else {
          // In all tab, just update the favorite status
          setPokemons(prevPokemons => 
            prevPokemons.map(p => 
              p.name === name 
                ? { ...p, isFavorite: !p.isFavorite }
                : p
            )
          );
        }
      } catch (error) {
        console.error('Failed to toggle favorite:', error);
      }
    }
  };

  return (
    <div className={`${styles.container} ${geist.className}`}>
      <main className={styles.main}>
        <TabNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <ControlsBar
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTypes={selectedTypes}
          onTypeChange={setSelectedTypes}
          availableTypes={availableTypes}
          view={view}
          onViewChange={setView}
        />

        <PokemonList 
          pokemons={pokemons}
          view={view}
          onFavoriteToggle={handleFavoriteToggle}
        />

        {loading && <div className={styles.loading}>Loading...</div>}
      </main>
    </div>
  );
}
