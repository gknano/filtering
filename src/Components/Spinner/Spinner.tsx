import React from 'react';
import styled from '@emotion/styled';

const SvgContainer = styled.svg`
  animation: rotate 2s linear infinite;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const CircleContainer = styled.circle`
  stroke: #213c58;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export const Spinner = () => {
  return (
    <SvgContainer viewBox="0 0 50 50">
      <CircleContainer
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      ></CircleContainer>
    </SvgContainer>
  );
};
