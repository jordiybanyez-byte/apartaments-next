"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { apartmentsMock } from "../data/apartments";

// 1. Tipos
type Apartment = {
  id: string;
  title: string;
  price: number;
  lat: number;
  lng: number;
  description: string;
};

type ApartmentsContextType = {
  apartments: Apartment[];
  selected: Apartment | null;
  setSelected: (apt: Apartment | null) => void;
};

// 2. Context bien tipado (IMPORTANTE)
const ApartmentsContext = createContext<ApartmentsContextType | undefined>(undefined);

// 3. Provider con children tipado
export function ApartmentsProvider({ children }: { children: ReactNode }) {
  const [apartments] = useState<Apartment[]>(apartmentsMock);
  const [selected, setSelected] = useState<Apartment | null>(null);

  return (
    <ApartmentsContext.Provider value={{ apartments, selected, setSelected }}>
      {children}
    </ApartmentsContext.Provider>
  );
}

// 4. Hook seguro
export function useApartments() {
  const context = useContext(ApartmentsContext);

  if (!context) {
    throw new Error("useApartments must be used inside ApartmentsProvider");
  }

  return context;
}