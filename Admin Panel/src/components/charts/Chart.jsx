import "./chart.css";
import {
  LineChart,
  XAxis,
  Line,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
export default function Chart({ title, data, dataKey, grid }) {
  return (
    <div className="charts">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis interval="preserveStartEnd" dataKey="month" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5  5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
