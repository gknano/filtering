import React, { FC, useState, useEffect } from 'react';
import styled from '@emotion/styled';

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
  padding: 18px 20px 18px;
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
  const [barcodes, setBarcodes] = useState(['']);
  const [filteredBarcodes, setFilteredBarcodes] = useState(['']);
  const [eventValue, setEventValue] = useState('');

  async function getBarcodes(e: any) {
    if (e.keyCode === 13) {
      console.log('getBarcodes');

      try {
        const response = await fetch('http://qvz87.mocklab.io/barcodes/');
        const json = await response.json();
        setBarcodes(json);
      } catch (err) {
        console.error(err);
      }
    }
  }

  function filteringTable(arg: any) {
    const filteredData = [];
    for (let item of barcodes) {
      if (item.indexOf(arg) !== -1) {
        filteredData.push(item);
      }
    }
    console.log('filteringTable');
    return filteredData;
  }

  useEffect(
    (...eventValue) => {
      if (barcodes.length > 0) {
        console.log('useEffect2');
        const newState: any = filteringTable(eventValue);
        setFilteredBarcodes(newState);
      }
    },
    [barcodes]
  );

  useEffect(() => {
    window.addEventListener('keydown', getBarcodes);

    return () => {
      console.log('remove');
      window.removeEventListener('keydown', getBarcodes);
    };
  });

  return (
    <div>
      <div>
        <legend>Штрихкод</legend>
        <input
          type="text"
          id="one"
          onKeyDown={(e: any) => setEventValue(e.target.value)}
        />
      </div>
      <TableContainer>
        <tbody>
          {filteredBarcodes.map((item, i) => (
            <tr key={`user-info-tr${i}`}>
              <BodyCell>{item}</BodyCell>
            </tr>
          ))}
        </tbody>
      </TableContainer>
    </div>
  );
};
