export type ExtractedField = {
  type: string;
  pattern: RegExp;
  values: string[];
  source: number[];
};

const PATTERNS = {
  address: /(\d+\s+[a-z\s]+(?:street|st|road|rd|avenue|ave|drive|dr|lane|ln|place|pl|court|ct|terrace|ter|way|close|cl|boulevard|blvd))/gi,
  suburb: /,\s*([a-z\s]+)\s*(?:nsw|vic|qld|wa|sa|tas|nt|act)/gi,
  postcode: /(\d{4})/g,
  propertyType: /(house|apartment|unit|townhouse|villa|duplex)/gi,
  bedrooms: /(\d+)\s*(?:bed|bedroom|beds)/gi,
  bathrooms: /(\d+)\s*(?:bath|bathroom|baths)/gi,
  carSpaces: /(\d+)\s*(?:car|parking|garage)/gi,
  squareMeters: /(\d+)\s*(?:m²|sqm|square\s*meters?)/gi,
  price: /(\$[\d,]+(?:k|k)?(?:\s*-\s*\$[\d,]+(?:k|k)?)?)/gi,
  priceRange: /(\$[\d,]+(?:k|k)?)\s*-\s*(\$[\d,]+(?:k|k)?)/gi,
};

function NewFields(): ExtractedField[] {
  return [
    { type: 'address', pattern: PATTERNS.address, values: [], source: [] },
    { type: 'suburb', pattern: PATTERNS.suburb, values: [], source: [] },
    { type: 'postcode', pattern: PATTERNS.postcode, values: [], source: [] },
    { type: 'propertyType', pattern: PATTERNS.propertyType, values: [], source: [] },
    { type: 'bedrooms', pattern: PATTERNS.bedrooms, values: [], source: [] },
    { type: 'bathrooms', pattern: PATTERNS.bathrooms, values: [], source: [] },
    { type: 'carSpaces', pattern: PATTERNS.carSpaces, values: [], source: [] },
    { type: 'squareMeters', pattern: PATTERNS.squareMeters, values: [], source: [] },
    { type: 'priceRange', pattern: PATTERNS.priceRange, values: [], source: [] },
    { type: 'priceExpected', pattern: PATTERNS.price, values: [], source: [] },
    //{ type: 'rentMin', values: [], source: [] },
    //{ type: 'rentMax', values: [], source: [] },
    //{ type: 'rentExpected', values: [], source: [] },
    //{ type: 'startaFees', values: [], source: [] },
    //{ type: 'councilRates', values: [], source: [] },
    //{ type: 'waterRates', values: [], source: [] },
    //{ type: 'homeInsurance', values: [], source: [] },
    //{ type: 'landlordInsurance', values: [], source: [] },
    //{ type: 'imageURL', values: [], source: [] },
  ];
}

export function ParseListing(text: string): ExtractedField[] {
  let fields = NewFields();
  text = text.trim().toLowerCase();

  for (let field of fields) {
    let pattern = field.pattern;
    let matches = text.match(pattern);
    if (matches) {
      for (let match of matches) {
        field.values.push(match);
        field.source.push(text.indexOf(match));
        console.log(field.type, match, text.indexOf(match));
      }
    }
  }
  return fields;
}
