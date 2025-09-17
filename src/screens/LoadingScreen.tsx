import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { PokemonService } from '../services/pokemonService';

type LoadingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Loading'
>;

interface Props {
  navigation: LoadingScreenNavigationProp;
}

export const LoadingScreen: React.FC<Props> = ({ navigation }) => {
  const [loadingText, setLoadingText] = useState('Loading Pokémon...');

  const loadPokemon = useCallback(async () => {
    try {
      setLoadingText('Connecting to PokeAPI...');

      const pokemon = await PokemonService.getFirstPokemonWithDetails(20);

      setLoadingText('Pokémon loaded!');

      setTimeout(() => {
        navigation.replace('Overview', { pokemon });
      }, 500);
    } catch (error) {
      console.error('Error loading Pokémon:', error);

      Alert.alert(
        'Error',
        'Pokémon could not be loaded. Please check your internet connection.',
        [
          {
            text: 'Retry',
            onPress: loadPokemon,
          },
        ],
      );
    }
  }, [navigation]);

  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Pokedex</Text>
        <ActivityIndicator
          size="large"
          color="#FF6B6B"
          style={styles.spinner}
        />
        <Text style={styles.loadingText}>{loadingText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4ECDC4',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 40,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  spinner: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '500',
  },
});
