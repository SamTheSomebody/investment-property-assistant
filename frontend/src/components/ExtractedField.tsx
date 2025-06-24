import React from 'react';
import { ExtractedField } from '../utils/parseListing';

export default function ExtractedFieldDisplay(field: ExtractedField) {
  return (
    <div className="flex-1 flex flex-col">
      <h3 className="flex-1">{field.type}</h3>
      {field.values.map((value, i) => (
        <p className="flex-1 border-b border-b-gray" key={i}>
          {value}, {field.source[i]}
        </p>
      ))}
    </div>
  );
}
