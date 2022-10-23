import { registerRootComponent } from 'expo';

import { AuthProvider } from './src/contexts/authContext';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
function FullApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

registerRootComponent(FullApp);
