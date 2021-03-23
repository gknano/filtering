import React, { FC, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Hightlighter } from '../utils/HightLighter';

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

const TdContainer = styled.td`
  padding: 3px 15px 3px;
  text-align: left;
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 25%,
    from(#f9f9f9),
    to(#fefefe)
  );
`;

const BodyCell: FC = ({ children }) => <TdContainer>{children}</TdContainer>;

export const Table: FC = () => {
  const [barcodes, setBarcodes] = useState<string[]>([]);
  const [filteredBarcodes, setFilteredBarcodes] = useState<string[]>([]);
  const [eventState, setEventState] = useState('');

  async function getBarcodes() {
    console.log('getBarcodes');

    try {
      const response = await fetch('http://qvz87.mocklab.io/barcodes1000/');
      const json = await response.json();
      setBarcodes(json);
    } catch (err) {
      console.error(err);
    }
  }

  function filteringTable(e: any) {
    if (e.keyCode === 13) {
      setEventState(e.target.value);
      const filteredData = [] as any;
      console.log('filteringTable');
      for (let item of barcodes) {
        if (item.indexOf(e.target.value) !== -1) {
          filteredData.push(item);
        }
      }
      setFilteredBarcodes(filteredData);
    }
    return null;
  }

  useEffect(() => {
    getBarcodes();
  }, []);

  return (
    <div>
      <div className="form-group">
        <label>Штрихкод</label>
        <input
          type="text"
          id="one"
          className="form-control"
          onKeyDown={(e: any) => filteringTable(e)}
          placeholder="Search"
        />
      </div>
      <TableContainer>
        <tbody>
          {filteredBarcodes.map((item, i) => (
            <tr key={`barcode-tr${i}`}>
              <BodyCell>
                <Hightlighter item={item} eventState={eventState} i={i} />
              </BodyCell>
            </tr>
          ))}
        </tbody>
      </TableContainer>
    </div>
  );
};
