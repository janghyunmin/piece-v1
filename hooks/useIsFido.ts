import { useEffect, useState } from 'react';
import Storage from '@react-native-async-storage/async-storage';


export default function () {
  const [isFido, setIsFido] = useState<null|'Y'|'N'>(null);
  useEffect(() => {
    Storage.getItem('@isFido').then((isFido) => {
      setIsFido(isFido === 'Y' ? 'Y' : 'N')
    })
  }, []);

  return isFido;
}