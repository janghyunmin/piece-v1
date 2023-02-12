import React  from 'react';

import * as Linking from 'expo-linking';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Animated } from 'react-native';

import GoBack from 'components/GoBack';

import { PortfolioHeaderProps } from 'interfaces/home.type';
import Storage from '@react-native-async-storage/async-storage'
import { useQueryClient } from 'react-query';

const statusBarHeight = getStatusBarHeight();

// 공유하기 기능을 위해 portfolioTitle 추가 bskr_jhm 0513
const Nav = ({ navigation, scrollY, headerAnimated, portfolioId , portfolioTitle , shareUrl }: PortfolioHeaderProps) => {
  const queryClient = useQueryClient();
  return (
    <Animated.View
      style={{
        transform: [{ translateY: scrollY }],
        height: 80,
        marginTop: headerAnimated ? 0 : statusBarHeight,
        borderBottomColor: '#F2F3F4',
        borderBottomWidth: headerAnimated ? 1 : 0,
        zIndex: 999,
        backgroundColor: headerAnimated ? 'white' : 'transparent',
      }}
    >
      <GoBack
        navigation={navigation}
        white={!headerAnimated}
        portfolioTitle={portfolioTitle}
        shareUrl={shareUrl}
        animated
        shared={Linking.createURL(`portfolio/${portfolioId}`)}
        // shared={Linking.createURL(`portfolio/${portfolioId} \n ${portfolioTitle} \n `)}
        onBack={() => {
          queryClient.invalidateQueries(['Portfolio']);
          queryClient.invalidateQueries(['NotificationStatus']);
          if (navigation.getState().index) return navigation.goBack();
          else {
            Storage.getItem('@auth').then((auth) => {
              if (auth) {
                return navigation.reset({ routes: [{ name: 'login' }] });
              }
              return navigation.reset({ routes: [{ name: 'Start' }] })
            })
          }
        }}
      />
    </Animated.View>
  );
};

export default Nav;
