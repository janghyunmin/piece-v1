import React, { useState } from 'react';

import { Button, Text } from 'native-base';
import { withdrawDeposit } from 'apis/Deposit';
import { useMutation, useQueryClient } from 'react-query';

const FooterBtn = (props: any) => {
  const { navigation, pageType, status } = props;

  const queryClient = useQueryClient();

  const [disabled, setDisabled] = useState<boolean>(false);

  const changeDeposit = () => {
    setDisabled(true);
    withdraw.mutate(status);
  };

  const withdraw = useMutation((body: number) => withdrawDeposit(body), {
    onSuccess: (res) => {
      queryClient.invalidateQueries(['Deposit']);
      queryClient.invalidateQueries(['DepositHistory']);
      navigation.navigate('MoneyMovesResult', {
        type: pageType,
        status: status,
        success: true,
      });
    },
    onError: (err) => {
      navigation.navigate('MoneyMovesResult', {
        type: pageType,
        status: status,
        success: false,
      });
    },
  });

  return (
    <Button
      isDisabled={disabled}
      borderRadius={'10px'}
      h={'48px'}
      bgColor={'#10CFC9'}
      onPress={changeDeposit}
    >
      <Text size={'buttonM'} color={'white'}>
        출금 신청
      </Text>
    </Button>
  );
};

export default FooterBtn;
