import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../app/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "@/components/Loading";

const NewCustomer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await setDoc(doc(db, "users", user.uid, "customers", data.email), {
        fullName: data.fullName,
        email: data.email,
        phoneNo: data.phoneNo,
        address: data.address,
      });
      navigate("..");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm md:max-w-lg">
        <div className="mb-4 w-full">
          <label htmlFor="fullName" className="block text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            {...register("fullName", {
              required: "Full Name is required",
            })}
            className={`border rounded-md px-3 py-2 mt-1 w-full ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
            className={`border rounded-md px-3 py-2 mt-1 w-full ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="phoneNo" className="block text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNo"
            {...register("phoneNo", {
              required: "Phone Number is required",
            })}
            className={`border rounded-md px-3 py-2 mt-1 w-full ${
              errors.phoneNo ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phoneNo && (
            <p className="text-red-500 text-xs mt-1">
              {errors.phoneNo.message}
            </p>
          )}
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="address" className="block text-gray-700">
            Address
          </label>
          <textarea
            id="address"
            {...register("address", {
              required: "Address is required",
            })}
            className={`border rounded-md px-3 py-2 mt-1 w-full ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {loading ? (
          <Loading loadingText="Adding Customer" />
        ) : (
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
        )}
      </form>
    </div>
  );
};

export default NewCustomer;
