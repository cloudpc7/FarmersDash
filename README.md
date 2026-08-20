# FarmersDash

Cloud Drop Designs project. Working title only — the public product name is still unset.

This repository is a JavaScript Expo development-client app. **Do not use Expo Go.** Native modules (encrypted MMKV, the custom package id, and the dev client launcher) require a local or EAS *development* build.

## Stack

- JavaScript + JSX (no TypeScript)
- Expo SDK 57 with `expo-dev-client`
- Expo Router
- NativeWind v5 (preview) + Tailwind CSS v4
- `react-native-reanimated` and `react-native-gesture-handler`
- Lucide React Native (only icon pack)
- Redux Toolkit persisted with encrypted MMKV (encryption key stored in SecureStore)
- Theme and font families live only in `global.css`

## Compatibility notes

- Latest Expo is SDK 57. NativeWind’s `npx rn-new@next --nativewind` starter still documents Expo SDK 54. This repo uses Expo 57 + NativeWind v5 preview (`nativewind@5.0.0-preview.4`) so theme can live entirely in `global.css` (Tailwind v4 CSS-first). NativeWind v4 remains the older Tailwind v3 path.
- `lightningcss` is pinned to `1.30.1` as required by current NativeWind v5 docs.
- New Architecture is always on in SDK 57, so `newArchEnabled` is omitted from `app.json`.

Android `applicationId` / package: `com.clouddropdesigns.farmersdash`  
iOS `bundleIdentifier`: `com.clouddropdesigns.farmersdash`  
Firebase project name (OAuth later, not wired): `farmersdash-clouddrop`

## Run with a development client

```bash
npm install
npx expo start --dev-client
```

Build and install the native client on a machine that has Android Studio and/or Xcode:

```bash
npx expo run:android
# macOS only
npx expo run:ios
```

After the first native install, `npm start` (which runs `expo start --dev-client`) is enough for JavaScript changes. Rebuild only when native dependencies or `app.json` change.

`eas.json` has a `development` profile if you later want a cloud development-client build. Do **not** run a production or paid EAS build from this ticket.

## Auth (paper only)

The sign-in screen lists Google, Apple, and a $0 fake-OTP phone path.

- Google / Apple buttons only show a notice. No client IDs, SIWA keys, or Firebase Auth.
- Phone accepts a local demo code `000000`. No SMS or SNS.
- Do not add `google-services.json` or `GoogleService-Info.plist` to this repo.

## Theme

Edit colors and font family names in `global.css` only. The three Source Sans 3 files under `assets/fonts/` are registered with those same family names so React Native can load them. UI primitives (`Button`, `FormField`) take semantic arguments (`variant`, `size`, `intent`, `state`) and do not accept hex colors, padding numbers, or font names.
