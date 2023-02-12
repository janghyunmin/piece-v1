import { useEffect, useRef } from 'react'
import { AppState } from 'react-native'


export default function (callback: () => void) {
  const appState = useRef(AppState.currentState);

  const handleAppStateChange = (nextAppState: any) => {
    if (
      appState.current.match(/background/) &&
      nextAppState === 'active'
    ) {
      callback();
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);
}
