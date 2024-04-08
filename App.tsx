/* eslint-disable */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import TabNavigator from './src/navigators/TabNavigator';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{headerShown: false}}
        initialRouteName='Login'
        >
        <Stack.Screen 
          name='Login' 
          component={LoginScreen} 
          options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
        <Stack.Screen 
          name='Signup' 
          component={SignupScreen} 
          options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
        <Stack.Screen 
          name='Tab' 
          component={TabNavigator} 
          options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
        <Stack.Screen 
          name='Details' 
          component={DetailsScreen} 
          options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
        <Stack.Screen 
          name='Payment' 
          component={PaymentScreen} 
          options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
      </Stack.Navigator>

    </NavigationContainer>);
};

const styles = StyleSheet.create({});

