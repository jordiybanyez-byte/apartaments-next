"use client";

import { useApartments } from "@/context/ApartmentsContext";
import ApartmentCard from "./ApartmentCard";
import styles from "@/styles/apartments.module.css";

export default function ApartmentList() {
  const { apartments } = useApartments();

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.sectionTitle}>Apartamentos en Barcelona</h1>
        <p className={styles.sectionSubtitle}>
          Encuentra tu alojamiento ideal en las mejores ubicaciones de la ciudad
        </p>
      </section>

      {/* Search/Filter Section */}
      <section className={styles.searchSection}>
        <input 
          type="text" 
          placeholder="Buscar por barrio o características..." 
          className={styles.searchInput}
        />
        <select className={styles.searchInput}>
          <option>Filtrar por precio</option>
          <option>Menos de $1500</option>
          <option>$1500 - $2500</option>
          <option>$2500 - $3500</option>
          <option>Más de $3500</option>
        </select>
      </section>

      {/* Grid de Apartamentos */}
      <section className={styles.gridContainer}>
        <div className={styles.grid}>
          {apartments.map((apartment) => (
            <ApartmentCard
              key={apartment.id}
              apartment={apartment}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statBox}>
          <div className={styles.statNumber}>{apartments.length}+</div>
          <div className={styles.statLabel}>Apartamentos Disponibles</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statNumber}>100%</div>
          <div className={styles.statLabel}>Verificados</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statNumber}>24/7</div>
          <div className={styles.statLabel}>Soporte al Cliente</div>
        </div>
      </section>
    </div>
  );
}
