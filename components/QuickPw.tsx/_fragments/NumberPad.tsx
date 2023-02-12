import React from 'react';

import { Image } from 'react-native';
import { HStack, Pressable, Text, VStack } from 'native-base';

import { NumberPadProps } from 'interfaces/auth.type';
import DeleteIcon from 'components/Icons/DeleteIcon';

const NumberPad = (props: NumberPadProps) => {
  const {
    randomPw1,
    randomPw2,
    randomPw3,
    randomPw4,
    pressPassword,
    deletePassword,
    reset,
  } = props;

  return (
    <VStack space={3} w="100%" px={'16px'}>
      <HStack justifyContent="space-between">
        {randomPw1.map((data: number, index: number) => (
          <Pressable
            onPress={() => pressPassword(data)}
            key={index}
            flex={1}
            pt={'18px'}
            pb={'18px'}
            justifyContent="center"
            alignItems="center"
          >
            <Text size={'titleXL'} color={'gray.800'}>
              {data}
            </Text>
          </Pressable>
        ))}
      </HStack>

      <HStack justifyContent="space-between">
        {randomPw2.map((data: number, index: number) => (
          <Pressable
            onPress={() => pressPassword(data)}
            key={index}
            flex={1}
            pt={'18px'}
            pb={'18px'}
            justifyContent="center"
            alignItems="center"
          >
            <Text size={'titleXL'} color={'gray.800'}>
              {data}
            </Text>
          </Pressable>
        ))}
      </HStack>

      <HStack justifyContent="space-between">
        {randomPw3.map((data: number, index: number) => (
          <Pressable
            onPress={() => pressPassword(data)}
            key={index}
            flex={1}
            pt={'18px'}
            pb={'18px'}
            justifyContent="center"
            alignItems="center"
          >
            <Text size={'titleXL'} color={'gray.800'}>
              {data}
            </Text>
          </Pressable>
        ))}
      </HStack>

      <HStack justifyContent="space-between">
        {randomPw4.map((data: number | string, index: number) => (
          <Pressable
            onPress={() => {
              if (typeof data === 'number') {
                pressPassword(data);
              }
              if (data === 'back') {
                deletePassword();
              }
              if (data === '초기화') {
                reset();
              }
            }}
            key={index}
            flex={1}
            pt={'18px'}
            pb={'18px'}
            justifyContent="center"
            alignItems="center"
          >
            {data === 'back' ? (
              // <Image
              //   style={{ width: 48, height: 48 }}
              //   source={require('assets/images/icons/DeleteIcon.png')}
              // />
              <DeleteIcon />
            ) : (
              <Text
                size={data === '초기화' ? 'textS' : 'titleXL'}
                color={'gray.800'}
              >
                {data}
              </Text>
            )}
          </Pressable>
        ))}
      </HStack>
    </VStack>
  );
};

export default NumberPad;
