import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../app/firebase";
import Loading from "@/components/Loading";
import { Link } from "react-router-dom";

const InvoicesTable = () => {
  const [invoices, setInvoices] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    // Fetch invoices from Firestore
    const fetchInvoices = async () => {
      try {
        const invoicesRef = collection(db, `users/${user.uid}/invoices`);
        const snapshot = await getDocs(invoicesRef);
        const invoicesData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setInvoices(invoicesData);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);
  
  console.log(invoices)
  return (
    <div className="w-full">
      {!invoices ? (
        <Loading loadingText={"Loading"} />
      ) : (
        <table className="w-2/3 text-left">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 border-b">Invoice ID</th>
              <th className="py-2 px-4 bg-gray-200 border-b">Customer</th>
              <th className="py-2 px-4 bg-gray-200 border-b">Total</th>
              <th className="py-2 px-4 bg-gray-200 border-b">Invoice Date</th>
              <th className="py-2 px-4 bg-gray-200 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="py-2 px-4 border-b">{invoice.id}</td>
                <td className="py-2 px-4 border-b">{invoice.customerId}</td>
                <td className="py-2 px-4 border-b">{invoice.total}</td>
                <td className="py-2 px-4 border-b">{new Date(invoice.invoiceDate.toDate()).toDateString()}</td>
                <td className="py-2 px-4 border-b">
                  <Link to={`${invoice.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvoicesTable;
