# react-native-keyboard-controller issue #1310 repro

Minimal reproduction for [react-native-keyboard-controller#1310](https://github.com/kirillzyusko/react-native-keyboard-controller/issues/1310) — swipe gestures on Android are forcibly terminated when they enter the keyboard region while using `KeyboardAvoidingView` with a WebView + toolbar.

## Finding

Removing the `<GestureDetector gesture={Gesture.Native()}>` wrapper around the WebView **fixes the issue**. This wrapper is a [workaround](https://github.com/software-mansion/react-native-gesture-handler/issues/3196#issuecomment-2507445638) for react-native-gesture-handler breaking WebView interactions, so the root cause appears to be an interaction between gesture-handler's `Gesture.Native()` and keyboard-controller's `KeyboardAvoidingView`.

## Environment

- Expo SDK 54
- React Native 0.81.5
- react-native-keyboard-controller 1.18.5
- react-native-gesture-handler 3.0.0-beta.2
- Android (tested on Samsung Galaxy S24, Android 16)

## Quick test (pre-built APK)

Download the dev client APK from [Releases](https://github.com/Nantris/react-native-keyboard-controller-issue-1310-repro/releases) and install:

```bash
adb install build.apk
```

Then start the dev server:

```bash
npm install
npx expo start --dev-client
```

## Build from source

```bash
npm install

# Dev client (connects to dev server)
npx eas build --profile development --platform android --local --output ./build.apk

# Preview (standalone, bundles JS)
npx eas build --profile preview --platform android --local --output ./build-preview.apk
```

Install to device:

```bash
adb install build.apk
# or
adb install build-preview.apk
```

## Reproducing the issue

1. Open the app and tap into the TipTap editor to show the keyboard
2. Swipe down on the WebView, continuing into the keyboard region
3. Observe: the swipe gesture is forcibly ended when entering the keyboard area
4. Try swiping back up — the gesture has already been terminated
