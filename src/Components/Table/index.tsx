import React, { FC, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { getFilteredData } from '../utils';
import { getBarcodes } from '../../api';
import { Body } from './body';

const TableContainer = styled.table`
  overflow: hidden;
  border: 1px solid #d3d3d3;
  background: #fefefe;
  width: 100%;
  margin: 5% auto 0;
  border-radius: 5px;
  -moz-box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 0 4px rgb(0 0 0 / 20%);
`;

export const Table: FC = () => {
  const [barcodes, setBarcodes] = useState<string[]>([]);
  const [filteredBarcodes, setFilteredBarcodes] = useState<string[]>([]);
  const [eventValue, setEventValue] = useState('');

  const filteringTable = ({
    key,
    currentTarget,
  }: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = currentTarget;
    if (key === 'Enter' && value) {
      setEventValue(value);
      setFilteredBarcodes(getFilteredData(barcodes, value));
    }
  };

  useEffect(() => {
    getBarcodes<string[]>().then((data) => setBarcodes(data));
  }, []);

  return (
    <div>
      <div className="form-group">
        <h4>Штрихкод</h4>
        <input
          type="text"
          id="one"
          className="form-control"
          onKeyDown={(e) => filteringTable(e)}
          placeholder="Search"
        />
      </div>
      <TableContainer>
        {filteredBarcodes && (
          <Body barcodes={filteredBarcodes} coloredValue={eventValue} />
        )}
      </TableContainer>
    </div>
  );
};
