import { useEffect, useRef, useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet from '@gorhom/bottom-sheet';

import AddImage from '@components/AddImage';
import AddMarkerInfoModal from '@components/AddMarkerInfoModal';
import AddMarkerLocationModal from '@components/AddMarkerLocationModal';
import EditMarker from '@components/EditMarker';
import Login from '@components/Login';
import MarkerDetails from '@components/MarkerDetails';
import MarkerInfo from '@components/MarkerInfo';
import Register from '@components/Register';
import ViewImage from '@components/ViewImage';
import { resetMapState } from '@services/services';
import { clearModal, selectModal } from '@state/modalSlice';
import { SPACING_DEFAULT } from '@styles/styles';

const ModalInterface = () => {
    const dispatch = useDispatch();

    const bottomSheetRef = useRef(null);
    const modal = useSelector(selectModal);
    const colorScheme = useColorScheme();
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
                    snapPoints: ['5%', '50%'],
                };
            case 'register':
                return {
                    component: <Register />,
                    index: 1,
                    snapPoints: ['5%', '60%'],
                };
            case 'markerInfo':
                return {
                    component: <MarkerInfo />,
                    index: 1,
                    snapPoints: ['5%', '60%'],
                };
            case 'markerDetails':
                return {
                    component: <MarkerDetails />,
                    index: 1,
                    snapPoints: ['5%', '65%'],
                };
            case 'addMarker':
                return {
                    component: <AddMarkerLocationModal />,
                    index: 1,
                    snapPoints: ['5%', '25%'],
                };
            case 'addMarkerInfo':
                return {
                    component: <AddMarkerInfoModal />,
                    index: 1,
                    snapPoints: ['5%', '65%'],
                };
            case 'addNewMarkerImage':
                return {
                    component: <AddImage origin="new" />,
                    index: 1,
                    snapPoints: ['5%', '90%'],
                };
            case 'AddImage':
                return {
                    component: <AddImage />,
                    index: 1,
                    snapPoints: ['5%', '90%'],
                };
            case 'viewImage':
                return {
                    component: <ViewImage />,
                    index: 1,
                    snapPoints: ['5%', '85%'],
                };
            case 'editMarker':
                return {
                    component: <EditMarker />,
                    index: 1,
                    snapPoints: ['5%', '60%'],
                };

            default:
                return { component: null, snapPoints: ['5%'] };
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
        paddingHorizontal: SPACING_DEFAULT,
    },
    light: {
        backgroundColor: '#FEFEFE',
        opacity: 0.75,
    },
    dark: {
        backgroundColor: '#3d3d3d',
        opacity: 0.75,
    },
});

export default ModalInterface;
