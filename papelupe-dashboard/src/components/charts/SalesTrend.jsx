// src/components/charts/SalesTrend.jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const SalesTrend = ({ data }) => {
  const dailySales = data.reduce((acc, venta) => {
    const fecha = venta.fecha;
    acc[fecha] = (acc[fecha] || 0) + venta.total;
    return acc;
  }, {});

  const chartData = Object.keys(dailySales).map((fecha) => ({
    fecha,
    ventas: dailySales[fecha],
  }));

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-2">📈 Tendencia de Ventas</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="ventas" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesTrend;
