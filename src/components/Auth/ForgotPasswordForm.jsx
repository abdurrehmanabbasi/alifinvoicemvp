import { useForm } from 'react-hook-form';

const ForgotPasswordForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data); // You can perform forgot password logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-20 flex flex-col">
      <div className="mt-2 text-center">
        <h2 className="text-3xl">
          Forgot Password
        </h2>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && (
          <p className="mt-2 text-red-500">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Reset Password
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
