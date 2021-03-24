import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Hightlighter } from '../HightLighter';

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

type BodyProps = { barcodes: string[]; coloredValue: string };

export const Body: FC<BodyProps> = ({ barcodes, coloredValue }) => {
  //debugger;
  return (
    <tbody>
      {barcodes.map((item, i) => (
        <tr key={`barcode-tr${i}`}>
          <BodyCell>
            <Hightlighter item={item} coloredValue={coloredValue} i={i} />
          </BodyCell>
        </tr>
      ))}
    </tbody>
  );
};
