"use client";

import { useApartments } from "@/context/ApartmentsContext";
import MapView from "./MapView";
import styles from "@/app/styles/apartments.module.css";

export default function ApartmentDetail() {
  const { selected, setSelected } = useApartments();

  if (!selected) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b flex justify-between items-center p-6">
          <h1 className="text-2xl font-bold">{selected.title}</h1>
          <button
            onClick={() => setSelected(null)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6">
          {/* Información básica */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Precio</p>
              <p className="text-3xl font-bold text-blue-600">€{selected.price}/mes</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Ubicación</p>
              <p className="text-lg">Lat: {selected.lat}, Lng: {selected.lng}</p>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <p className="text-gray-600 text-sm mb-2">Descripción</p>
            <p className="text-gray-800">{selected.description}</p>
          </div>

          {/* Mapa */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Ubicación en el mapa</h2>
            <div className="rounded-lg overflow-hidden border border-gray-300" style={{ height: "400px" }}>
              <MapView apartment={selected} />
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              onClick={() => setSelected(null)}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium"
            >
              Cerrar
            </button>
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Contactar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
