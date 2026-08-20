import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createPersistedStore } from './createStore';

export function StoreProvider({ children }) {
  const [bundle, setBundle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    createPersistedStore()
      .then((nextBundle) => {
        if (!cancelled) {
          setBundle(nextBundle);
        }
      })
      .catch((nextError) => {
        if (!cancelled) {
          setError(nextError);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <View className="screen-padded items-center justify-center">
        <Text className="text-title">Dev client required</Text>
        <Text className="text-subtitle mt-3 text-center">{error.message}</Text>
      </View>
    );
  }

  if (!bundle) {
    return <View className="screen" />;
  }

  return (
    <Provider store={bundle.store}>
      <PersistGate loading={<View className="screen" />} persistor={bundle.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
