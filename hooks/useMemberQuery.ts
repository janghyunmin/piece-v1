import { useQuery } from 'react-query'
import { getMember } from 'apis/Member'


export default function () {
  return useQuery(
    ['Member'],
    getMember,
    {
      cacheTime: 0,
    },
  )
}