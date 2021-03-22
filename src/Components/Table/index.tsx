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

const Hightlight = styled.span`
  background: red;
`;

const BodyCell: FC = ({ children }) => <TdContainer>{children}</TdContainer>;

export const Table: FC = () => {
  const [barcodes, setBarcodes] = useState(['']);
  const [filteredBarcodes, setFilteredBarcodes] = useState(['']);
  const [eventState, setEventState] = useState('');

  async function getBarcodes() {
    console.log('getBarcodes');

    try {
      const response = await fetch('http://qvz87.mocklab.io/barcodes/');
      const json = await response.json();
      setBarcodes(json);
    } catch (err) {
      console.error(err);
    }
  }

  function filteringTable(e: any) {
    console.log(Boolean(e.target.value));
    if (e.keyCode === 13 && e.target.value) {
      setEventState(e.target.value);
      const filteredData = [];
      for (let item of barcodes) {
        if (item.indexOf(e.target.value) !== -1) {
          filteredData.push(item);
        }
      }
      setFilteredBarcodes(filteredData);
      console.log('filteringTable');
    }
    return null;
  }

  const Hightlighter = (item: string) => {
    if (!eventState) return item;
    const regexp = new RegExp(eventState, 'i');
    const matchValue = item.match(regexp);

    if (matchValue) {
      console.log('matchValue', matchValue);
      console.log('str.split(regexp)', item.split(regexp));

      return item.split(regexp).map((s: string, i: number, array: any) => {
        if (i < array.length - 1) {
          const c = matchValue.shift();
          return (
            <span key={`span-hightight-${i}`}>
              {s}
              <Hightlight>{c}</Hightlight>
            </span>
          );
        }
        return s;
      });
    }
    return item;
  };

  useEffect(() => {
    getBarcodes();
  }, []);

  return (
    <div>
      <div>
        <pre>Штрихкод</pre>
        <input
          type="text"
          id="one"
          onKeyDown={(e: any) => filteringTable(e)}
          placeholder="Search"
        />
      </div>
      <TableContainer>
        <tbody>
          {filteredBarcodes.map((item, i) => (
            <tr key={`barcode-tr${i}`}>
              <BodyCell>{Hightlighter(item)}</BodyCell>
            </tr>
          ))}
        </tbody>
      </TableContainer>
    </div>
  );
};
