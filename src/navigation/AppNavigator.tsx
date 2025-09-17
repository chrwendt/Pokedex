import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { LoadingScreen } from '../screens/LoadingScreen';
import { OverviewScreen } from '../screens/OverviewScreen';
import { DetailsScreen } from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4ECDC4',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Overview"
          component={OverviewScreen}
          options={{
            title: 'Pokemon List',
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: 'Pokemon Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
