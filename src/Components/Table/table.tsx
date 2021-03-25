import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Body } from './body';

type TableType = {
  isShow: boolean;
  barcodes: string[];
  eventValue: string;
};

const TableContainer: FC<TableType> = ({
  barcodes,
  eventValue,
  isShow,
  ...rest
}) => (
  <table {...rest}>
    {barcodes && <Body barcodes={barcodes} coloredValue={eventValue} />}
  </table>
);

export const TableComponent = styled(TableContainer)`
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
  height: 40em;
  overflow-y: scroll;
  border: 1px solid #d3d3d3;
  background: #fefefe;
  width: 100%;
  margin: 5% auto 0;
  border-radius: 5px;
  -moz-box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 0 4px rgb(0 0 0 / 20%);

  &::-webkit-scrollbar {
    width: 7px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e0dddd;
    border-radius: 10px;
  }
`;
