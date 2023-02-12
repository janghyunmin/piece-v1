import { useEffect } from 'react';
import { BackHandler } from 'react-native';


export default function (isUse: boolean = true) {
  const backAction = () => true;

  useEffect(() => {
    if (isUse) {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
    }
  }, [isUse]);
}