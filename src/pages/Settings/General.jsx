import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from "../../app/firebase";
import useAuth from "../../hooks/useAuth";

const General = () => {
  const { control, handleSubmit, formState, reset } = useForm();
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const { user } = useAuth();

  useEffect(() => {
    // Fetch initial data from Firestore based on the UID
    const fetchData = async () => {
      try {
        const docRef = doc(db, `users/${user.uid}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setInitialData(data);
          reset(data);
        }
        setIsLoading(false); // Mark data as loaded
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user.uid, reset]);

  const onSubmit = async (data) => {
    try {
        setIsLoading(true); // Show loading when updating

        // Update data in Firestore
        const docRef = doc(db, `users/${user.uid}`);
        await updateDoc(docRef, data);
  
        // Fetch the updated data after the update operation is completed
        const updatedDocSnap = await getDoc(docRef);
        if (updatedDocSnap.exists()) {
          const updatedData = updatedDocSnap.data();
          setInitialData(updatedData);
          reset(updatedData);
        }
        setIsLoading(false); // Mark update as completed
        
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Business Name</label>
            <Controller
              name="businessName"
              control={control}
              defaultValue={initialData?.businessName || ''}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`w-full p-2 border ${
                    formState.errors.businessName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              )}
            />
            {formState.errors.businessName && (
              <p className="text-red-500 mt-1">Business Name is required.</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <Controller
              name="phone"
              control={control}
              defaultValue={initialData?.phone || ''}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`w-full p-2 border ${
                    formState.errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              )}
            />
            {formState.errors.phone && (
              <p className="text-red-500 mt-1">Phone number must be 10 digits.</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <Controller
              name="address"
              control={control}
              defaultValue={initialData?.address || ''}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full p-2 border border-gray-300"
                />
              )}
            />
          </div>
          <button
            type="submit"
            disabled={!formState.isDirty}
            className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
          >
            Update
          </button>
        </>
      )}
    </form>
  );
};

export default General;
