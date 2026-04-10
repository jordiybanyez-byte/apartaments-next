import { ReactNode } from "react";
import { ApartmentsProvider } from "../context/ApartmentsContext";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ApartmentsProvider>{children}</ApartmentsProvider>
      </body>
    </html>
  );
}