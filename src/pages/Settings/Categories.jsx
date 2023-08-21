import { useEffect, useState } from "react";
import { db } from "../../app/firebase";
import { useForm, Controller } from "react-hook-form";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const ProductCategories = ({ user }) => {
  const [categories, setCategories] = useState([]);
  const { control, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, `users/${user.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCategories(data?.productCategories || []);
          reset({category:""});
        }
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [reset, user.uid]);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const docRef = doc(db, `users/${user.uid}`);

      const newCategories = [...categories, data.category];
      await updateDoc(docRef, { productCategories: newCategories });
      const updatedDocSnap = await getDoc(docRef);
      if (updatedDocSnap.exists()) {
        const updatedData = updatedDocSnap.data();
        setCategories(updatedData?.productCategories);
        reset({category:""});
      }
      setIsLoading(false); // Mark update as completed
    } catch (error) {
      setError("Error updating data");
      console.error("Error updating data:", error);
    }

    setIsLoading(false);
  };

  const removeCategory = async (category) => {
    setIsLoading(true);

    try {
      const docRef = doc(db, `users/${user.uid}`);

      const newCategories = categories.filter((c) => c !== category);
      await updateDoc(docRef, {
        productCategories: newCategories,
      });
      const updatedDocSnap = await getDoc(docRef);
      if (updatedDocSnap.exists()) {
        const updatedData = updatedDocSnap.data();
        setCategories(updatedData?.productCategories);
        reset({category:""});
        
      }
      setIsLoading(false); // Mark update as completed
    } catch (error) {
      setError("Error removing category");
      console.error("Error removing category:", error);
    }
    reset();
    setIsLoading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Product Categories</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div className="flex items-center">
          <label className="mr-2">Category Name:</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="border border-gray-300 rounded-md p-2"
              />
            )}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2 disabled:bg-gray-400"
          >
            Add Category
          </button>
        </div>
      </form>
      {isLoading ? (
        "Loading..."
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {categories.map((category, index) => (
            <li key={index} className="mb-2 flex items-center">
              <span className="mr-2">{category}</span>
              <button
                onClick={() => removeCategory(category)}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductCategories;
