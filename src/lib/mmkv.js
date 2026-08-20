export function createMmkvPersistStorage(mmkv) {
  return {
    setItem: (key, value) => {
      mmkv.set(key, value);
      return Promise.resolve(true);
    },
    getItem: (key) => {
      const value = mmkv.getString(key);
      return Promise.resolve(value ?? null);
    },
    removeItem: (key) => {
      mmkv.delete(key);
      return Promise.resolve();
    },
  };
}
