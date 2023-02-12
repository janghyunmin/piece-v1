import { useEffect, useState } from 'react'

export default function () {
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  useEffect(() => {
    const removeTimeout = setTimeout(() => setPageLoaded(true), 400)
    return () => clearTimeout(removeTimeout);
  }, [])

  return pageLoaded;
}
