import React, { useEffect, useState } from 'react';

import { Button, Text } from 'native-base';

import { BuyPortfolioFooterBtnProps } from 'interfaces/home.type';

const FooterBtn = (props: BuyPortfolioFooterBtnProps) => {
  const { item, status, pieceAmount, deposit, min, max, navigation } = props;

  const [disabled, setDisabled] = useState<boolean>(true);
  const [isSelect, setSelect] = useState<boolean>(false);

  useEffect(() => {
    if (
      status !== 0 &&
      status >= min &&
      status*pieceAmount <= deposit &&
      status <= max
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [status, max]);
  
    /** 버튼 클릭시 색상 변경 bskr_jhm_0726 **/
    const onPressed = () => {
      setSelect(isSelect);
      setTimeout(() => setSelect(isSelect), 100);
    };

    
  return (
    <Button
      onPress={() => {
          let tempSelect = isSelect;
          tempSelect = !tempSelect;
          onPressed();
          setSelect(tempSelect);
          navigation.navigate('buyPortfolioModal', {
            item: item,
            status: status,
          })
        }
      }
      // colorScheme={'primary'}
      bgColor={'#10CFC9'}
      h={'48px'}
      borderRadius={'10px'}
      isDisabled={disabled}
    >
      <Text size={'buttonM'} color={'white'}>
        확인
      </Text>
    </Button>
  );
};

export default FooterBtn;
