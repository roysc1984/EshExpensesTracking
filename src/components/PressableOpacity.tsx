import React, { FC } from 'react';
import { GestureResponderEvent, Pressable, PressableProps } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const FADE_IN_ANIMATION_DURATION = 100;
const FADE_OUT_ANIMATION_DURATION = 200;

interface PressableOpacityProps extends PressableProps {
    children: React.ReactNode;
}

const PressableOpacity: FC<PressableOpacityProps> = ({
    children,
    onPress,
    ...props
}) => {
    const animation = useSharedValue(1);

    const fadeIn = () => {
        animation.value = withTiming(1, {
            duration: FADE_IN_ANIMATION_DURATION,
        });
    };
    const fadeOut = () => {
        animation.value = withTiming(0, {
            duration: FADE_OUT_ANIMATION_DURATION,
        });
    };

    const animatedStyle = useAnimatedStyle(() => {
        return { opacity: animation.value };
    });

    const onPressPressable = (event: GestureResponderEvent) => {
        onPress?.(event);
    };

    return (
        <Pressable
            onPress={onPressPressable}
            onPressIn={fadeOut}
            onPressOut={fadeIn}
            {...props}
        >
            <Animated.View style={animatedStyle}>{children}</Animated.View>
        </Pressable>
    );
};

export default PressableOpacity;
