import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet from '@gorhom/bottom-sheet';

import AddMarkerModal from '@components/AddMarkerModal';
import AddPicture from '@components/AddPicture';
import EditMarker from '@components/EditMarker';
import Login from '@components/Login';
import MarkerInfo from '@components/MarkerInfo';
import Register from '@components/Register';
import ViewImage from '@components/ViewImage';
import { selectTheme } from '@state/appSlice';
import { clearModal, selectModal } from '@state/modalSlice';
import { resetMapState } from '@services/services';

const ModalInterface = () => {
    const dispatch = useDispatch();
    const bottomSheetRef = useRef(null);
    const modal = useSelector(selectModal);
    const colorScheme = useSelector(selectTheme);
    const [component, setComponent] = useState(null);

    useEffect(() => {
        setComponent(getComponent());
    }, [modal]);

    const handleSheetChange = async (index) => {
        if (index === 0) {
            await bottomSheetRef.current?.close();

            dispatch(resetMapState());
            dispatch(clearModal());
        }
    };

    const getComponent = () => {
        switch (modal) {
            case 'login':
                return {
                    component: <Login />,
                    index: 1,
                    snapPoints: ['5%', '80%'],
                };
            case 'register':
                return {
                    component: <Register />,
                    index: 1,
                    snapPoints: ['5%', '85%'],
                };
            case 'markerInfo':
                return {
                    component: <MarkerInfo />,
                    index: 1,
                    snapPoints: ['10%', '50%'],
                };
            case 'addMarker':
                return {
                    component: <AddMarkerModal />,
                    index: 1,
                    snapPoints: ['5%', '65%'],
                };
            case 'addPicture':
                return {
                    component: <AddPicture />,
                    index: 1,
                    snapPoints: ['5%', '75%'],
                };
            case 'viewImage':
                return {
                    component: <ViewImage />,
                    index: 1,
                    snapPoints: ['5%', '80%'],
                };
            case 'editMarker':
                return {
                    component: <EditMarker />,
                    index: 1,
                    snapPoints: ['5%', '50%'],
                };
            default:
                return { component: null, snapPoints: ['10%'] };
        }
    };

    return (
        <>
            {component?.component && (
                <BottomSheet
                    animateOnMount
                    ref={bottomSheetRef}
                    style={styles.container}
                    backgroundStyle={styles[colorScheme]}
                    keyboardBlurBehavior="restore"
                    snapPoints={component.snapPoints}
                    index={component.index}
                    onChange={handleSheetChange}
                >
                    {component.component}
                </BottomSheet>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    light: {
        backgroundColor: '#FEFEFE',
    },
    dark: {
        backgroundColor: '#3d3d3d',
    },
});

export default ModalInterface;
