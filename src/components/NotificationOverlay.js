import { Snackbar } from "react-native-paper";

function NotificationOverlay({ error, setError, ...props }) {
  return (
    <Snackbar
      visible={!!error}
      action={{ label: "Dismiss", onPress: () => setError(null) }}
      onDismiss={() => setError(null)}
      wrapperStyle={{ zIndex: 10 }}
      elevation={0}
      {...props}
    >
      {error?.toString()}
    </Snackbar>
  );
}
export default NotificationOverlay;
