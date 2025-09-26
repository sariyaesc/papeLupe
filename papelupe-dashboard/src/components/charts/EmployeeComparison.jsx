import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getData } from "../../data/sampleData";

const colors = {
  Efectivo: "#8884d8",
  Tarjeta: "#82ca9d",
  Transferencia: "#ffc658",
};

const EmployeeComparison = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then(({ ventas }) => {
      const grouped = {};

      ventas.forEach(sale => {
        const emp = sale.vendedor; // cambie "empleado" a "vendedor" según tu CSV
        const metodo = sale.metodo_pago;
        if (!grouped[emp]) grouped[emp] = {};
        grouped[emp][metodo] = (grouped[emp][metodo] || 0) + sale.total;
      });

      const finalData = Object.keys(grouped).map(emp => ({
        empleado: emp,
        ...grouped[emp]
      }));

      setData(finalData);
    });
  }, []);

  return (
    <div className="bg-white shadow-md rounded-2xl p-4">
      <h2 className="text-xl font-bold mb-4">Ventas por Empleado y Método de Pago</h2>
      <ResponsiveContainer width="100%" height={410}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="empleado" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(colors).map(key => (
            <Bar key={key} dataKey={key} stackId="a" fill={colors[key]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeeComparison;
