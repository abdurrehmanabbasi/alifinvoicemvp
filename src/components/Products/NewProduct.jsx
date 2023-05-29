import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../app/firebase";
import { useNavigate } from "react-router-dom";
const NewProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, userDoc } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    let sku = generateSKU(data.category, data.productName, data.weight);
    try {
      await setDoc(doc(db, "users", user.uid, "products", sku), {
        productName: data.productName,
        price: data.price,
        weight: data.weight,
        category: data.category,
      });
      navigate("/app/products");
    } catch (error) {
      console.log(error);
    }
  };

  const generateSKU = (category, productName, weight) => {
    // Convert category and product name to uppercase and remove spaces
    const formattedCategory = category
      .toUpperCase()
      .replace(/\s/g, "")
      .substring(0, 3);
    const formattedProductName = productName
      .toUpperCase()
      .replace(/\s/g, "")
      .substring(0, 3);
    // Combine formatted elements to create the SKU

    const sku = `${formattedCategory}-${formattedProductName}-${weight}G`;
    return sku;
  };
  return (
    <div className="w-full max-w-sm">
      <h2 className="text-xl font-bold mb-4">New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="mb-4">
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

          <div className="mb-4">
            <label htmlFor="varietyName" className="block text-gray-700">
              Variety Name
            </label>
            <input
              type="text"
              id="varietyName"
              {...register("varietyName", {
                required: "Variety Name is required",
              })}
              className={`border rounded-md px-3 py-2 mt-1 w-full ${
                errors.varietyName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.varietyName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.varietyName.message}
              </p>
            )}
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
              {userDoc?.product_categories.map((category) => (
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

          <div className="mb-4">
          <label htmlFor="weight" className="block text-gray-700">
            Weight(g)
          </label>
          <input
            type="number"
            id="weight"
            {...register("weight", { required: "Weight is required" })}
            className={`border rounded-md px-3 py-2 mt-1 w-full ${
              errors.weight ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.weight && (
            <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>
          )}
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



        

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
