import React from 'react';
import LottieView from 'lottie-react-native';

import { View } from 'react-native'

const Splash = ({
  onLayoutRootView,
}: {
  onLayoutRootView: () => Promise<void>;
}) => {
  return (
    <View
      onLayout={onLayoutRootView}
    >
      <LottieView
        style={{ width: '100%' }}
        source={require('assets/lottie/splash1.json')}
        autoPlay
        loop={false}
        resizeMode={'cover'}
      />
    </View>
  );
};

export default Splash;
