"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useApartments } from "../../context/ApartmentsContext";
import styles from "@/styles/detail.module.css";

// Dynamic import to avoid SSR issues with Leaflet
const MapView = dynamic(() => import("../../components/MapView"), {
  ssr: false,
  loading: () => <div className={styles.mapLoading}>Cargando mapa...</div>
});

export default function ApartmentDetailPage() {
  const { id } = useParams();
  const { apartments } = useApartments();

  const apartment = apartments.find((a) => a.id === id);

  if (!apartment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-xl text-red-700 mb-8">Apartamento no encontrado</p>
        <Link
          href="/"
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          ← Volver a la lista
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.detailContainer}>
      {/* Header Hero */}
      <div className={styles.detailHeader}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Link href="/" className={styles.backButton}>
            <span>←</span> Volver a lista
          </Link>
          <div>
            <h1 className={styles.headerTitle}>{apartment.title}</h1>
            <p className={styles.headerDescription}>{apartment.description}</p>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", paddingBottom: "60px" }}>
        <div className={styles.contentGrid}>
          {/* Panel Lateral - Información */}
          <div>
            {/* Card Precio */}
            <div className={`${styles.card} ${styles.cardBorderTop} ${styles.cardBorderBlue} ${styles.priceCard}`}>
              <span className={styles.priceLabel}>Precio mensual</span>
              <div>
                <span className={styles.priceValue}>€{apartment.price}</span>
                <span className={styles.priceUnit}>/mes</span>
              </div>
              <p className={styles.availableText}>Disponible inmediatamente</p>
            </div>

            {/* Card Ubicación */}
            <div className={`${styles.card} ${styles.cardBorderTop} ${styles.cardBorderPurple}`} style={{ marginTop: "24px" }}>
              <h3 className={styles.locationLabel}>
                <span>📍</span> Ubicación GPS
              </h3>
              <div className={styles.coordBox}>
                <span className={styles.coordLabel}>Latitud</span>
                <p className={styles.coordValue}>
                  {apartment.lat.toFixed(4)}
                </p>
              </div>
              <div className={styles.coordBox}>
                <span className={styles.coordLabel}>Longitud</span>
                <p className={styles.coordValue}>
                  {apartment.lng.toFixed(4)}
                </p>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className={styles.buttonGroup}>
              <button className={`${styles.btn} ${styles.btnPrimary}`}>
                ✉️ Contactar
              </button>
              <button className={`${styles.btn} ${styles.btnSecondary}`}>
                ❤️ Guardar
              </button>
            </div>
          </div>

          {/* Panel Principal - Mapa e Información */}
          <div>
            {/* Mapa */}
            <div className={`${styles.card} ${styles.mapCard}`} style={{ padding: 0, overflow: "hidden" }}>
              <div className={styles.mapContainer}>
                <MapView apartment={apartment} />
              </div>
              <div className={styles.mapInfo}>
                <div className={styles.serviceItem}>
                  <span className={styles.serviceIcon}>🏫</span>
                  <span>Escuelas a 1km</span>
                </div>
                <div className={styles.serviceItem}>
                  <span className={styles.serviceIcon}>🚇</span>
                  <span>Metro a 1.5km</span>
                </div>
              </div>
            </div>

            {/* Características */}
            <div className={`${styles.card} ${styles.featuresCard}`} style={{ marginTop: "24px" }}>
              <h2 className={styles.featuresTitle}>✨ Características</h2>
              <div className={styles.featuresGrid}>
                <div className={`${styles.featureBox} ${styles.featureBlue}`}>
                  <span className={styles.featureLabel}>Tipo</span>
                  <p className={styles.featureValue}>Apartamento</p>
                </div>
                <div className={`${styles.featureBox} ${styles.featureGreen}`}>
                  <span className={styles.featureLabel}>Estado</span>
                  <p className={styles.featureValue}>Disponible</p>
                </div>
                <div className={`${styles.featureBox} ${styles.featurePurple}`}>
                  <span className={styles.featureLabel}>Zona</span>
                  <p className={styles.featureValue}>Centro</p>
                </div>
                <div className={`${styles.featureBox} ${styles.featurePink}`}>
                  <span className={styles.featureLabel}>Acceso</span>
                  <p className={styles.featureValue}>Inmediato</p>
                </div>
              </div>
            </div>

            {/* Detalles Adicionales */}
            <div className={`${styles.card} ${styles.infoCard}`} style={{ marginTop: "24px" }}>
              <h3 className={styles.infoTitle}>📋 Información Completa</h3>
              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <span className={styles.infoCheck}>✓</span>
                  <span>WiFi de alta velocidad incluido</span>
                </li>
                <li className={styles.infoItem}>
                  <span className={styles.infoCheck}>✓</span>
                  <span>Servicio de limpieza semanal</span>
                </li>
                <li className={styles.infoItem}>
                  <span className={styles.infoCheck}>✓</span>
                  <span>Zona común con coworking</span>
                </li>
                <li className={styles.infoItem}>
                  <span className={styles.infoCheck}>✓</span>
                  <span>Acceso 24/7 con seguridad</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
