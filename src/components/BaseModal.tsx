import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

interface BottomDialogProps {
    children: React.ReactNode;
    onClose: () => void;
    marginTop?: number;
}

export interface BottomDialogRef {
    open(): void;
    close(): void;
}

const BottomDialog = forwardRef<BottomDialogRef, BottomDialogProps>(
    ({ children, onClose, marginTop }, ref) => {
        const modalizeRef = useRef<Modalize>();

        const open = () => {
            modalizeRef.current?.open();
        };

        const close = () => {
            modalizeRef.current?.close();
        };

        useImperativeHandle(ref, () => ({ open, close }));

        return (
            <Modalize
                ref={modalizeRef}
                closeOnOverlayTap
                tapGestureEnabled
                panGestureEnabled
                avoidKeyboardLikeIOS={false}
                adjustToContentHeight
                modalStyle={[styles.container, { marginTop }]}
                disableScrollIfPossible={true}
                onClose={onClose}
                handleStyle={styles.handle}
            >
                <View style={styles.childrenContainer}>{children}</View>
            </Modalize>
        );
    },
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: '100%',
    },
    childrenContainer: {
        width: '100%',
        height: '100%',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
    },
    handle: {
        display: 'none',
    },
});

export default BottomDialog;
