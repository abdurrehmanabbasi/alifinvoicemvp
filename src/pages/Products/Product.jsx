import useAuth from "@/hooks/useAuth";
import { updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {TrashIcon} from "@heroicons/react/24/outline"
import Loading from "@/components/Loading"
const Product = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const price = watch("price");
  const description = watch("description");
  useEffect(() => {
      const fetchProduct=async()=> {
      const docSnap = await getDoc(doc(db, `users/${user.uid}/products/${id}`));
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("No Document");
      }
    }
    fetchProduct();
  }, []);
  useEffect(() => {
    function isEdited() {
      setEdit(price !== product?.price || description !== product?.description);
    }
    isEdited();
  }, [price,description]);
  const Update = async (data) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, `users/${user.uid}/products/${id}`), {
        description: data.description,
        price: data.price,
      });
      navigate("..")
    } catch (error) {
      console.log(error);
    }
  };
  const Delete = async () => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, `users/${user.uid}/products/${id}`));
      navigate("..");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!product?<Loading loadingText={"Loading"}/>:loading?<Loading loadingText={"Updating"}/>: 
        <div className="w-full max-w-2xl p-10 text-lg flex flex-col disabled:opacity-40" >
          <div className="mb-4 w-full mt-10">
            <div className="flex mb-4">
          <h2 className="w-3/4 text-2xl font bold">Product Details</h2>
            <button
              className="rounded-md p-3 flex justify-center items-center align-middle bg-red-600 text-white w-1/4 disabled:opacity-40"
              onClick={() => Delete()}
            >
              <TrashIcon className="w-6"/>
              
            </button>

            </div>
            
            <div className="flex mt-4 justify-between w-full">
              <label htmlFor="sku">SKU</label>
              <p>{id}</p>
            </div>
            <div className="flex justify-between w-full">
              <label htmlFor="brandname">Brand Name</label>
              <p>{product.brandName}</p>
            </div>
            <div className="flex justify-between w-full">
              <label htmlFor="productname">Product Name</label>
              <p>{product.productName}</p>
            </div>
            <div className="flex justify-between w-full">
              <label htmlFor="category">Category</label>
              <p>{product.category}</p>
            </div>
            <div className="flex justify-between w-full">
              <label htmlFor="quantity">Quantity</label>
              <p>{product.quantity + product.quantityType}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(Update)}>
            <div className="mb-4 w-full">
              <label htmlFor="price" className="block text-gray-700">
                Price
              </label>
              <input
                type="number"
                id="price"
                defaultValue={product.price}
                {...register("price", { required: "Price is required" })}
                className={`border rounded-md px-3 py-2 mt-1 w-full ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                defaultValue={product.description}
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
              className="bg-slate-900 text-white p-3 rounded-md w-full disabled:opacity-40"
              
              
              disabled={!edit}
            >
              Update
            </button>
          </form>

        </div>
      }
    </>
  );
};

export default Product;
