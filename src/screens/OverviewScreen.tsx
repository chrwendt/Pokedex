import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Pokemon } from '../types';

type OverviewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Overview'
>;

type OverviewScreenRouteProp = RouteProp<RootStackParamList, 'Overview'>;

interface Props {
  navigation: OverviewScreenNavigationProp;
  route: OverviewScreenRouteProp;
}

export const OverviewScreen: React.FC<Props> = ({ navigation, route }) => {
  const { pokemon } = route.params;

  const renderPokemonItem = ({ item }: { item: Pokemon }) => (
    <TouchableOpacity
      style={styles.pokemonCard}
      onPress={() => navigation.push('Details', { pokemon: item })}
    >
      <Image
        source={{ uri: item.sprites.front_default }}
        style={styles.pokemonImage}
      />
      <View style={styles.pokemonInfo}>
        <Text style={styles.pokemonName}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Text style={styles.pokemonId}>
          #{item.id.toString().padStart(3, '0')}
        </Text>
        <View style={styles.typesContainer}>
          {item.types.map((type, index) => (
            <View
              key={index}
              style={[styles.typeTag, getTypeColor(type.type.name)]}
            >
              <Text style={styles.typeText}>
                {type.type.name.charAt(0).toUpperCase() +
                  type.type.name.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokedex</Text>
      <Text style={styles.subtitle}>{pokemon.length} Pokémon found</Text>
      <FlatList
        data={pokemon}
        renderItem={renderPokemonItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const getTypeColor = (type: string) => {
  const typeColors: { [key: string]: { backgroundColor: string } } = {
    normal: { backgroundColor: '#A8A878' },
    fighting: { backgroundColor: '#C03028' },
    flying: { backgroundColor: '#A890F0' },
    poison: { backgroundColor: '#A040A0' },
    ground: { backgroundColor: '#E0C068' },
    rock: { backgroundColor: '#B8A038' },
    bug: { backgroundColor: '#A8B820' },
    ghost: { backgroundColor: '#705898' },
    steel: { backgroundColor: '#B8B8D0' },
    fire: { backgroundColor: '#F08030' },
    water: { backgroundColor: '#6890F0' },
    grass: { backgroundColor: '#78C850' },
    electric: { backgroundColor: '#F8D030' },
    psychic: { backgroundColor: '#F85888' },
    ice: { backgroundColor: '#98D8D8' },
    dragon: { backgroundColor: '#7038F8' },
    dark: { backgroundColor: '#705848' },
    fairy: { backgroundColor: '#EE99AC' },
  };
  return typeColors[type] || { backgroundColor: '#68A090' };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  pokemonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pokemonImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  pokemonInfo: {
    flex: 1,
  },
  pokemonName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  pokemonId: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
