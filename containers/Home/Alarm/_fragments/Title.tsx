import React from 'react'
import { Flex, Pressable, Text } from 'native-base'
import CloseIcon from 'components/Icons/CloseIcon'
import { CategoryType } from 'containers/Home/Alarm/index'
import Storage from '@react-native-async-storage/async-storage'


const Title = (props: any) => {
  const { navigation, categoryList, selectedCategory, setSelectedCategory } = props;

  return (
    <Flex
      zIndex={999}
      direction={'row'}
      h={'80px'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Flex direction={'row'}>
        {categoryList.map((category: CategoryType) => {
          const isSelected = category.parent === selectedCategory.parent;

          return (
            <Pressable key={category.notificationType} onPress={() => setSelectedCategory(category)}>
              <Text
                size={'titleXL'}
                color={isSelected ? 'black' : 'gray.400'}
                mr={'15px'}
              >
                {category.title}
              </Text>
            </Pressable>
          )
      })}
      </Flex>
      <Pressable
        onPress={() => {
          if (navigation.getState().index) navigation.goBack();
          else {
            Storage.getItem('@auth').then((auth) => {
              if (auth) {
                return navigation.reset({ routes: [{ name: 'login' }] });
              }
              navigation.reset({ routes: [{ name: 'Start' }] })
            })
          }
        }}
      >
        <CloseIcon />
      </Pressable>
    </Flex>
  )
}

export default Title;
