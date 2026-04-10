import Link from "next/link";
import ApartmentList from "./components/ApartmentList";

export default function Home() {
  return (
    <main className="flex-1">
      <ApartmentList />
    </main>
  );
}
