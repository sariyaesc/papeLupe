// src/components/KPI.jsx
const KPI = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 text-center">
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
  );
};

export default KPI;
