import React from 'react';

import { Box, Button, Flex, Pressable, Text } from 'native-base';
import { Image } from 'react-native';

import { RegisterChangeBankAccountProps } from 'interfaces/wallet.type';

const ChangeBankAccount = (props: RegisterChangeBankAccountProps) => {
  const { handleGoBack, image, bankName } = props;

  return (
    <Box mb={'40px'}>
      <Flex
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        h={'52px'}
      >
        <Flex direction="row" alignItems="center">
          <Image
            style={{ width: 40, height: 40, marginRight: 12.5 }}
            source={image}
          />
          <Text size={'titleM'} color={'gray.700'}>
            {bankName}
          </Text>
        </Flex>

        <Button
          onPress={handleGoBack}
          borderRadius={'10px'}
          bgColor={'#E6F9FA'}
          colorScheme={'button_primary_light'}
          px={'15px'}
          py={'7.5px'}
        >
          <Text size={'buttonM'} color={'primary.500'}>
            변경
          </Text>
        </Button>
      </Flex>
    </Box>
  );
};

export default ChangeBankAccount;
