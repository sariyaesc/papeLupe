import React, { useEffect, useState } from "react";
import { Bubble } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, LinearScale, PointElement } from "chart.js";
import { getData } from "../../data/sampleData";

ChartJS.register(Tooltip, Legend, LinearScale, PointElement);

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

const MarginBubble = ({ height = "600px" }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { inventario } = await getData();

      const ganancias = inventario.map(item => item.precio_venta - item.precio_compra);
      const minG = Math.min(...ganancias);
      const maxG = Math.max(...ganancias);

      const minR = 5;
      const maxR = 25;

      const categories = {};
      inventario.forEach(item => {
        const ganancia = item.precio_venta - item.precio_compra;
        const r = minR + ((ganancia - minG) / (maxG - minG)) * (maxR - minR);

        if (!categories[item.categoria]) categories[item.categoria] = [];
        categories[item.categoria].push({
          x: item.precio_compra,
          y: item.precio_venta,
          r,
          producto: item.producto,
          ganancia,
        });
      });

      const datasets = Object.entries(categories).map(([cat, items]) => ({
        label: cat,
        data: items,
        backgroundColor: categoryColors[cat] || "#8884d8",
      }));

      setData({ datasets });
    };

    fetchData();
  }, []);

  if (!data) return <div>Cargando...</div>;

  const options = {
    maintainAspectRatio: false, // esto permite que el chart ocupe todo el contenedor
    plugins: {
      tooltip: {
        callbacks: {
          label: ctx => {
            const p = ctx.raw;
            return `${p.producto}\nPrecio Compra: $${p.x}\nPrecio Venta: $${p.y}\nGanancia: $${p.ganancia}`;
          },
        },
      },
      legend: {
        display: true,
        position: "right", // mover leyenda a la derecha
        labels: {
          usePointStyle: true,
          boxWidth: 12,
          padding: 12,
        },
      },
    },
    scales: {
      x: { title: { display: true, text: "Precio Compra" } },
      y: { title: { display: true, text: "Precio Venta" } },
    },
  };

  return (
    <div
      className="bg-white shadow-md rounded-2xl p-16 w-full"
      style={{ height: height }}
    >
      <h2 className="text-xl font-bold mb-4">Análisis de Márgenes (Bubble Chart)</h2>
      <div className="w-full h-full">
        <Bubble data={data} options={options} />
      </div>
    </div>
  );
};

export default MarginBubble;
