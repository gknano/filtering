import React, { FC } from 'react';
import styled from '@emotion/styled';

const Hightlight = styled.span`
  background: yellow;
`;

export type THightlighter = {
  item: string;
  coloredValue: string;
  i: number;
};

export const Hightlighter: FC<THightlighter> = ({ item, coloredValue, i }) => {
  if (item && coloredValue) {
    let splitString: string[] = item
      .replace(coloredValue, `/${coloredValue}/`)
      .split('/');

    return (
      <span key={`span-hightight-${i}`}>
        {splitString.map((part, i) =>
          part === coloredValue ? (
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
