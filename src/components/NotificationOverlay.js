import { Portal, Provider, Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  selectError,
  selectErrorAction,
} from "../features/error/errorSlice";

const NotificationOverlay = () => {
  const dispatch = useDispatch();
  const message = useSelector(selectError);
  const action = useSelector(selectErrorAction);

  const resetError = () => {
    dispatch(clearError());
  };

  const handleAction = () => {
    if (action) {
      console.log("action", action);
      // action.onPress();
    }

    resetError();
  };

  return (
    <Snackbar
      action={{
        label: action && "Dismiss",
        onPress: handleAction,
      }}
      duration={Snackbar.DURATION_MEDIUM}
      onDismiss={resetError}
      visible={!!message}
    >
      {message}
    </Snackbar>
  );
};

export default NotificationOverlay;
