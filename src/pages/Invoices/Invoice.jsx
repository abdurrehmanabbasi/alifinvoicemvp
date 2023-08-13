import useAuth from "@/hooks/useAuth";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import Loading from "@/components/Loading";

const Invoice = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const docSnap = await getDoc(doc(db, `users/${user.uid}/invoices/${id}`));
        if (docSnap.exists()) {
          setInvoice(docSnap.data());
        } else {
          console.log("No Document");
        }
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };
    fetchInvoice();
  }, []);


  const Delete = async () => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, `users/${user.uid}/invoices/${id}`));
      navigate("..");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!invoice ? (
        <Loading loadingText={"Loading"} />
      ) : loading ? (
        <Loading loadingText={"Updating"} />
      ) : (
        <div className="w-full max-w-2xl p-10 text-lg flex flex-col disabled:opacity-40">
          <div className="mb-4 w-full mt-10">
            <div className="flex mb-4">
              <h2 className="w-3/4 text-2xl font-bold">Invoice Details</h2>
              <button
                className="rounded-md p-3 flex justify-center items-center align-middle bg-red-600 text-white w-1/4 disabled:opacity-40"
                onClick={Delete}
              >
                <TrashIcon className="w-6" />
              </button>
            </div>

            <div className="flex mt-4 justify-between w-full">
              <label htmlFor="customerId">Customer</label>
              <p>{invoice.customerId}</p>
            </div>
            <div className="flex justify-between w-full">
              <label htmlFor="total">Total</label>
              <p>{invoice.total}</p>
            </div>
            <div className="flex justify-between w-full">
              <label htmlFor="invoiceDate">Invoice Date</label>
              <p>{new Date(invoice.invoiceDate.toDate()).toDateString()}</p>
            </div>
            

            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-200 border-b">Product Name</th>
                  <th className="py-2 px-4 bg-gray-200 border-b">Price</th>
                  <th className="py-2 px-4 bg-gray-200 border-b">Unit</th>
                  <th className="py-2 px-4 bg-gray-200 border-b">Sub Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.products.map((product, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{product.productName}</td>
                    <td className="py-2 px-4 border-b">{product.price}</td>
                    <td className="py-2 px-4 border-b">{product.unit}</td>
                    <td className="py-2 px-4 border-b">{product.subtotal}</td>
                  </tr>
                ))}
                <tr>
                    <td className="font-bold text-center">Total</td>
                    <td></td>
                    <td></td>
                    <td className="font-bold">{invoice.total}</td>
                </tr>
              </tbody>
            </table>

          </div>

        </div>
      )}
    </>
  );
};

export default Invoice;
