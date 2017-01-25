import React from 'react';
import { Cell } from '../components';

const Row = (props) => {
  const { row } = props;

  return (
    <tr>
      {row.map((cell, i) => (<Cell key={i} cellValue={cell} />))}
    </tr>
  );
};

export default Row;
