import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

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


  useEffect(() => {
    fetchPokemon();
  }, []);
  const fetchPokemon = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      // const apiPokeUrl = process.env.EXPO_POKE_LIST_URL;
      const apiPokeUrl = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;
      
      const response = await axios.get(apiPokeUrl);
      const newPokemons = response.data.results;
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

  const getPokemonId = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  const renderItem = ({ item }: { item: PokemonListItem }) => {
    const pokemonId = getPokemonId(item.url);
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    return (
      <View style={styles.card}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
        />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    );

  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokémon</Text>
      <View style={styles.spacer} />
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        numColumns={2}
        renderItem={renderItem}
        onEndReached={fetchPokemon}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#6D9F71" /> : null}
      />
      {/* <Button title="Retour" onPress={() => router.push('/')} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  spacer: {
    height: 24,
  },
 card: {
    // flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 6,
    padding: 10,
    borderRadius: 12,
    elevation: 3,
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
});
