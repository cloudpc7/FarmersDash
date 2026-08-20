import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createMMKV } from 'react-native-mmkv';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { getOrCreateEncryptionKey } from '../lib/encryptionKey';
import { createMmkvPersistStorage } from '../lib/mmkv';
import sessionReducer from './slices/session';

const rootReducer = combineReducers({
  session: sessionReducer,
});

export async function createPersistedStore() {
  const encryptionKey = await getOrCreateEncryptionKey();

  let storage;
  try {
    const mmkv = createMMKV({
      id: 'farmersdash.redux',
      encryptionKey,
      encryptionType: 'AES-256',
    });
    storage = createMmkvPersistStorage(mmkv);
  } catch (error) {
    throw new Error(
      'Encrypted MMKV requires an expo-dev-client development build. Expo Go is not supported.',
      { cause: error },
    );
  }

  const persistedReducer = persistReducer(
    {
      key: 'farmersdash',
      storage,
      whitelist: ['session'],
    },
    rootReducer,
  );

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  const persistor = persistStore(store);
  return { store, persistor };
}
