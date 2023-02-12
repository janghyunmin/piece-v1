import React from 'react';

import { Center, Text } from 'native-base';

import portfolioBadgeColor from 'utils/portfolioBadge';

import { PortfolioStatus } from 'interfaces/home.type';

const PortfolioStatusBadge = (props: { status: PortfolioStatus }) => {
  const { status } = props;

  return (
    <Center
      borderRadius={'25px'}
      w={'84px'}
      h={'30px'}
      bgColor={portfolioBadgeColor(status).bgColor}
    >
      <Text size={'buttonM'} color={portfolioBadgeColor(status).color}>
        {portfolioBadgeColor(status).text}
      </Text>
    </Center>
  );
};

export default PortfolioStatusBadge;
