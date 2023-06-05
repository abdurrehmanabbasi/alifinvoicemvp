import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { db } from "../../app/firebase";

const Categories = () => {
  const {
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user,userDoc } = useAuth();
  const onSubmit = async (data) => {
    try {
      await setDoc(doc(db,"users",user.uid),{
        product_categories:arrayUnion(...userDoc.product_categories,data.categoryName)
      })
      console.log(userDoc)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-sm flex">
          <input
            type="text"
            id="categoryName"
            {...register("categoryName", {
              required: "* required",
            })}
            className={`border rounded-md px-3 py-2 mt-1 w-full ${
              errors.categoryName ? "border-red-500" : "border-gray-300"
            }`}
          />

        <button
            type="submit"
            className="bg-blue-500 p-2 flex-1 text-white rounded-md w-full"
          >
           Add New
          </button>
        </div>  
        {errors.categoryName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.categoryName.message}
            </p>
          )}
      </form>
      <table className="w-2/3 text-left">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 border-b">Category Name</th>
            <th className="py-2 px-4 bg-gray-200 border-b"></th>

            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {userDoc?.product_categories?.map((product) => (
            <tr key={product}>
              <td className="py-2 px-4 border-b">{product}</td>
              <td className="py-2 px-4 border-b"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
