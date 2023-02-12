// import React, { useEffect, useState } from 'react';
//
// import { Box, Flex, Pressable } from 'native-base';
// import { useDispatch } from 'react-redux';
//
// import Layout from 'components/Layout';
// import Title from './_fragments/Title';
// import CheckInput from './_fragments/CheckInput';
// import FooterBtn from './_fragments/FooterBtn';
//
// import { updateMemberEmail } from 'apis/Member';
// import GoBackIcon from 'components/Icons/GoBackIcon';
//
// const ConfirmEmail = ({ navigation, route }: any) => {
//   const [email, setEmail] = useState<string>('');
//   const [fromMyInfo, setFromMyInfo] = useState<boolean>(false);
//
//   const next = () => {
//     dispatch(userEmailSet(email));
//     const body = {
//       email: email,
//     };
//     updateMemberEmail(body)
//       .then((res) => {
//         if (res.status !== 200) return;
//         navigation.navigate('confirmEmailComplete', { fromMyInfo: fromMyInfo });
//       })
//       .catch((err) => console.log('에러', err));
//   };
//
//   useEffect(() => {
//     if (route.params) {
//       const { from } = route.params;
//       if (from === 'myInfo') {
//         setFromMyInfo(true);
//       }
//     }
//   }, [route.params]);
//
//   return (
//     <Layout>
//       <Box h={'100%'}>
//         <Box flex={'1'}>
//           <Flex
//             zIndex={'999'}
//             direction={'row'}
//             h={'80px'}
//             justifyContent={'space-between'}
//             alignItems={'center'}
//             px={'16px'}
//           >
//             {/* 뒤로가기 버튼 */}
//             <Pressable
//               zIndex={99}
//               onPress={() => {
//                 if (route.params && route.params.from === 'email') {
//                   navigation.navigate('ownDeed');
//                 } else {
//                   navigation.goBack();
//                 }
//               }}
//               w={'40px'}
//               h={'80px'}
//               justifyContent={'center'}
//             >
//               <GoBackIcon />
//             </Pressable>
//           </Flex>
//
//           <Box px={'16px'}>
//             <Title />
//           </Box>
//
//           <Box px={'16px'}>
//             <CheckInput email={email} setEmail={setEmail} />
//           </Box>
//         </Box>
//
//         <Box px={'16px'} position={'absolute'} bottom={'0'} w={'100%'}>
//           <FooterBtn email={email} next={next} />
//         </Box>
//       </Box>
//     </Layout>
//   );
// };
//
// export default ConfirmEmail;
