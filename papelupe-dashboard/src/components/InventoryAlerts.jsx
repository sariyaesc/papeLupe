// src/components/InventoryAlerts.jsx
const InventoryAlerts = ({ inventario }) => {
  const lowStock = inventario.filter((item) => item.stock_actual <= item.stock_minimo);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-2">⚠️ Alertas de Inventario</h2>
      {lowStock.length === 0 ? (
        <p className="text-green-600">✅ Todo el inventario está en buen nivel</p>
      ) : (
        <ul className="list-disc list-inside text-red-600">
          {lowStock.map((item, idx) => (
            <li key={idx}>
              {item.producto} ({item.categoria}) → Stock: {item.stock_actual} / Mínimo: {item.stock_minimo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InventoryAlerts;
