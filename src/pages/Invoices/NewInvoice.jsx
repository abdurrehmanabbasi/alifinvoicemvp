import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../app/firebase";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const NewInvoice = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [invoiceProducts, setInvoiceProducts] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersRef = collection(db, `users/${user.uid}/customers`);
        const snapshot = await getDocs(customersRef);
        const customersData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCustomers(customersData);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

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

    fetchCustomers();
    fetchProducts();
  }, []);

  const addProductToInvoice = (productId) => {
    const selectedProduct = products.find(
      (product) => product.id === productId
    );
    
    if (selectedProduct && !invoiceProducts.some((p) => p.id === selectedProduct.id)) {
      setInvoiceProducts((prevProducts) => [...prevProducts, selectedProduct]);
      setValue("productId", ""); // Clear the selected product after adding
    }
  };

  const removeProductFromInvoice = (productId) => {
    setInvoiceProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };
  const handlePriceEdit = (event, productId) => {
    const editedPrice = parseFloat(event.target.value);
    setInvoiceProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, price: editedPrice } : product
      )
    );
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // Perform the logic to create a new invoice
      // You can access selected customer and products using data.customerId and invoiceProducts
      // Then, navigate to the appropriate page
      navigate("..");
    } catch (error) {
      console.log(error);
    }
  };
  const calculateSubtotal = (product) => {
    return product.price * product.unit;
  };

  const calculateTotal = () => {
    return invoiceProducts.reduce(
      (total, product) => total + calculateSubtotal(product),
      0
    );
  };
  return (
    <div className="w-full max-w-2xl p-10 text-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="customer" className="block text-gray-700">
            Customer
          </label>
          <select
            id="customer"
            {...register("customerId", { required: "Customer is required" })}
            className={`border rounded-md px-3 py-2 mt-1 w-full ${
              errors.customerId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option value={customer.id} key={customer.id}>
                {customer.fullName}
              </option>
            ))}
          </select>
          {errors.customerId && (
            <p className="text-red-500 text-xs mt-1">
              {errors.customerId.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="product" className="block text-gray-700">
            Products
          </label>
          <select
            id="product"
            {...register("productId")}
            className={`border rounded-md px-3 py-2 mt-1 w-full ${
              errors.productId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option value={product.id} key={product.id}>
                {product.productName}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => addProductToInvoice(watch("productId"))} // Use watch to get the selected productId
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            Add Product
          </button>
        </div>

        <div className="mb-4">
        <label className="block text-gray-700">Invoice Products</label>
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Unit</th>
              <th className="border px-4 py-2">Sub Total</th>
              <th className="border px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {invoiceProducts.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2">{product.productName}</td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) => handlePriceEdit(e, product.id)}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={product.unit}
                    defaultValue={0}
                    onChange={(e) => {
                      const newUnit = parseInt(e.target.value);
                      setInvoiceProducts((prevProducts) =>
                        prevProducts.map((p) =>
                          p.id === product.id ? { ...p, unit: newUnit } : p
                        )
                      );
                    }}
                  />
                </td>
                <td className="border px-4 py-2">{calculateSubtotal(product)?calculateSubtotal(product):0}</td>
                <td className="border px-4 py-2">
                  <button
                    type="button"
                    onClick={() => removeProductFromInvoice(product.id)}
                    className="text-red-600"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}

            <tr>
              <td className="border px-4 py-2 font-bold">Total</td>
              <td className="border px-4 py-2 font-bold"></td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2 font-bold">
                {calculateTotal()}
              </td>
              <td className="border px-4 py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-md w-full disabled:opacity-40"
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default NewInvoice;
