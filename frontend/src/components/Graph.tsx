import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

const base = 120000;
const propertyGrowthRate = 0.05;
const asxGrowthRate = 0.09;

const data = Array.from({length: 31}, (_, year) => ({
  year,
  property: Math.round(base * Math.pow(1 + propertyGrowthRate, year)),
  asx: Math.round(base * Math.pow(1 + asxGrowthRate, year)),
}));

export default function Graph() {
  return (
    <div className="w-full h-96 p-4 bg-white rounded-2x1 shadow">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -5}} />
          <YAxis label={{ value: "Value ($)", angle:-90, position: "insideLeft"}} />
          <Tooltip />
          <Line type="monotone" dataKey="property" stroke="#3b82f6" name="Property ROI" />
          <Line type="asx" dataKey="asx" stroke="#10b981" name="ASX ROI" />
        </LineChart>nn
      </ResponsiveContainer>
    </div>
  );
}
