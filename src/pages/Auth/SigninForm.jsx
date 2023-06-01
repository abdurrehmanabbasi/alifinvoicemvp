import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../app/firebase";
const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        navigate("/app");
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" mx-20 flex flex-col">
      <div className="mt-2 text-center">
        <h2 className="text-3xl">Sign In</h2>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="mt-2 text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700" htmlFor="password">
          Password
        </label>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          type="password"
          id="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="mt-2 text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-4 text-right">
        <Link className="text-blue-500 hover:underline" to="forgot-password">
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Log In
      </button>
      <div className="mt-2 text-center">
        <p>
          or
          <Link to="signup" className="underline text-sky-500 text-lg">
            Signup
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SigninForm;
