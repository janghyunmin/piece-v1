import React, { useCallback } from 'react'

import { Box, Flex, Pressable, Text } from 'native-base';
import { Image } from 'react-native';

import { ConsentData, OptionalItemsProps } from 'interfaces/mypage.type'
import NextGrayIcon from 'components/Icons/NextGrayIcon';
import { formatDate } from 'utils/formatDate'
import ToggleBtn from 'components/ToggleBtn'
import { useMutation, useQueryClient } from 'react-query'
import { updateMemberConsent } from 'apis/Member'

const OptionalItems = (props: OptionalItemsProps) => {
  const { optionalConsentList, memberConsentList } = props;

  const queryClient = useQueryClient();

  const getToggle = useCallback((consentCode: string) => {
    return memberConsentList.some((consent) => {
      return consent.consentCode === consentCode && consent.isAgreement === 'Y';
    });
  }, [memberConsentList])

  const handleToggle = (consentCode: string, isAgreement: 'Y'|'N') => {
    mutation.mutate({ consentCode, isAgreement });
  }

  const mutation = useMutation(
    (body: any) => updateMemberConsent(body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['MemberConsents'])
      }
    }
  );

  return (
    <Box bgColor={'white'} px={'16px'} mb={'10px'}>
      {optionalConsentList.map((consent: ConsentData) => {
        const toggle = getToggle(consent.consentCode);
        return (
          <Flex
            key={consent.consentCode}
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text py={'20px'} size={'textM'} color={'gray.800'}>
              [선택] {consent.consentTitle}
            </Text>

            <ToggleBtn
              toggle={toggle}
              handleToggle={() => handleToggle(consent.consentCode, toggle ? 'N' : 'Y')}
            />
          </Flex>
        );
      })}
    </Box>
  );
};

export default OptionalItems;
