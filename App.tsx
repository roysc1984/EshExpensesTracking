import 'react-native-gesture-handler'; // Must be imported first!
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/screens/types';
import { Route } from './src/screens/route';
import WelcomeScreen from './src/screens/welcome/WelcomeScreen';
import {
    NavigationContainer,
    useNavigationContainerRef,
} from '@react-navigation/native';
import { WHITE_COLOR } from './src/theme/themeStyles';
import HomeStackScreens from './src/screens/home/HomeStackScreens';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
    const navigationRef = useNavigationContainerRef();
    return (
        <SafeAreaProvider style={styles.appContainer}>
            <NavigationContainer ref={navigationRef}>
                <StatusBar />
                <Stack.Navigator
                    initialRouteName={Route.Welcome}
                    detachInactiveScreens={true}
                    screenOptions={{
                        headerShown: false,
                        animationEnabled: false,
                        cardStyle: {
                            backgroundColor: WHITE_COLOR,
                        },
                        presentation: 'card',
                    }}
                >
                    <Stack.Screen
                        name={Route.Welcome}
                        component={WelcomeScreen}
                        options={{
                            animationEnabled: false,
                        }}
                    />
                    <Stack.Screen
                        name={Route.HomeTabs}
                        component={HomeStackScreens}
                        options={{
                            animationEnabled: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        backgroundColor: WHITE_COLOR,
    },
});

export default App;
