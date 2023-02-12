import React, { useCallback, useMemo, useState } from 'react'

import { Box, Button, Flex, Pressable, Text } from 'native-base';

import { getConsentList } from 'apis/Consent';
import { ConsentType } from 'apis/Consent/consent.type';
import CheckPrimaryIcon from 'components/Icons/CheckPrimaryIcon';
import CheckIcon from 'components/Icons/CheckIcon';
import CircleCheckIcon from 'components/Icons/CircleCheckIcon';
import CircleCheckColoredIcon from 'components/Icons/CircleCheckColoredIcon';
import CloseGrayIcon from 'components/Icons/CloseGrayIcon';
import NextGrayIcon from 'components/Icons/NextGrayIcon';
import { useMutation, useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { setForm } from 'features/certificationFormSlice'
import { RequestSmsType } from 'apis/SMS/sms.type'
import { requestSms } from 'apis/SMS'
import { useRootState } from 'hooks/useRootState'

const PolicyAgreement = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { form } = useRootState((state) => state.certificationForm);
  const [isSelect, setSelect] = useState<boolean>(false);

  const [consentList, setConsentList] = useState<ConsentType[]>([]);
  const { isLoading } = useQuery(
    ['Consents'],
    () => getConsentList(),
    {
      onSuccess: (data) => {
        setConsentList(data.map((consent: ConsentType) => ({ ...consent, checked: false })));
      },
      onError: (err: any) => {
        navigation.navigate('NetworkError');
        navigation.goBack();
      },
      refetchOnMount: true,
      cacheTime: 0,
    }
  );

  const checkedAll = useMemo(() => {
    return isLoading ? false : consentList.every((consent: ConsentType) => consent.checked);
  }, [isLoading, consentList])

  const checkedEssentialAll = useMemo(() => {
    return consentList.filter((consent: ConsentType) => consent.isMandatory === 'Y').every((consent: ConsentType) =>
      consent.checked
    );
  }, [consentList])

  const essentialConsentList = useMemo(() => {
    return consentList.filter((consent: ConsentType) => consent.isMandatory === 'Y');
  }, [consentList]);

  const optionalConsentList = useMemo(() => {
    return consentList.filter((consent: ConsentType) => consent.isMandatory === 'N');
  }, [consentList]);

  const handleCheckAll = () => {
    setConsentList(consentList.map((consent: ConsentType) => ({
      ...consent,
      checked: !checkedAll,
    })));
  }

  const handleCheck = (consentCode: string) => {
    setConsentList(consentList.map((consent: any) => consent.consentCode !== consentCode ? consent : ({
      ...consent,
      checked: !consent.checked,
    })));
  };

  const handleDetail = (consentCode: string) => {
    navigation.navigate('AgreementDetail', { consentCode });
  }

  const handlePress = () => {
    dispatch(setForm({name: 'consentList', value: consentList}));
    navigation.goBack();

    // TODO: 테스터
    if (form.name === '테스터' && form.phone === '01012345678') {
      dispatch(setForm({ name: 'txSeqNo', value: 'TESTERtxSeqNo'}));
      navigation.navigate('CertificationNum');
      return;
    }

    sendSms({
      name: form.name,
      birthday: form.birthday,
      sexCd: form.gender === '남자' ? 'M' : 'F',
      ntvFrnrCd: 'L',
      telComCd: telComCdFilter(form.carrier),
      telNo: form.phone,
      agree1: 'Y',
      agree2: 'Y',
      agree3: 'Y',
      agree4: 'Y',
    });
  };

  const telComCdFilter = useCallback((carrier: string): string => {
    if (carrier === 'SKT') return '01';
    if (carrier === 'KT') return '02';
    if (carrier === 'LG U+') return '03';
    if (carrier === 'SKT 알뜰폰') return '04';
    if (carrier === 'KT 알뜰폰') return '05';
    if (carrier === 'LG U+ 알뜰폰') return '06';
    return '';
  }, []);

  const { mutate: sendSms } = useMutation(
    (body: RequestSmsType) => requestSms(body),
    {
      onSuccess: (res) => {
        if (res.data.rsltCd !== 'B000') return navigation.navigate('CertificationFailModal');
        dispatch(setForm({ name: 'txSeqNo', value: res.data.txSeqNo}));
        navigation.navigate('CertificationNum');
      },
    },
  );

   /** 버튼 클릭시 색상 변경 bskr_jhm_0726 **/
   const onPressed = () => {
    setSelect(isSelect);
    setTimeout(() => setSelect(isSelect), 100);
  };


  return (
    isLoading ? <></> : (
      <Flex flex={1} w={'100%'} justifyContent={'flex-end'}>
        <Box
          bgColor={'white'}
          borderTopLeftRadius={'20px'}
          borderTopRightRadius={'20px'}
          pt={'30px'}
          px={'16px'}
          pb={'30px'}
        >
          <Flex
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            mb={'30px'}
          >
            <Box w={'28px'} h={'28px'} />
            <Text size={'titleL'} color={'gray.800'}>
              약관 동의
            </Text>
            <Pressable
              w={'28px'}
              h={'28px'}
              justifyContent={'center'}
              alignItems={'center'}
              onPress={() => navigation.goBack()}
            >
              <CloseGrayIcon />
            </Pressable>
          </Flex>

          <Box mb={'30px'}>
            <Pressable onPress={() => handleCheckAll()}>
              <Flex
                direction={'row'}
                alignItems={'center'}
                py={'20px'}
                mb={'20px'}
                borderBottomWidth={'1px'}
                borderBottomColor={'gray.300'}
              >
                <Box mr={'10px'}>
                  {checkedAll ? <CircleCheckColoredIcon /> : <CircleCheckIcon />}
                </Box>
                <Text size={'titleM'} color={'primary.500'}>
                  약관에 모두 동의합니다
                </Text>
              </Flex>
            </Pressable>

            <Box>
              {essentialConsentList.map((consent: ConsentType, index: number) => (
                <Flex
                  key={index}
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  pb={'20px'}
                >
                  <Pressable onPress={() => handleCheck(consent.consentCode)}>
                    <Flex direction={'row'} alignItems={'center'}>
                      <Box mr={'10px'}>
                        {consent.checked ? <CheckPrimaryIcon /> : <CheckIcon />}
                      </Box>
                      <Text mr={'5px'} size={'textM'} color={'gray.800'}>
                        {consent.consentTitle}
                      </Text>
                      <Text size={'textS'} color={'gray.600'}>
                        [필수]
                      </Text>
                    </Flex>
                  </Pressable>

                  <Pressable onPress={() => handleDetail(consent.consentCode)}>
                    <NextGrayIcon />
                  </Pressable>
                </Flex>
              ))}

              {optionalConsentList.map((consent: ConsentType, index: number) => (
                <Flex
                  key={index}
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  borderTopWidth={index === 0 ? '1px' : 0}
                  borderTopColor={'gray.300'}
                  pt={index === 0 ? '20px' : 0}
                  pb={'20px'}
                >
                  <Pressable onPress={() => handleCheck(consent.consentCode)}>
                    <Flex direction={'row'} alignItems={'center'}>
                      <Box mr={'10px'}>
                        {consent.checked ? <CheckPrimaryIcon /> : <CheckIcon />}
                      </Box>
                      <Text mr={'5px'} size={'textM'} color={'gray.800'}>
                        {consent.consentTitle}
                      </Text>
                      <Text size={'textS'} color={'gray.600'}>
                        [선택]
                      </Text>
                    </Flex>
                  </Pressable>

                  <Pressable onPress={() => handleDetail(consent.consentCode)}>
                    <NextGrayIcon />
                  </Pressable>
                </Flex>
              ))}
            </Box>
          </Box>

          <Button
            // colorScheme={'primary'}
            bgColor={'#10CFC9'}
            isDisabled={!checkedEssentialAll}
            onPress={() => {
                let tempSelect = isSelect;
                tempSelect = !tempSelect;
                onPressed();
                setSelect(tempSelect);

                handlePress()
              }
            }
            style={[{ backgroundColor: isSelect ? '#3b797d' : '#10CFC9' }]}
            borderRadius={'10px'}
            h={'48px'}
          >
            <Text color={'white'} size={'buttonM'}>
              확인
            </Text>
          </Button>
        </Box>
      </Flex>
    )
  );
};

export default PolicyAgreement;
