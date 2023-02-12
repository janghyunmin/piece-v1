import { useInfiniteQuery } from 'react-query'
import { getMagazineList } from 'apis/Magazine'


export default function (categoryType: string, options: any) {
  return useInfiniteQuery(
    ['Magazines', categoryType],
    async ({ pageParam: offset = 0 }) => {
      const limit = 10;
      const data = await getMagazineList(categoryType, limit, offset);
      return {
        ...data,
        limit,
        offset,
      }
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.count > lastPage.offset+lastPage.limit) return lastPage.offset+lastPage.limit;
      },
      keepPreviousData: false,
      cacheTime: 0,
      ...options,
    }
  )
}
