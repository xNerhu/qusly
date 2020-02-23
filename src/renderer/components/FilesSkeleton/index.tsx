import React from 'react';

import { SkeletonCircle, SkeletonText } from '../Skeleton';
import { getRandomNumber } from '~/renderer/utils';
import {
  StyledFilesSkeleton,
  ANIMATION_TIME,
  StyledSkeletonFile,
} from './style';

const Item = () => {
  return (
    <StyledSkeletonFile>
      <SkeletonCircle style={{ width: 48, height: 48, margin: '8px 0px' }} />
      <SkeletonText style={{ height: 16, borderRadius: 4 }} />
    </StyledSkeletonFile>
  );
};

export const FilesSkeleton = () => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>();

  const timeout = React.useRef<NodeJS.Timeout>();

  const onTimeout = React.useCallback(() => {
    if (!ref.current) return;

    ref.current.style.display = 'none';

    setCount(getRandomNumber(15, 30));

    requestAnimationFrame(() => {
      if (!ref.current) return;

      ref.current.style.display = 'grid';
      setTimeout(onTimeout, ANIMATION_TIME);
    });
  }, []);

  React.useEffect(() => {
    setTimeout(onTimeout);

    return () => {
      clearTimeout(timeout.current);
    };
  }, []);

  return (
    <StyledFilesSkeleton ref={ref}>
      {[...Array(count).keys()].map((_, index) => (
        <Item key={index} />
      ))}
    </StyledFilesSkeleton>
  );
};