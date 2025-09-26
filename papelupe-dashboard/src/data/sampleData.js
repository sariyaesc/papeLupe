// src/data/sampleData.js
import Papa from "papaparse";
import ventasCSV from "../data/ventas_papeleria.csv";
import inventarioCSV from "../data/inventario_papeleria.csv";

export const loadCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: (results) => resolve(results.data),
      error: (err) => reject(err),
    });
  });
};

export const getData = async () => {
  const ventas = await loadCSV(ventasCSV);
  const inventario = await loadCSV(inventarioCSV);
  return { ventas, inventario };
};
