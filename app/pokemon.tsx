import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface PokemonListItem {
  name: string;
  url: string;
}

export default function PokemonScreen() {
  const router = useRouter();
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Recherche / filtres
  const [query, setQuery] = useState('');
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searching, setSearching] = useState(false); // true quand on montre résultats de recherche

  useEffect(() => {
    fetchPokemon();
    fetchTypes();
  }, []);

  // Fetch paginé normal (infinite scroll)
  const fetchPokemon = async () => {
    if (loading || !hasMore || searching) return; // si on est en mode recherche, ne pas charger la pagination
    setLoading(true);
    try {
      const apiPokeUrl = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;
      const response = await axios.get(apiPokeUrl);
      const newPokemons: PokemonListItem[] = response.data.results;
      if (newPokemons.length > 0) {
        setPokemons(prev => [...prev, ...newPokemons]);
        setOffset(prev => prev + 20);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erreur de chargement des Pokémon :", error);
    } finally {
      setLoading(false);
    }
  };

  // Récupère la liste des types pour afficher des boutons
  const fetchTypes = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/type');
      // filtrer seulement les types utiles (certains retours contiennent 'shadow' etc sur certaines versions)
      const fetched = response.data.results.map((t: any) => t.name) as string[];
      setTypes(['all', ...fetched]);
    } catch (error) {
      console.error('Erreur fetch types:', error);
    }
  };

  // Recherche multi-critère : type + nom (substring)
  const handleSearch = async () => {
    setSearching(true);
    setLoading(true);
    try {
      const nameQuery = query.trim().toLowerCase();

      // Si type != 'all', on récupère la liste des pokemons pour ce type
      if (selectedType && selectedType !== 'all') {
        // endpoint: /type/{name}
        const res = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType}`);
        // res.data.pokemon est un array d'objets { pokemon: { name, url }, slot: ... }
        const typePokemons: PokemonListItem[] = res.data.pokemon.map((p: any) => p.pokemon);
        const filtered = nameQuery
          ? typePokemons.filter(p => p.name.includes(nameQuery))
          : typePokemons;
        setPokemons(filtered);
        setHasMore(false); // résultat fixe
        setOffset(0);
        return;
      }

      // Si pas de type (all) mais nom renseigné -> on récupère tous les noms et filtre côté client
      if (nameQuery) {
        // limit très large pour récupérer tous les noms (PokeAPI supporte ça en général)
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        const all: PokemonListItem[] = res.data.results;
        const filtered = all.filter(p => p.name.includes(nameQuery));
        setPokemons(filtered);
        setHasMore(false);
        setOffset(0);
        return;
      }

      // Si ni type ni name -> réinitialiser à l'état paginé initial
      resetSearch();
    } catch (error) {
      console.error('Erreur search:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setQuery('');
    setSelectedType('all');
    setSearching(false);
    setPokemons([]);
    setOffset(0);
    setHasMore(true);
    // relancer le chargement paginé initial
    fetchPokemon();
  };

  const getPokemonId = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  const renderItem = ({ item }: { item: PokemonListItem }) => {
    const pokemonId = getPokemonId(item.url);
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/${item.name}`)}
      >
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
        />
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokémon</Text>

      {/* Barre recherche */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Rechercher par nom..."
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Rechercher</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={resetSearch}>
          <Text style={styles.resetButtonText}>Réinitialiser</Text>
        </TouchableOpacity>
      </View>

      {/* Sélecteur de type (boutons horizontaux) */}
      <View style={{ height: 48 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.typeScroll}>
          {types.map(t => {
            const active = t === selectedType;
            return (
              <TouchableOpacity
                key={t}
                onPress={() => setSelectedType(t)}
                style={[styles.typeButton, active && styles.typeButtonActive]}
              >
                <Text style={[styles.typeButtonText, active && styles.typeButtonTextActive]}>
                  {t}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.spacer} />

      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        numColumns={3}
        renderItem={renderItem}
        onEndReached={fetchPokemon}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#6D9F71" /> : null}
        // si on est en recherche, ne pas afficher "vide" infini ; si aucun résultat, afficher un message
        ListEmptyComponent={!loading ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Aucun Pokémon trouvé.</Text>
          </View>
        ) : null}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  spacer: {
    height: 12,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 6,
    padding: 10,
    borderRadius: 12,
    elevation: 3,
    width: 100,
  },
  image: {
    width: 80,
    height: 80,
  },
  name: {
    marginTop: 8,
    textTransform: 'capitalize',
    color: '#8E7A58',
    fontWeight: '600',
  },

  // search styles
  searchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#368ad6',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  resetButton: {
    marginLeft: 8,
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#333',
    fontWeight: '600',
  },

  // type buttons
  typeScroll: {
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  typeButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  typeButtonActive: {
    backgroundColor: '#6D9F71',
    borderColor: '#6D9F71',
  },
  typeButtonText: {
    textTransform: 'capitalize',
    color: '#333',
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: '#fff',
  },

  empty: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
  },
});
