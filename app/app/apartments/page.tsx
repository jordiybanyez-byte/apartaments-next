"use client";

import { useApartments } from "../../context/ApartmentsContext";
import Link from "next/link";
import styles from "@/styles/apartments.module.css";

export default function ApartmentsPage() {
  const { apartments } = useApartments();

  return (
    <div className={styles.grid}>
      {apartments.map((apt) => (
        <Link key={apt.id} href={`/apartments/${apt.id}`}>
          <div className={styles.card}>
            <h3>{apt.title}</h3>
            <p>{apt.price}€/mes</p>
          </div>
        </Link>
      ))}
    </div>
  );
}