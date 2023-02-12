import React from 'react';

import { Box, Flex, Text, VStack } from 'native-base';

import { PortfolioInnerSection5Props } from 'interfaces/home.type';
import PurchaseInfoItem from 'containers/Wallet/WalletStack/OwnPiece/_fragments/PurchaseInfoItem';
import { convertPrice } from 'utils/convertPrice';
import { convertDate } from 'utils/convertDate';
import { comma } from 'utils/comma';

const Section5 = (props: PortfolioInnerSection5Props) => {
  const { item } = props;

  return (
    <Box px={'16px'}>
      <VStack
        space={'15px'}
        shadow={2}
        borderRadius={'10px'}
        bgColor={'white'}
        py={'15px'}
        px={'16px'}
      >
        <PurchaseInfoItem title={'포트폴리오'} body={item.title} />
        <PurchaseInfoItem title={'구성'} body={item.products.map((product: any) => (
          `· ${product.title}`
          // `· ${product.author} - ${product.title}(${product.productionYear})`
        )).join('\n')} />
        <PurchaseInfoItem title={'총 판매 금액'} body={`${convertPrice(item.recruitmentAmount)}원`} />
        <PurchaseInfoItem
          title={'구매 가능 금액'}
          body={function () {
            return `최소 ${convertPrice(item.minPurchaseAmount)}원 ~ 최대 ${convertPrice(item.maxPurchaseAmount)}원`;
          }()}
          subBody={function () {
            let pieceAmount = item.recruitmentAmount / item.totalPieceVolume;
            let min = item.minPurchaseAmount/pieceAmount;
            let max  = item.maxPurchaseAmount/pieceAmount;
            return `최소 ${comma(min)}피스 ~ 최대 ${comma(max)}피스`;
          }()}
        />
        <PurchaseInfoItem
          title={'운용 기간'}
          body={`${convertDate(new Date(item.dividendsExpecatationDate).getTime() - new Date(item.recruitmentBeginDate).getTime())} (조기 분배 가능)`}
        />
      </VStack>
    </Box>
  );
};

export default Section5;
