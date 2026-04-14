"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useApartments } from "../../../context/ApartmentsContext";
import MapView from "../../../components/MapView";

export default function ApartmentDetailPage() {
  const { id } = useParams();
  const { apartments } = useApartments();

  const apartment = apartments.find((a) => a.id === id);

  if (!apartment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Apartamento no encontrado</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Volver a la lista
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Volver a lista
          </Link>
          <h1 className="text-4xl font-bold mb-2">{apartment.title}</h1>
          <p className="text-gray-600">{apartment.description}</p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <div className="mb-6">
              <p className="text-gray-600 text-sm font-semibold">PRECIO</p>
              <p className="text-4xl font-bold text-blue-600">€{apartment.price}</p>
              <p className="text-gray-600">/mes</p>
            </div>

            <div className="mb-6 pb-6 border-b">
              <p className="text-gray-600 text-sm font-semibold mb-2">UBICACIÓN</p>
              <p className="text-gray-800">
                Lat: <span className="font-mono">{apartment.lat.toFixed(4)}</span>
              </p>
              <p className="text-gray-800">
                Lng: <span className="font-mono">{apartment.lng.toFixed(4)}</span>
              </p>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold mb-3">
              Contactar
            </button>
            <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-semibold">
              Guardar
            </button>
          </div>
        </div>

        {/* Mapa */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: "500px" }}>
            <MapView apartment={apartment} />
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-xl font-bold mb-4">Información adicional</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-gray-600 text-sm">Tipo</p>
                <p className="font-semibold">Apartamento</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-gray-600 text-sm">Estado</p>
                <p className="font-semibold">Disponible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}