import instance from 'apis/config'

// 포트폴리오 리스트 조회
export const getPortfolioList = async (params: {
  limit: number;
  offset: number;
}) => {
  const { data } = await instance.get(`/portfolio`,{ params });
  console.log('-----------------------------------------------------')
  console.log('/portfolio get call..');
  console.log('-----------------------------------------------------')
  return data;
};

// 포트폴리오 디테일 조회
export const getPortfolioDetail = async (portfolioId: string) => {
  const { data } = await instance.get(`/portfolio/${portfolioId}`);
  console.log('-----------------------------------------------------')
  console.log('/portfolio/{portfolio_id} get call..');
  console.log('-----------------------------------------------------')
  return data;
}
