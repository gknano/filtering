import React, { FC } from 'react';
import styled from '@emotion/styled';
import { PageContainerProps } from './types/index';

const StyledPage = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 6rem;
`;

// создаем универсальный контейнер для страниц
export const PageContainer: FC<PageContainerProps> = ({
  children,
  className,
  style,
}) => (
  <StyledPage className={className} style={style}>
    {children}
  </StyledPage>
);
