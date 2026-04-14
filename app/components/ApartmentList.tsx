"use client";

import { useApartments } from "@/context/ApartmentsContext";
import ApartmentCard from "./ApartmentCard";
import styles from "@/styles/apartments.module.css";
import { useState } from "react";

export default function ApartmentList() {
  const { apartments } = useApartments();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  // Filtrar apartamentos
  const filteredApartments = apartments.filter((apartment) => {
    const matchesSearch = searchTerm === "" ||
      apartment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apartment.description.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesPrice = true;
    if (priceFilter === "Menos de €1500") {
      matchesPrice = apartment.price < 1500;
    } else if (priceFilter === "€1500 - €2500") {
      matchesPrice = apartment.price >= 1500 && apartment.price <= 2500;
    } else if (priceFilter === "€2500 - €3500") {
      matchesPrice = apartment.price >= 2500 && apartment.price <= 3500;
    } else if (priceFilter === "Más de €3500") {
      matchesPrice = apartment.price > 3500;
    }

    return matchesSearch && matchesPrice;
  });

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.sectionTitle}>🏡 Apartamentos Violeta 🏡</h1>
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className={styles.searchInput}
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="">Filtrar por precio</option>
          <option value="Menos de €1500">Menos de €1500</option>
          <option value="€1500 - €2500">€1500 - €2500</option>
          <option value="€2500 - €3500">€2500 - €3500</option>
          <option value="Más de €3500">Más de €3500</option>
        </select>
      </section>

      {/* Grid de Apartamentos */}
      <section className={styles.gridContainer}>
        <div className={styles.grid}>
          {filteredApartments.map((apartment) => (
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
          <div className={styles.statNumber}>{filteredApartments.length}+</div>
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
