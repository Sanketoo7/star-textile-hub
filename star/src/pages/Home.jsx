import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products as initialProducts } from "../data/products";

export default function Home() {
  const [search, setSearch] = useState("");

  const filtered = initialProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4 text-white">
      
      <h1 className="text-3xl font-bold mb-4 tracking-wide">
        ⭐ STAR Premium Store
      </h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-2 rounded-xl mb-4 border text-black"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

    </div>
  );
}