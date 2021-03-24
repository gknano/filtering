import React, { FC } from 'react';
import styled from '@emotion/styled';
import { THightlighter } from './types';

const Hightlight = styled.span`
  background: yellow;
`;

export const Hightlighter: FC<THightlighter> = ({ item, coloredValue, i }) => {
  if (item && coloredValue) {
    //const re = new RegExp(`(${coloredValue})`);
    let splitString: string[] = item
      .replace(coloredValue, `/${coloredValue}/`)
      .split('/');
    console.log(splitString);

    return (
      <span key={`span-hightight-${i}`}>
        {splitString.map((part, i) =>
          part === coloredValue ? (
            //спросить про условие
            <Hightlight key={`part-${i}`}>{part}</Hightlight>
          ) : (
            part
          )
        )}
      </span>
    );
  }

  return <>{item}</>;
};
