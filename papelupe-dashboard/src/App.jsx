// src/App.jsx
import { useEffect, useState } from "react";
import Header from "./components/Header";
import KPI from "./components/KPI";
import SalesTrend from "./components/charts/SalesTrend";
import CategoryDoughnut from "./components/charts/CategoryDoughnut";
import MarginBubble from "./components/charts/MarginBubble";
import EmployeeComparison from "./components/charts/EmployeeComparison";
import InventoryAlerts from "./components/InventoryAlerts";
import { getData } from "./data/sampleData";

const App = () => {
    const [ventas, setVentas] = useState([]);
    const [inventario, setInventario] = useState([]);

    useEffect(() => {
        getData().then(({ ventas, inventario }) => {
            setVentas(ventas);
            setInventario(inventario);
        });
    }, []);

    const totalVentas = ventas.reduce((sum, v) => sum + (v.total || 0), 0);
    const totalProductos = inventario.length;

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <main className="p-6 flex flex-col gap-6">

                {/* KPIs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <KPI title="Ventas Totales" value={`$${totalVentas.toFixed(2)}`} />
                    <KPI title="Productos" value={totalProductos} />
                    <KPI title="Empleados" value="2" />
                    <KPI title="Categorías" value={[...new Set(ventas.map((v) => v.categoria))].length} />
                </div>

                {/* Primera row: SalesTrend full width */}
                <div className="w-full">
                    <div className="bg-white shadow-md rounded-2xl p-4 h-[400px]">
                        <SalesTrend data={ventas} />
                    </div>
                </div>

                {/* Segunda row: Doughnut, EmployeeComparison, InventoryAlerts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white shadow-md rounded-2xl p-4 h-[520px]">
                        <CategoryDoughnut />
                    </div>

                    <div className="bg-white shadow-md rounded-2xl p-4 h-[520px]">
                        <EmployeeComparison data={ventas} />
                    </div>
                    <div className="bg-white shadow-md rounded-2xl p-4 h-[520px]">
                        <InventoryAlerts inventario={inventario} />
                    </div>
                </div>

                {/* Tercera row: MarginBubble full width */}
                <div className="w-full h-full">
                    <div className="w-full h-[70vh]">
                        <MarginBubble height="100%" />
                    </div>

                </div>

            </main>
        </div>
    );
};

export default App;
