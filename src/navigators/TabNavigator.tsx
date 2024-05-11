/* eslint-disable */

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';

import CustomIcon from '../components/CustomIcon';
import { COLORS } from '../theme/theme';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                height: 60,
                position: 'absolute',
                margin: 10,
                borderRadius: 16,
                justifyContent: 'center',
                alignItems: 'center',
                }
            }}>
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <CustomIcon
                            name='home'
                            size={25}
                            color={focused ? COLORS.primaryOrangeHex : COLORS.primaryDarkGreyHex}
                        />
                    )
                }}>
            </Tab.Screen>
            <Tab.Screen
                name='Cart'
                component={CartScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <CustomIcon
                            name='cart'
                            size={25}
                            color={focused ? COLORS.primaryOrangeHex : COLORS.primaryDarkGreyHex}
                        />
                    )
                }}>
            </Tab.Screen>
            <Tab.Screen
                name='Favorite'
                component={FavoritesScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <CustomIcon
                            name='like'
                            size={25}
                            color={focused ? COLORS.primaryOrangeHex : COLORS.primaryDarkGreyHex}
                        />
                    )
                }}>
            </Tab.Screen>
            <Tab.Screen
                name='History'
                component={OrderHistoryScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <CustomIcon
                            name='bell'
                            size={25}
                            color={focused ? COLORS.primaryOrangeHex : COLORS.primaryDarkGreyHex}
                        />
                    )
                }}>
            </Tab.Screen>
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        position: 'absolute',
        backgroundColor: COLORS.primaryWhiteHex,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent',
    },
    blurViewStyles: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0.
    }
});

export default TabNavigator;
