import axios from 'axios';
import instance from 'apis/config'


// 쿠폰
export const getCouponCode = async (couponCode : string ) => {
    const { data } = await axios.get(`https://lui1qyiqx4.apigw.ntruss.com/piece-dev/v2/${couponCode}`);
    console.log('-----------------------------------------------------')
    console.log('v2 couponCode call..');
    console.log('-----------------------------------------------------')
    return data;
  };


