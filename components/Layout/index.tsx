import React from 'react';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Flex } from 'native-base';

import { LayoutProps } from 'interfaces/auth.type';
import { Platform } from 'react-native';

const statusBarHeight = getStatusBarHeight();
const bottomHeight = getBottomSpace();

const Layout = ({ children, noStatusBar, bottomTab }: LayoutProps) => {
  return (
    <Flex
      bgColor={'#ffffff'}
      flex={1}
      pt={noStatusBar ? '0' : `${statusBarHeight}px`}
      pb={bottomTab ? '0' : `${Platform.OS === 'ios' ? bottomHeight : 30}px`}
    >
      {children}
    </Flex>
  );

};

export default Layout;
