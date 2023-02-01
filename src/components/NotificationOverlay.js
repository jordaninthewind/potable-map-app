import { Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { clearError, selectError } from "../features/error/errorSlice";

const NotificationOverlay = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectError);

  const resetError = () => {
    dispatch(clearError());
  };

  return (
    <Snackbar
      action={{ label: "Dismiss", onPress: resetError }}
      elevation={0}
      onDismiss={resetError}
      visible={errorMessage}
      wrapperStyle={{ zIndex: 100 }}
    >
      {errorMessage}
    </Snackbar>
  );
};
export default NotificationOverlay;
