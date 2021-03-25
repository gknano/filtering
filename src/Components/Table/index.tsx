import React, { FC, useState, useEffect } from 'react';
import { getFilteredData } from '../utils';
import { getBarcodes } from '../../api';
import { TableComponent } from './table';
import styled from '@emotion/styled';
import { Spinner } from '../Spinner/Spinner';

const NoDataComponent = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 2em;
`;

export const Table: FC = () => {
  const [barcodes, setBarcodes] = useState<string[]>([]);
  const [filteredBarcodes, setFilteredBarcodes] = useState<string[]>([]);
  const [eventValue, setEventValue] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const filteringTable = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = currentTarget;
    setIsloading(true);

    if (value) {
      setEventValue(value);
      let data = getFilteredData(barcodes, value);
      setFilteredBarcodes(data);
    } else {
      setFilteredBarcodes([]);
    }
    setIsloading(false);
  };

  useEffect(() => {
    getBarcodes<string[]>().then((data) => setBarcodes(data));
  }, []);

  const renderTable = () => {
    if (!filteredBarcodes.length) {
      return <NoDataComponent>нет данных</NoDataComponent>;
    } else if (isLoading) {
      return <Spinner />;
    }
    return (
      <TableComponent
        isShow={!!filteredBarcodes.length}
        barcodes={filteredBarcodes}
        eventValue={eventValue}
      />
    );
  };

  return (
    <div>
      <div>
        <h4>Штрихкод</h4>
        <input
          type="text"
          id="one"
          className="form-control"
          onChange={filteringTable}
          placeholder="Search"
        />
      </div>
      {renderTable()}
    </div>
  );
};
