import { useState, useEffect } from "react";
import { addDoc, collection, getDocs, } from "firebase/firestore";
import { db } from "../../app/firebase";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { TrashIcon } from "@heroicons/react/24/outline";

const NewInvoice = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
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
          unit: 0, // Initialize unit with a default value

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

    if (
      selectedProduct &&
      !invoiceProducts.some((p) => p.id === selectedProduct.id)
    ) {
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

      const invoiceData = {
        customerId: data.customerId,
        products: invoiceProducts.map((product) => ({
          productId: product.id,
          productName: product.productName,
          price: product.price,
          unit: product.unit,
          subtotal: calculateSubtotal(product),
        })),
        total: calculateTotal(),
        invoiceDate: data.invoiceDate, // Add the selected date
      };
      await addDoc(collection(db,`users/${user.uid}/invoices`),invoiceData)
      navigate("..");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
    <div className="w-full max-w-5xl p-10 text-lg">
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
          <label htmlFor="invoiceDate" className="block text-gray-700">
            Invoice Date
          </label>
          <Controller
            name="invoiceDate"
            control={control}
            rules={{required:true}}
            render={({ field }) => (
              <DatePicker
                selected={field.value ||null}
                onChange={field.onChange}
                className={`border rounded-md px-3 py-2 mt-1 w-full ${
                  errors.invoiceDate ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
          />
          {errors.invoiceDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.invoiceDate.message}
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
                <tr key={product.id} className="w-full">
                  <td className="border  text-center">
                    {product.productName}
                  </td>
                  <td className="border">
                    <input
                      type="number"
                      className="w-full p-2 outline-none "
                      value={product.price}
                      onChange={(e) => handlePriceEdit(e, product.id)}
                    />
                  </td>
                  <td className="border">
                    <input
                      type="number"
                      value={product.unit}
                      min={0}
                      className="w-full p-2 outline-none"
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
                  <td className="border text-right p-2">
                    {calculateSubtotal(product)||0}
                  </td>
                  <td className=" border text-right">
                    <button
                      type="button"
                      onClick={() => removeProductFromInvoice(product.id)}
                      className="text-red-600 m-2"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}

              <tr>
                <td className="border p-2 font-bold text-center">Total</td>
                <td className="border p-2 font-bold"></td>
                <td className="border p-2"></td>
                <td className="border p-2 font-bold text-right">
                  {calculateTotal() || 0}
                </td>
                <td className="border px-4 py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
        {loading?<Loading loadingText={"Creating New Invoice"}/> :
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-md w-full disabled:opacity-40"
        >
          Create Invoice
        </button>}
      </form>
    </div>
  );
};

export default NewInvoice;
