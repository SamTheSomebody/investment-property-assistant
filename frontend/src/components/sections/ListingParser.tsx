import React, { useState } from 'react';
import { ExtractedField } from '../../utils/parseListing';
import { ParseListing } from '../../utils/parseListing';

export default function ListingParser() {
  const [inputText, setInputText] = useState('');
  const [extractedFields, setExtractedFields] = useState<ExtractedField[]>([]);

  const handleParse = () => {
    const results = ParseListing(inputText);
    setExtractedFields(results);
  };

  const handleCancel = () => {
    setInputText('');
    setExtractedFields([]);
  };

  return (
    <div className="flex-1">
      <h2>Listing Parser</h2>
      <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} rows={6} style={{ width: '100%', marginBottom: 8 }} placeholder="Paste property listing text here..." />
      <div style={{ marginBottom: 12 }}>
        <button onClick={handleParse} style={{ marginRight: 8 }}>
          Parse
        </button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
      {extractedFields.some((f) => f.values.length > 0) && (
        <div>
          <h3>Extracted Fields</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Field</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Values</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Source Index</th>
              </tr>
            </thead>
            <tbody>
              {extractedFields
                .filter((f) => f.values.length > 0)
                .map((field) => (
                  <tr key={field.type}>
                    <td>{field.type}</td>
                    <td>{field.values.join(', ')}</td>
                    <td>{field.source.join(', ')}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
