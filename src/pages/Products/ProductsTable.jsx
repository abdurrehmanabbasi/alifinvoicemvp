import { useEffect, useState } from 'react';
import useAuth from "../../hooks/useAuth"
import {  collection, getDocs } from 'firebase/firestore';
import {db} from "../../app/firebase"
const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const {user}=useAuth()
  useEffect(() => {
    // Fetch products from Firestore
    const fetchProducts = async () => {
      try {
       const productsRef = collection(db, `users/${user.uid}/products`);
          const snapshot = await getDocs(productsRef);
          const productsData = snapshot.docs.map((doc) => ({...doc.data(),id:doc.id}));
          setProducts(productsData);
          
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  console.log(products)
  return (
    <div>
      <table className="w-2/3 text-left">
        <thead>
          <tr>
          <th className="py-2 px-4 bg-gray-200 border-b">SKU</th>
            <th className="py-2 px-4 bg-gray-200 border-b">Name</th>
            <th className="py-2 px-4 bg-gray-200 border-b">Price</th>
            <th className="py-2 px-4 bg-gray-200 border-b">Weight</th>
            <th className="py-2 px-4 bg-gray-200 border-b">Category</th>
            <th className="py-2 px-4 bg-gray-200 border-b"> Option</th>

            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">{product.productName}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">{product.weight+"G"}</td>
              <td className="py-2 px-4 border-b">{product.category}</td>
              <td className="py-2 px-4 border-b">CRUD</td>

              {/* Add more cells/columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
