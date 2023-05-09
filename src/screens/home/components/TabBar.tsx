import React, { FC, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import PressableOpacity from 'components/PressableOpacity';
import { MenuButtons } from '../types';
import { BLACK_COLOR, BLUE_COLOR } from 'theme/themeStyles';
import { PlusIcon } from 'assets/icons/PlusIcon';
import CreateEditExpenseModal, {
    CreateEditExpenseModalRef,
} from '../screens/homeScreen/components/CreateEditExpenseModal';
import { Route } from 'screens/route';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ICON_SIZE = 56;
const PLUS_BUTTON_LEFT_POSITION = (SCREEN_WIDTH - ICON_SIZE) / 2;

const TabBar: FC<BottomTabBarProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState<MenuButtons>('Home');
    const modalRef = useRef<CreateEditExpenseModalRef>(null);

    const onHomeTabPressed = () => {
        if (activeTab === 'Profile') {
            setActiveTab('Home');
            navigation.navigate('Home');
        }
    };

    const onProfileTabPressed = () => {
        if (activeTab === 'Home') {
            setActiveTab('Profile');
            navigation.navigate('Profile');
        }
    };

    const renderHomeMenuButton = () => {
        return (
            <PressableOpacity
                onPress={onHomeTabPressed}
                style={styles.menuButton}
            >
                <Text
                    style={[
                        styles.text,
                        activeTab === 'Home' && { color: BLUE_COLOR },
                    ]}
                >
                    Home
                </Text>
            </PressableOpacity>
        );
    };

    const renderProfileMenuButton = () => {
        return (
            <PressableOpacity
                onPress={onProfileTabPressed}
                style={styles.menuButton}
            >
                <Text
                    style={[
                        styles.text,
                        activeTab === 'Profile' && { color: BLUE_COLOR },
                    ]}
                >
                    Profile
                </Text>
            </PressableOpacity>
        );
    };

    const showModal = () => {
        //modalRef?.current?.open();
        navigation.navigate(Route.ModalExpense);
    };

    const renderPlusMenuButton = () => {
        return (
            <PressableOpacity onPress={showModal} style={styles.plusButton}>
                <PlusIcon />
            </PressableOpacity>
        );
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.buttonsBox}>
                    {renderHomeMenuButton()}
                    {renderProfileMenuButton()}
                </View>
                {renderPlusMenuButton()}
            </View>
            <CreateEditExpenseModal ref={modalRef} onClose={() => {}} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopColor: BLACK_COLOR + '80',
        borderTopWidth: 0.2,
        height: 90,
    },
    buttonsBox: {
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    menuButton: {
        flex: 1,
        alignItems: 'center',
    },
    plusButton: {
        position: 'absolute',
        left: PLUS_BUTTON_LEFT_POSITION,
        top: -ICON_SIZE / 2,
        width: ICON_SIZE,
        height: ICON_SIZE,
        backgroundColor: BLUE_COLOR,
        borderRadius: 56 / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Helvetica',
        fontSize: 13,
    },
});

export default TabBar;
