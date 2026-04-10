import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <h1>🏡 Apartments Barcelona</h1>
      <Link href="/apartments">Ver apartamentos</Link>
    </main>
  );
}