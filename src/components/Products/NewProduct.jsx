import { useForm } from 'react-hook-form';

const NewProduct = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data); // You can perform new product submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block mb-2 text-gray-700" htmlFor="productName">
          Product Name
        </label>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          type="text"
          id="productName"
          {...register('productName', { required: 'Product Name is required' })}
        />
        {errors.productName && (
          <p className="mt-2 text-red-500">{errors.productName.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700" htmlFor="price">
          Price
        </label>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          type="number"
          id="price"
          {...register('price', { required: 'Price is required' })}
        />
        {errors.price && (
          <p className="mt-2 text-red-500">{errors.price.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700" htmlFor="extra">
          Extra Information
        </label>
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          id="extra"
          {...register('extra')}
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Add Product
      </button>
    </form>
  );
};

export default NewProduct;
