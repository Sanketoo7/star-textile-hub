import { useState } from "react";

export default function Admin() {
  const [name, setName] = useState("");

  const addProduct = () => {
    const existing = JSON.parse(localStorage.getItem("products")) || [];

    const newProduct = {
      id: Date.now(),
      name,
      price: "₹999",
      image: "https://via.placeholder.com/150",
      desc: "New product",
    };

    localStorage.setItem("products", JSON.stringify([...existing, newProduct]));
    alert("Product added!");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-3">Admin Panel</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Product Name"
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={addProduct}
        className="bg-black text-white p-2 rounded"
      >
        Add Product
      </button>
    </div>
  );
}