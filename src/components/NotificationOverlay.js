import { Snackbar } from "react-native-paper";

function NotificationOverlay({ error, resetError, ...props }) {
  return (
    <Snackbar
      action={{ label: "Dismiss", onPress: resetError }}
      elevation={0}
      onDismiss={resetError}
      visible={!!error}
      wrapperStyle={{ zIndex: 100 }}
      {...props}
    >
      {error?.toString()}
    </Snackbar>
  );
}
export default NotificationOverlay;
