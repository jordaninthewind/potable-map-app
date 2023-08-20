import PotableApp from '@components/PotableApp.js';
import PotableAppProviders from '@components/PotableAppProviders.js';
import '@app/firebaseConfig';

export default function App() {
    return (
        <PotableAppProviders>
            <PotableApp />
        </PotableAppProviders>
    );
}
