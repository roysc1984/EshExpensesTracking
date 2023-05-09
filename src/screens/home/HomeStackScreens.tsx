import React from 'react';
import {
    createBottomTabNavigator,
    BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { Screen } from '../screen';
import HomeScreen from './screens/homeScreen/HomeScreen';
import ProfileScreen from './screens/profileScreen/ProfileScreen';
import TabBar from './components/TabBar';

const HomeStack = createBottomTabNavigator();

const HomeStackScreens = () => {
    const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

    return (
        <HomeStack.Navigator
            initialRouteName={Screen.Home}
            screenOptions={{
                headerShown: false,
            }}
            safeAreaInsets={{ bottom: 0, top: 0 }}
            tabBar={renderTabBar}
        >
            <HomeStack.Screen
                name={Screen.Home}
                component={HomeScreen}
                options={{
                    headerTitle: 'name',
                    headerShown: true,
                }}
            />
            <HomeStack.Screen name={Screen.Profile} component={ProfileScreen} />
        </HomeStack.Navigator>
    );
};

export default HomeStackScreens;
