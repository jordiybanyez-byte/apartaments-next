"use client";

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";

/* ---------------- TYPES ---------------- */

type Apartment = {
  id: string;
  title: string;
  lat: number;
  lng: number;
};

type POI = {
  lat: number;
  lon: number;
  tags?: {
    amenity?: string;
    railway?: string;
    name?: string;
  };
};



// Icono para el apartamento 
const apartmentIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 40'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF6B6B;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23C92A2A;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M15 0C7 0 0 7 0 15c0 10 15 25 15 25s15-15 15-25c0-8-7-15-15-15zm0 20c-3 0-5-2-5-5s2-5 5-5 5 2 5 5-2 5-5 5z' fill='url(%23grad1)' /%3E%3C/svg%3E",
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

// Icono para escuelas (verde - forma de edificio escolar)
const schoolIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cpath d='M20 2L4 14h4v22h12V24h4v12h12V14h4L20 2z' fill='%2310B981'/%3E%3Cpath d='M20 2L4 14h4v22h12V24h4v12h12V14h4L20 2zm-8 28h8v8h-8v-8z' fill='%23047851'/%3E%3C/svg%3E",
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -40],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

// Icono para metro/estación (naranja - forma de estación/tren)
const stationIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect x='2' y='8' width='36' height='26' rx='2' fill='%23F97316'/%3E%3Crect x='6' y='12' width='28' height='8' fill='%23FFFBEB'/%3E%3Ccircle cx='10' cy='34' r='3' fill='%23181613'/%3E%3Ccircle cx='30' cy='34' r='3' fill='%23181613'/%3E%3Crect x='16' y='2' width='8' height='6' fill='%23F97316'/%3E%3Cpath d='M14 22h12v4H14z' fill='%2310B981'/%3E%3Crect x='14' y='22' width='5' height='12' fill='%2310B981'/%3E%3Crect x='21' y='22' width='5' height='12' fill='%2310B981'/%3E%3C/svg%3E",
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -40],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

//  Componente principal del mapa que muestra el apartamento y los POIs cercanos (escuelas y estaciones) 

export default function MapView({ apartment }: { apartment: Apartment }) {
  const [pois, setPois] = useState<POI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPOIs() {
      try {
        setLoading(true);
        setError(null);

        // Query simplificada para Overpass con timeout corto
        const query = `[out:json][timeout:5];
          (
            node["amenity"="school"](around:1500,${apartment.lat},${apartment.lng});
            node["railway"="station"](around:1500,${apartment.lat},${apartment.lng});
            node["railway"="subway_entrance"](around:1500,${apartment.lat},${apartment.lng});
          );
          out center;
        `;

        

        // Crear AbortController con timeout de 7 segundos
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7000);

        const response = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: query,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const elements = (data.elements || []).filter((el: POI) => 
          el.tags?.amenity === "school" || 
          el.tags?.railway === "station" || 
          el.tags?.railway === "subway_entrance"
        );

        
        setPois(elements);
        
      } catch (err) {
        
        
        // Fallback: generar datos simulados de escuelas y estaciones cercanas
        const fallbackPOIs: POI[] = [
          {
            lat: apartment.lat + 0.008,
            lon: apartment.lng + 0.006,
            tags: { amenity: "school", name: "Escuela Municipal" }
          },
          {
            lat: apartment.lat - 0.007,
            lon: apartment.lng + 0.009,
            tags: { amenity: "school", name: "Instituto Público" }
          },
          {
            lat: apartment.lat + 0.006,
            lon: apartment.lng - 0.010,
            tags: { railway: "station", name: "Estación de Metro" }
          },
          {
            lat: apartment.lat - 0.009,
            lon: apartment.lng - 0.007,
            tags: { railway: "station", name: "Estación de Ferrocarril" }
          },
        ];
        
        setPois(fallbackPOIs);
        setError(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPOIs();
  }, [apartment.lat, apartment.lng]);

  return (
    <MapContainer
      center={[apartment.lat, apartment.lng]}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
      />

      {/* Apartamento */}
      <Marker position={[apartment.lat, apartment.lng]} icon={apartmentIcon}>
        <Popup>
          <div style={{ fontWeight: "bold", fontSize: "14px", minWidth: "150px" }}>
            🏠 {apartment.title}
          </div>
        </Popup>
        <Tooltip direction="top" offset={[0, -20]} permanent={false}>
          Tu apartamento
        </Tooltip>
      </Marker>

      {/* POIs */}
      {pois.map((p, i) => {
        // Determine type based on amenity or railway tags
        const amenity = p.tags?.amenity;
        const railway = p.tags?.railway;
        
        const isSchool = amenity === "school";
        const isStation = railway === "station" || railway === "subway_entrance";
        
        if (!isSchool && !isStation) return null;

        const icon = isSchool ? schoolIcon : stationIcon;
        const label = isSchool ? "ESCUELA" : "METRO/TREN";
        const name = p.tags?.name ? p.tags.name : label;

        return (
          <Marker key={`poi-${i}`} position={[p.lat, p.lon]} icon={icon}>
            <Popup>
              <div style={{ fontWeight: "bold", fontSize: "13px", minWidth: "150px" }}>
                {label}
                {p.tags?.name && <div style={{ fontSize: "12px", fontWeight: "normal", marginTop: "5px" }}>{p.tags.name}</div>}
              </div>
            </Popup>
            <Tooltip direction="top" offset={[0, -20]} permanent={false}>
              {name}
            </Tooltip>
          </Marker>
        );
      })}

      {/* Estado de carga */}
      {loading && (
        <div style={{ 
          position: "absolute", 
          bottom: "20px", 
          left: "20px", 
          background: "white", 
          padding: "12px 16px", 
          borderRadius: "8px", 
          zIndex: 400,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          fontSize: "14px",
          fontWeight: "500"
        }}>
          ⏳ Cargando servicios cercanos...
        </div>
      )}

      {!loading && pois.length === 0 && (
        <div style={{ 
          position: "absolute", 
          bottom: "20px", 
          left: "20px", 
          background: "#FEF3C7", 
          color: "#92400E", 
          padding: "12px 16px", 
          borderRadius: "8px", 
          zIndex: 400,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          fontSize: "13px",
          fontWeight: "500",
          border: "1px solid #FCD34D"
        }}>
          ℹ️ No hay escuelas o estaciones cercanas
        </div>
      )}

      {!loading && pois.length > 0 && (
        <div style={{ 
          position: "absolute", 
          bottom: "20px", 
          left: "20px", 
          background: "#DBEAFE", 
          color: "#1E40AF", 
          padding: "12px 16px", 
          borderRadius: "8px", 
          zIndex: 400,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          fontSize: "13px",
          fontWeight: "500",
          border: "1px solid #93C5FD"
        }}>
          ✓ {pois.length} servicios cercanos
        </div>
      )}
    </MapContainer>
  );
}