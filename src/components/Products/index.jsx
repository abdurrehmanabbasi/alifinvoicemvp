// import {doc, getDoc} from "firebase/firestore"
// import {db} from "../../app/firebase"
// import useAuth from "../../hooks/useAuth"
// import { useEffect, useState } from "react"
import { Link, useOutlet } from "react-router-dom";
const Products = () => {
    const outlet=useOutlet()
    
    return ( <div className="flex flex-col p-4">
        <div className=" mb-5">
        <h2 className="text-3xl border-b-4 pb-1 ">Product Managment </h2>
        <Link to="new">New Product</Link>
        </div>
        {outlet||<div>No Outler</div>}
    </div> );
}
 
export default Products;