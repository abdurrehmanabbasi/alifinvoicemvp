import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../app/firebase";
import Loading from "@/components/Loading";
import { Link } from "react-router-dom";

const CustomersTable = () => {
  const [customers, setCustomers] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    // Fetch customers from Firestore
    const fetchCustomers = async () => {
      try {
        const customersRef = collection(db, `users/${user.uid}/customers`);
        const snapshot = await getDocs(customersRef);
        const customersData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCustomers(customersData);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="w-full">
      {!customers ? (
        <Loading loadingText={"Loading"} />
      ) : (
        <table className="w-2/3 text-left">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 border-b">Full Name</th>
              <th className="py-2 px-4 bg-gray-200 border-b">Email</th>
              <th className="py-2 px-4 bg-gray-200 border-b">Phone Number</th>
              <th className="py-2 px-4 bg-gray-200 border-b">Address</th>
              <th className="py-2 px-4 bg-gray-200 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="py-2 px-4 border-b">{customer.fullName}</td>
                <td className="py-2 px-4 border-b">{customer.email}</td>
                <td className="py-2 px-4 border-b">{customer.phoneNo}</td>
                <td className="py-2 px-4 border-b">{customer.address}</td>
                <td className="py-2 px-4 border-b">
                  <Link to={`${customer.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomersTable;
