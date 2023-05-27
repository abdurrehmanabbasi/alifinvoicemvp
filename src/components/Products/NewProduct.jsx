import { useForm } from 'react-hook-form';

const NewProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-xl font-bold mb-4">New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="sku" className="block text-gray-700">
            SKU
          </label>
          <input
            type="text"
            id="sku"
            {...register('sku', { required: 'SKU is required' })}
            className={`border rounded-md px-3 py-2 mt-1 w-full ${
              errors.sku ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.sku && (
            <p className="text-red-500 text-xs mt-1">{errors.sku.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            {...register('productName', { required: 'Product Name is required' })}
            className={`border rounded-md px-3 py-2 mt-1 w-full ${
              errors.productName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.productName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.productName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            {...register('price', { required: 'Price is required' })}
            className={`border rounded-md px-3 py-2 mt-1 w-full ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            {...register('quantity', { required: 'Quantity is required' })}
            className={`border rounded-md px-3 py-2 mt-1 w-full ${
              errors.quantity ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.quantity && (
            <p className="text-red-500 text-xs mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="category"
            {...register('category', { required: 'Category is required' })}
            className={`border rounded-md px-3 py-2 mt-1 w-full ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            {...register('description', { required: 'Description is required' })}
            className={`border rounded-md px-3 py-2 mt-1 w-full ${
              errors.description ? 'border-red-500' : 'border-gray-300'
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
