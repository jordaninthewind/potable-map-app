import { Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { clearError, selectError } from "../features/error/errorSlice";

const NotificationOverlay = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const resetError = () => {
    dispatch(clearError());
  };

  const handleAction = () => {
    if (error.action) {
      error.action.onPress();
    }

    resetError();
  };

  return (
    <>
      {error && (
        <Snackbar
          action={{
            label: error.action ? error.action?.label : "Dismiss",
            onPress: handleAction,
          }}
        >
          elevation={0}
          onDismiss={resetError}
          visible={!!error}
          wrapperStyle={{ zIndex: 100 }}>{error.message}
        </Snackbar>
      )}
    </>
  );
};

export default NotificationOverlay;
