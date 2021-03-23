import React, { FC } from 'react';
import styled from '@emotion/styled';
import { THightlighter } from '../types/index';

const Hightlight = styled.span`
  background: yellow;
`;

export const Hightlighter: FC<THightlighter> = ({ item, eventState, i }) => {
  if (item && eventState) {
    let splitString = item.replace(eventState, 'y').split('y');
    console.log('splitString:', splitString);

    return (
      <span key={`span-hightight-${i}`}>
        {splitString[0]}
        <Hightlight>{eventState}</Hightlight>
        {splitString[1]}
      </span>
    );
  }

  return item;
};
