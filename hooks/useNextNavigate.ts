import { useEffect } from 'react';


export default function (navigation: any, next?: { route: string; params: string }) {
  useEffect(() => {
    if (next) {
      const tempNext = { ...next };
      navigation.setParams({
        ...next,
        next: null,
      });
      navigation.navigate(tempNext.route, tempNext.params);
    }
  }, [next])
}