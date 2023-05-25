import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../app/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        await setDoc(doc(db,"users",userCredential.user.uid),{businessName:data.businessName})
          .then(() => {
            navigate("/app");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-20 flex flex-col">
      <div className="mt-2 text-center">
        <h2 className="text-3xl">Sign Up</h2>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700" htmlFor="businessName">
          Business Name
        </label>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          type="text"
          id="businessName"
          {...register("businessName", {
            required: "Business Name is required",
          })}
        />
        {errors.businessName && (
          <p className="mt-2 text-red-500">{errors.businessName.message}</p>
        )}
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

      <div className="mb-4">
        <label className="block mb-2 text-gray-700" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="mt-2 text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Sign Up
      </button>
      <p>
        or
        <Link to="/auth" className="underline text-sky-500 text-lg">
          SignIn
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
