import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../app/firebase";
import Loading from "@/components/Loading.jsx"
import { Link } from "react-router-dom";
const ProductsTable = () => {
  const [products, setProducts] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    // Fetch products from Firestore
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, `users/${user.uid}/products`);
        const snapshot = await getDocs(productsRef);
        const productsData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  console.log(products);
  return (
    <div className="w-full">
      {!products?<Loading loadingText={"Loading"}/>:
      <table className="w-2/3 text-left">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 border-b">SKU</th>
            <th className="py-2 px-4 bg-gray-200 border-b">Brand Name</th>
            <th className="py-2 px-4 bg-gray-200 border-b">Product Name</th>
            <th className="py-2 px-4 bg-gray-200 border-b">Price</th>
            <th className="py-2 px-4 bg-gray-200 border-b">Weight</th>
            <th className="py-2 px-4 bg-gray-200 border-b">Category</th>
            <th className="py-2 px-4 bg-gray-200 border-b"> </th>

            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          { products.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">{product.brandName}</td>
              <td className="py-2 px-4 border-b">{product.productName}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">
                {product.quantity + product.quantityType}
              </td>
              <td className="py-2 px-4 border-b">{product.category}</td>
              <td className="py-2 px-4 border-b">
                <Link to={`${product.id}`}
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
};

export default ProductsTable;
