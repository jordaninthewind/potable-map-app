export const mapErrorToMessage = (error) => {
  switch (error) {
    case "Logged in successfully!":
      return { message: "Welcome back! You're logged in!", action: null };
    case "LOCATION_FOREGROUND permission is required to do this operation.":
      return {
        message: "Please enable location services to use this app.",
        action: { label: "Enable", onPress: () => console.log("Enable") },
      };
    default:
      return { message: "Something went wrong!", action: null };
  }
};

export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  console.log(re);
  return re.test(email);
};
