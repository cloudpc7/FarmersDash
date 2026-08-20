import 'react-native-gesture-handler';
import '../global.css';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StoreProvider } from '../src/store/StoreProvider';

SplashScreen.preventAutoHideAsync().catch(() => {});

function FontGate({ children }) {
  const [fontsLoaded] = useFonts({
    'Source Sans 3': require('../assets/fonts/SourceSans3-Regular.ttf'),
    'Source Sans 3 Medium': require('../assets/fonts/SourceSans3-Medium.ttf'),
    'Source Sans 3 Bold': require('../assets/fonts/SourceSans3-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return children;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <FontGate>
          <StoreProvider>
            <StatusBar style="auto" />
            <Slot />
          </StoreProvider>
        </FontGate>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
