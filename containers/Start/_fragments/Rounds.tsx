import React from 'react';

import { LinearGradient } from 'expo-linear-gradient';

import { RoundsProps } from 'interfaces/auth.type';

const Rounds = ({
  firstTop,
  firstLeft,
  firstWidth,
  secondTop,
  secondLeft,
  secondWidth,
}: RoundsProps) => {
  return (
    <>
      <LinearGradient
        style={{
          position: 'absolute',
          top: -firstTop,
          left: -firstLeft,
          width: firstWidth,
          height: firstWidth,
          borderRadius: firstWidth / 2,
        }}
        start={[0.7, 1]}
        end={[0.3, 0]}
        locations={[0.3569, 0.78]}
        colors={['#15D0CA', '#B6F6FF']}
      />
      <LinearGradient
        style={{
          position: 'absolute',
          top: secondTop,
          left: -secondLeft,
          width: secondWidth,
          height: secondWidth,
          borderRadius: secondWidth / 2,
        }}
        start={[0.5, 0]}
        end={[0.5, 1]}
        locations={[0, 1]}
        colors={['#15D0CA', '#8CD7E6']}
      />
    </>
  );
};

export default Rounds;
