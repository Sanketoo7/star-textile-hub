import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 hover:scale-105 p-3">
      
      <div className="overflow-hidden rounded-xl">
        <img
          src={product.image}
          className="h-40 w-full object-cover hover:scale-110 transition"
        />
      </div>

      <h2 className="font-semibold mt-2 text-sm">{product.name}</h2>
      <p className="text-gray-500 text-xs">{product.desc}</p>

      <div className="flex justify-between items-center mt-2">
        <span className="font-bold text-lg text-green-600">
          {product.price}
        </span>

        <Link
          to={`/product/${product.id}`}
          className="text-blue-500 font-semibold text-sm"
        >
          View →
        </Link>
      </div>
    </div>
  );
}