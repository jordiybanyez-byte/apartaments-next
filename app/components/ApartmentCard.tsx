"use client";

import Link from "next/link";
import styles from "@/styles/apartments.module.css";

type Apartment = {
  id: string;
  title: string;
  price: number;
  lat: number;
  lng: number;
  description: string;
};

type ApartmentCardProps = {
  apartment: Apartment;
};

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
  const emojis = ["🏠", "🏡", "🏢", "🏰", "🏘️", "🏗️", "🏛️", "🏭", "🏬", "🏪", "🏫"];
  const emoji = emojis[parseInt(apartment.id) % emojis.length];

  return (
    <Link href={`/apartments/${apartment.id}`}>
      <div className={styles.card}>
        {/* Image Placeholder */}
        <div className={styles.cardImage}>
          {emoji}
        </div>

        {/* Content */}
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{apartment.title}</h3>
          <p className={styles.cardDescription}>{apartment.description}</p>

          {/* Price Section */}
          <div className={styles.priceSection}>
            <span className={styles.cardPrice}>€{apartment.price}</span>
            <span className={styles.pricePeriod}>/mes</span>
          </div>

          <button className={styles.cardButton}>
            Ver Detalles
          </button>
        </div>
      </div>
    </Link>
  );
}
