// screens/PokemonDetail.js
import axios from 'axios';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/*
  Si tu utilises expo-router (fichiers sous /app/[name].js), remplace la récupération du paramètre
  par : import { useLocalSearchParams } from 'expo-router'; const { name } = useLocalSearchParams();
*/

export default function PokemonDetail() {
  const router = useRouter();
  // lecture du param (compatible react-navigation)
  const { name } = useLocalSearchParams<{ name: string }>();

  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name) {
      setError('Aucun Pokémon spécifié.');
      setLoading(false);
      return;
    }
    fetchData();
  }, [name]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      setPokemon(res.data);
      setError(null);
    } catch (e) {
      console.error(e);
        setError("Impossible de charger les détails du Pokémon.");
    } finally {
      setLoading(false);
    }
  };

  const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

  const formatHeight = (h: number) => `${(h / 10).toFixed(1)} m`; // height in decimetres
  const formatWeight = (w: number) => `${(w / 10).toFixed(1)} kg`; // weight in hectograms

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#6D9F71" /></View>;
  if (error) return (
    <View style={styles.center}>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
  if (!pokemon) return null;

  // images: prefer official artwork, fallback to sprites
  const artwork = pokemon.sprites?.other?.['official-artwork']?.front_default;
  const sprite = pokemon.sprites?.front_default;
  const displayImage = artwork || sprite;

  const renderType = (t: { type: { name: string } }) => (
    <View key={t.type.name} style={[styles.typeBadge, { backgroundColor: typeColor(t.type.name) }]}>
      <Text style={styles.typeText}>{cap(t.type.name)}</Text>
    </View>
  );

  const renderStat = (s: { base_stat: number; stat: { name: string } }) => {
    const value = s.base_stat;
    const pct = Math.min(100, Math.round((value / 200) * 100)); // normaliser visuel (200 = max sensible)
    return (
      <View key={s.stat.name} style={styles.statRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.statName}>{s.stat.name.toUpperCase()}</Text>
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <View style={styles.statBarContainer}>
          <View style={[styles.statBar, { width: `${pct}%` }]} />
        </View>
      </View>
    );
  };

  const renderMove = ({ item }: { item: any }) => (
    <View style={styles.moveChip}>
      <Text style={styles.moveText}>{cap(item.move.name)}</Text>
    </View>
  );

  // une petite fonction de mapping de couleur par type (exemple simple)
  function typeColor(type : string) {
    const map = {
      fire: '#FD7D24',
      water: '#4592C4',
      grass: '#9BCC50',
      electric: '#FFCE4B',
      rock: '#A38C21',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      normal: '#A8A77A',
      poison: '#A33EA1',
      fighting: '#C03028',
      fairy: '#F4BDC9',
      ice: '#98D8D8',
      ghost: '#735797',
      dragon: '#7038F8',
      steel: '#B7B7CE',
      dark: '#705746',
    };
    return map[type] || '#777';
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.back}>
            <Text style={styles.backText}>← Retour</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{cap(pokemon.name)} #{pokemon.id}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.imageWrap}>
            {displayImage ? (
              <Image source={{ uri: displayImage }} style={styles.artwork} resizeMode="contain" />
            ) : <Image source={{ uri: sprite }} style={styles.artwork} />}
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Taille</Text>
              <Text style={styles.infoValue}>{formatHeight(pokemon.height)}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Poids</Text>
              <Text style={styles.infoValue}>{formatWeight(pokemon.weight)}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Exp. de base</Text>
              <Text style={styles.infoValue}>{pokemon.base_experience}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Types</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
              {pokemon.types.map(renderType)}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Stats</Text>
            <View style={{ marginTop: 8 }}>
              {pokemon.stats.map(renderStat)}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quelques attaques</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={pokemon.moves.slice(0, 12)} // limiter l'affichage
              keyExtractor={(m) => m.move.name}
              renderItem={renderMove}
              style={{ marginTop: 8 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: { flex: 1, backgroundColor: '#FAF9F6', paddingHorizontal: 14, paddingTop: 8 },
  header: { marginBottom: 6, alignItems: 'center' },
  back: { position: 'absolute', left: 0, top: 2, padding: 6 },
  backText: { color: '#355070', fontWeight: '600' },
  title: { fontSize: 22, fontWeight: '700', color: '#355070' },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 12, marginTop: 12, elevation: 3 },
  imageWrap: { alignItems: 'center', marginBottom: 6 },
  artwork: { width: 180, height: 180 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  infoBox: { alignItems: 'center', flex: 1 },
  infoLabel: { color: '#666', fontSize: 12 },
  infoValue: { fontWeight: '700', color: '#355070', marginTop: 4 },
  section: { marginTop: 12 },
  sectionTitle: { fontWeight: '700', color: '#355070', fontSize: 16 },
  typeBadge: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 16 },
  typeText: { color: '#fff', fontWeight: '700' },
  statRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 6, gap: 8 },
  statName: { width: 80, color: '#666', fontWeight: '600' },
  statValue: { width: 36, textAlign: 'right', fontWeight: '700', color: '#355070' },
  statBarContainer: { flex: 1, height: 10, backgroundColor: '#eee', borderRadius: 6, overflow: 'hidden', marginLeft: 8 },
  statBar: { height: '100%', backgroundColor: '#6D9F71' },
  moveChip: { backgroundColor: '#FAF9F6', paddingVertical: 8, paddingHorizontal: 12, marginRight: 8, borderRadius: 16, borderWidth: 1, borderColor: '#eee' },
  moveText: { textTransform: 'capitalize', fontWeight: '600', color: '#355070' },
  error: { color: 'red' },
});
