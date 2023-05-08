import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screen } from '../screen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const HomeStack = createBottomTabNavigator();

const HomeStackScreens = () => {
    return (
        <HomeStack.Navigator
            initialRouteName={Screen.Home}
            screenOptions={{
                headerShown: false,
            }}
            safeAreaInsets={{ bottom: 0, top: 0 }}
        >
            <HomeStack.Screen name={Screen.Home} component={HomeScreen} />
            <HomeStack.Screen name={Screen.Profile} component={ProfileScreen} />
        </HomeStack.Navigator>
    );
};

export default HomeStackScreens;
