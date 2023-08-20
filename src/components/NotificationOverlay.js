import { Snackbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { clearError, selectError } from '@state/errorSlice';

const NotificationOverlay = () => {
    const dispatch = useDispatch();
    const message = useSelector(selectError);
    const { bottom } = useSafeAreaInsets();

    const handleDismiss = () => dispatch(clearError());

    return (
        <Snackbar
            action={{
                label: 'Dismiss',
                onPress: handleDismiss,
            }}
            wrapperStyle={{ bottom: bottom + 50 }}
            duration={Snackbar.DURATION_MEDIUM}
            onDismiss={handleDismiss}
            visible={!!message}
        >
            {message}
        </Snackbar>
    );
};

export default NotificationOverlay;
