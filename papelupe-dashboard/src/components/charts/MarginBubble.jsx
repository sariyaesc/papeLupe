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
      try {
        const { inventario } = await getData();
        console.log("Inventario cargado:", inventario);

        if (!inventario || inventario.length === 0) {
          console.warn("⚠️ No hay datos de inventario!");
          return;
        }

        const ganancias = inventario.map(item => item.precio_venta - item.precio_compra);
        const minG = Math.min(...ganancias);
        const maxG = Math.max(...ganancias);
        console.log("Ganancias:", ganancias);
        console.log("Min/Max Ganancia:", minG, maxG);

        const minR = 5;
        const maxR = 25;

        const categories = {};
        inventario.forEach((item, index) => {
          const ganancia = item.precio_venta - item.precio_compra;

          const r = maxG - minG === 0 
            ? (minR + maxR) / 2 
            : minR + ((ganancia - minG) / (maxG - minG)) * (maxR - minR);

          if (!categories[item.categoria]) categories[item.categoria] = [];
          categories[item.categoria].push({
            x: item.precio_compra,
            y: item.precio_venta,
            r,
            producto: item.producto,
            ganancia,
          });

          console.log(
            `Item ${index}: ${item.producto}, Cat: ${item.categoria}, x: ${item.precio_compra}, y: ${item.precio_venta}, r: ${r}`
          );
        });

        const datasets = Object.entries(categories).map(([cat, items]) => ({
          label: cat,
          data: items,
          backgroundColor: categoryColors[cat] || "#8884d8",
        }));

        console.log("Datasets finales:", datasets);
        setData({ datasets });

      } catch (error) {
        console.error("❌ Error cargando datos para Bubble:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <div>Cargando...</div>;

  const options = {
    maintainAspectRatio: false,
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
        position: "right",
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
