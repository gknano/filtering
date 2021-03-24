import React, { FC } from 'react';
import styled from '@emotion/styled';

const StyledPage = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 6rem;
`;

type DivType = React.HTMLAttributes<HTMLDivElement>;

export const PageContainer: FC<DivType> = ({ children, className, style }) => (
  <StyledPage className={className} style={style}>
    {children}
  </StyledPage>
);
