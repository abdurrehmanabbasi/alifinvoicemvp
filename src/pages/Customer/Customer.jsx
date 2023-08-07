import useAuth from "@/hooks/useAuth";
import { updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import Loading from "@/components/Loading";

const Customer = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const fullName = watch("fullName");
  const email = watch("email");
  const phoneNo = watch("phoneNo");
  const address = watch("address");

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const docSnap = await getDoc(doc(db, `users/${user.uid}/customers/${id}`));
        if (docSnap.exists()) {
          setCustomer(docSnap.data());
        } else {
          console.log("No Document");
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };
    fetchCustomer();
  }, []);

  useEffect(() => {
    function isEdited() {
      setEdit(
        fullName !== customer?.fullName ||
        email !== customer?.email ||
        phoneNo !== customer?.phoneNo ||
        address !== customer?.address
      );
    }
    isEdited();
  }, [fullName, email, phoneNo, address]);

  const Update = async (data) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, `users/${user.uid}/customers/${id}`), {
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

  const Delete = async () => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, `users/${user.uid}/customers/${id}`));
      navigate("..");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!customer ? (
        <Loading loadingText={"Loading"} />
      ) : loading ? (
        <Loading loadingText={"Updating"} />
      ) : (
        <div className="w-full max-w-2xl p-10 text-lg flex flex-col disabled:opacity-40">
          <div className="mb-4 w-full mt-10">
            <div className="flex mb-4">
              <h2 className="w-3/4 text-2xl font-bold">Customer Details</h2>
              <button
                className="rounded-md p-3 flex justify-center items-center align-middle bg-red-600 text-white w-1/4 disabled:opacity-40"
                onClick={Delete}
              >
                <TrashIcon className="w-6" />
              </button>
            </div>

            <div className="flex mt-4 justify-between w-full">
              <label htmlFor="fullName">Full Name</label>
              <p>{customer.fullName}</p>
            </div>
            <div className="flex justify-between w-full">
              <label htmlFor="email">Email</label>
              <p>{customer.email}</p>
            </div>
            <div className="flex justify-between w-full">
              <label htmlFor="phoneNo">Phone Number</label>
              <p>{customer.phoneNo}</p>
            </div>
            <div className="flex justify-between w-full">
              <label htmlFor="address">Address</label>
              <p>{customer.address}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(Update)}>
            <div className="mb-4 w-full">
              <label htmlFor="fullName" className="block text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                defaultValue={customer.fullName}
                {...register("fullName", { required: "Full Name is required" })}
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
                defaultValue={customer.email}
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
                defaultValue={customer.phoneNo}
                {...register("phoneNo", {
                  required: "Phone Number is required",
                })}
                className={`border rounded-md px-3 py-2 mt-1 w-full ${
                  errors.phoneNo ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phoneNo && (
                <p className="text-red-500 text-xs mt-1">{errors.phoneNo.message}</p>
              )}
            </div>

            <div className="mb-4 w-full">
              <label htmlFor="address" className="block text-gray-700">
                Address
              </label>
              <textarea
                {...register("address", {
                  required: "Address is required",
                })}
                defaultValue={customer.address}
                className={`border rounded-md px-3 py-2 mt-1 w-full ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-slate-900 text-white p-3 rounded-md w-full disabled:opacity-40"
              disabled={!edit}
            >
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Customer;
