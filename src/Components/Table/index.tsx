import React, { FC, useState, useEffect } from 'react';
import { getFilteredData } from '../utils';
import { getBarcodes } from '../../api';
import { TableComponent } from './table';
import { Spinner } from '../Spinner/Spinner';

export const Table: FC = () => {
  const [barcodes, setBarcodes] = useState<string[]>([]);
  const [filteredBarcodes, setFilteredBarcodes] = useState<string[]>([]);
  const [eventValue, setEventValue] = useState('');

  const filteringTable = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = currentTarget;
    if (value) {
      setEventValue(value);
      setFilteredBarcodes(getFilteredData(barcodes, value));
    }
  };

  useEffect(() => {
    getBarcodes<string[]>().then((data) => setBarcodes(data));
  }, []);

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
      {!filteredBarcodes.length && eventValue ? (
        <Spinner />
      ) : (
        <TableComponent
          isShow={!!filteredBarcodes.length}
          barcodes={filteredBarcodes}
          eventValue={eventValue}
        />
      )}
    </div>
  );
};
