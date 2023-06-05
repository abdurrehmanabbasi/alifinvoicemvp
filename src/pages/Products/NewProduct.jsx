import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../app/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "@/components/Loading"
const quantityTypes=["g","kg","pound","ounce","ml","l","ft","cm","m"]
const product_categories=["achar","khajoor","halwa","rewadi"]
const NewProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate=useNavigate()
  const { user} = useAuth();
  const [loading,setLoading]=useState(false)
  const onSubmit = async (data) => {
    let sku = generateSKU(
      data.brandName,
      data.productName,
      data.category,
      data.quantity,
      data.quantityType
    );
    try {
      setLoading(true)
      await setDoc(doc(db, "users", user.uid, "products", sku), {
        "brandName": data.brandName,
        "productName": data.productName,
        "category": data.category,
        "quantity":data.quantity,
        "quantityType":data.quantityType,
        "price": data.price,
        "description": data.description,
      });
      navigate("..")
    } catch (error) {
      console.log(error);
    }
  };

  const generateSKU = (
    brandName,
    productName,
    categoryName,
    quantity,
    quantityType
  ) => {
    // Convert brand name, product name, and category name to uppercase and remove spaces
    const formattedBrandName = brandName
      .toUpperCase()
      .replace(/\s/g, "")
      .substring(0, 3);
    const formattedProductName = productName
      .toUpperCase()
      .replace(/\s/g, "")
      .substring(0, 3);
    const formattedCategoryName = categoryName
      .toUpperCase()
      .replace(/\s/g, "")
      .substring(0, 3);

    // Combine formatted elements to create the SKU
    const sku = `${formattedCategoryName}-${formattedBrandName}-${formattedProductName}-${quantity}${quantityType}`;
    return sku;
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm md:max-w-lg ">
        <div className="flex flex-col md:flex-row gap-x-5">
          <div className="mb-4 w-full">
            <label htmlFor="brandName" className="block text-gray-700">
              Brand Name
            </label>
            <input
              type="text"
              id="brandName"
              {...register("brandName", {
                required: "Brand Name is required",
              })}
              className={`border rounded-md px-3 py-2 mt-1 w-full ${
                errors.brandName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.brandName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.brandName.message}
              </p>
            )}
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="productName" className="block text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              {...register("productName", {
                required: "Product Name is required",
              })}
              className={`border rounded-md px-3 py-2 mt-1 w-full ${
                errors.productName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.productName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.productName.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">
            Category
          </label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            className={`border rounded-md px-3 py-2 mt-1 w-full ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a category</option>
            {product_categories?.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-x-5">
          <div className="mb-4 w-full">
            <label htmlFor="quantity" className="block text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              {...register("quantity", { required: "quantity is required" })}
              className={`border rounded-md px-3 py-2 mt-1 w-full ${
                errors.quantity ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.quantity && (
              <p className="text-red-500 text-xs mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="quantityType" className="block text-gray-700">
              Quantity Type
            </label>
            <select
              id="quantityType"
              {...register("quantityType", {
                required: "quantityType is required",
              })}
              className={`border rounded-md px-3 py-2 mt-1 w-full ${
                errors.quantityType ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a Quantity Type</option>
              {quantityTypes?.map((quantityType) => (
                <option value={quantityType} key={quantityType}>
                  {quantityType}
                </option>
              ))}
            </select>
            {errors.quantityType && (
              <p className="text-red-500 text-xs mt-1">
                {errors.quantityType.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            {...register("price", { required: "Price is required" })}
            className={`border rounded-md px-3 py-2 mt-1 w-full ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>

          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className={`border rounded-md px-3 py-2 mt-1 w-full ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
            {loading?<Loading loadingText="Adding Product"/>:
        <div className="flex h-16 justify-stretch gap-3">
          <Link
            to={".."}
            className="bg-gray-100 flex-1 flex items-center justify-center text-black rounded-md"
          >
            Discard
          </Link>
          <button
            type="submit"
            className="bg-blue-500  flex-1 text-white rounded-md disabled:opacity-40"
          >
            Save
          </button>
        </div>
        }
      </form>
    </div>
  );
};

export default NewProduct;
