import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface Props {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
}

export const DetailsScreen: React.FC<Props> = ({ route }) => {
  const { pokemon } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pokemonHeader}>
        <Image
          source={{ uri: pokemon.sprites.front_default }}
          style={styles.pokemonImage}
        />
        <Text style={styles.pokemonName}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>
        <Text style={styles.pokemonId}>
          #{pokemon.id.toString().padStart(3, '0')}
        </Text>

        <View style={styles.typesContainer}>
          {pokemon.types.map((type, index) => (
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

      <View style={styles.detailsContainer}>
        <View style={styles.basicInfo}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Height:</Text>
            <Text style={styles.infoValue}>
              {(pokemon.height / 10).toFixed(1)} m
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Weight:</Text>
            <Text style={styles.infoValue}>
              {(pokemon.weight / 10).toFixed(1)} kg
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Base Experience:</Text>
            <Text style={styles.infoValue}>{pokemon.base_experience}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Stats</Text>
          {pokemon.stats.map((stat, index) => (
            <View key={index} style={styles.statRow}>
              <Text style={styles.statName}>
                {getStatName(stat.stat.name)}:
              </Text>
              <View style={styles.statBarContainer}>
                <View
                  style={[
                    styles.statBar,
                    {
                      width: `${Math.min((stat.base_stat / 255) * 100, 100)}%`,
                    },
                  ]}
                />
                <Text style={styles.statValue}>{stat.base_stat}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.abilitiesContainer}>
          <Text style={styles.sectionTitle}>Abilities</Text>
          {pokemon.abilities.map((ability, index) => (
            <View key={index} style={styles.abilityItem}>
              <Text style={styles.abilityName}>
                {ability.ability.name.charAt(0).toUpperCase() +
                  ability.ability.name.slice(1)}
              </Text>
              {ability.is_hidden && (
                <Text style={styles.hiddenAbility}>(Hidden)</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.spritesContainer}>
          <Text style={styles.sectionTitle}>Images</Text>
          <View style={styles.spritesRow}>
            <View style={styles.spriteItem}>
              <Image
                source={{ uri: pokemon.sprites.front_default }}
                style={styles.spriteImage}
              />
              <Text style={styles.spriteLabel}>Normal</Text>
            </View>
            {pokemon.sprites.front_shiny && (
              <View style={styles.spriteItem}>
                <Image
                  source={{ uri: pokemon.sprites.front_shiny }}
                  style={styles.spriteImage}
                />
                <Text style={styles.spriteLabel}>Shiny</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// Helper Functions
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

const getStatName = (statName: string) => {
  const statNames: { [key: string]: string } = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
  };
  return statNames[statName] || statName;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    color: '#3498DB',
    fontWeight: '600',
  },
  pokemonHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 16,
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
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  pokemonName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  pokemonId: {
    fontSize: 18,
    color: '#7F8C8D',
    marginBottom: 16,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  typeTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  basicInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  statsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statRow: {
    marginBottom: 12,
  },
  statName: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 4,
  },
  statBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECF0F1',
    borderRadius: 8,
    height: 20,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    backgroundColor: '#3498DB',
    borderRadius: 8,
  },
  statValue: {
    position: 'absolute',
    right: 8,
    fontSize: 12,
    fontWeight: '600',
    color: '#2C3E50',
  },
  abilitiesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  abilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  abilityName: {
    fontSize: 16,
    color: '#2C3E50',
  },
  hiddenAbility: {
    fontSize: 14,
    color: '#E74C3C',
    marginLeft: 8,
    fontStyle: 'italic',
  },
  spritesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  spritesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  spriteItem: {
    alignItems: 'center',
  },
  spriteImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  spriteLabel: {
    fontSize: 14,
    color: '#7F8C8D',
  },
});
