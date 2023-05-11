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
import CreateEditExpenseModalScreen from 'screens/home/screens/modalsScreen/CreateEditExpenseModalScreen';
import FilterExpensesModalScreen from 'screens/home/screens/modalsScreen/FilterExpensesModalScreen';
import { store, persistor } from 'store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
    const navigationRef = useNavigationContainerRef();

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaProvider style={styles.appContainer}>
                    <NavigationContainer ref={navigationRef}>
                        <StatusBar />
                        <Stack.Navigator
                            initialRouteName={Route.Welcome}
                            detachInactiveScreens={true}
                            screenOptions={{
                                headerShown: false,
                                animationEnabled: true,
                                cardStyle: {
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >
                            <Stack.Group>
                                <Stack.Screen
                                    name={Route.Welcome}
                                    component={WelcomeScreen}
                                />
                                <Stack.Screen
                                    name={Route.HomeTabs}
                                    component={HomeStackScreens}
                                />
                            </Stack.Group>
                            <Stack.Group
                                screenOptions={{
                                    presentation: 'modal',
                                    cardStyle: {
                                        backgroundColor: WHITE_COLOR,
                                    },
                                }}
                            >
                                <Stack.Screen
                                    name={Route.ModalExpense}
                                    component={CreateEditExpenseModalScreen}
                                />
                            </Stack.Group>
                            <Stack.Group
                                screenOptions={{
                                    presentation: 'transparentModal',
                                }}
                            >
                                <Stack.Screen
                                    name={Route.ModalFilter}
                                    component={FilterExpensesModalScreen}
                                />
                            </Stack.Group>
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        backgroundColor: WHITE_COLOR,
    },
});

export default App;
