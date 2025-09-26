import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { getData } from "../../data/sampleData";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const categoryColors = {
  Cuadernos: "#0088FE",
  Escritura: "#00C49F",
  Adhesivos: "#FFBB28",
  Papel: "#FF8042",
  Arte: "#AF19FF",
  Organización: "#FF4444",
  Corte: "#44FF44",
  Medición: "#FF88FF",
  Electrónicos: "#8884d8",
  Mochilas: "#82ca9d",
  Libros: "#ffc658",
};

const CategoryDoughnut = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { ventas } = await getData();
      const grouped = {};
      ventas.forEach((sale) => {
        grouped[sale.categoria] = (grouped[sale.categoria] || 0) + sale.total;
      });
      const total = Object.values(grouped).reduce((a, b) => a + b, 0);

      setData({
        labels: Object.keys(grouped),
        datasets: [
          {
            data: Object.values(grouped),
            backgroundColor: Object.keys(grouped).map(cat => categoryColors[cat] || "#8884d8"),
            hoverOffset: 10,
          },
        ],
        total,
      });
    };
    fetchData();
  }, []);

  if (!data) return <div>Cargando...</div>;

  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const percent = ((value / data.total) * 100).toFixed(1);
            return `${value} artículos (${percent}%)`;
          },
        },
      },
      legend: {
        display: true,
        position: "right",
        align: "start",
        labels: {
          usePointStyle: true,
          boxWidth: 12,
          padding: 10,
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">Ingresos por Categoría (%)</h2>
      <div className="w-full flex-1">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default CategoryDoughnut;
