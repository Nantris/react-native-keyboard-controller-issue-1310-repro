import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';
import { KeyboardAvoidingView, KeyboardProvider } from 'react-native-keyboard-controller';
import { WebView } from 'react-native-webview';

const TOOLBAR_HEIGHT = 44;

function Toolbar() {
  return (
    <View style={styles.toolbar}>
      <Pressable style={styles.toolbarButton}>
        <Text style={styles.toolbarButtonText}>B</Text>
      </Pressable>
      <Pressable style={styles.toolbarButton}>
        <Text style={styles.toolbarButtonText}>I</Text>
      </Pressable>
      <Pressable style={styles.toolbarButton}>
        <Text style={styles.toolbarButtonText}>U</Text>
      </Pressable>
    </View>
  );
}

// Gesture.Native() wrapping is needed to fix gesture-handler breaking WebView interactions
// See: https://github.com/software-mansion/react-native-gesture-handler/issues/3196#issuecomment-2507445638
const MemoizedWebView = memo(() => {
  const native = Gesture.Native();

  return (
    <GestureDetector gesture={native}>
      <WebView
        source={{ uri: 'https://templates.tiptap.dev/nw6Cmz6HfD' }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        scrollEnabled={false}
        setBuiltInZoomControls={false}
        overScrollMode="never"
        hideKeyboardAccessoryView
      />
    </GestureDetector>
  );
});

export default function App() {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <KeyboardProvider>
        <KeyboardAvoidingView behavior="padding" style={styles.flex}>
          <MemoizedWebView />
          <Toolbar />
        </KeyboardAvoidingView>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  toolbar: {
    height: TOOLBAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  toolbarButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  toolbarButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
