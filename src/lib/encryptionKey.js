import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

const ENCRYPTION_KEY_ID = 'farmersdash.mmkv.encryptionKey';

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function getOrCreateEncryptionKey() {
  const existing = await SecureStore.getItemAsync(ENCRYPTION_KEY_ID);
  if (existing) {
    return existing;
  }

  const bytes = await Crypto.getRandomBytesAsync(32);
  const key = bytesToHex(bytes);
  await SecureStore.setItemAsync(ENCRYPTION_KEY_ID, key);
  return key;
}
