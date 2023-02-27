import PotableApp from "./src/components/PotableApp.js";
import PotableAppProviders from "./src/components/PotableAppProviders.js";

import "./firebaseConfig";

export default function App() {
  return (
    <PotableAppProviders>
      <PotableApp />
    </PotableAppProviders>
  );
}
