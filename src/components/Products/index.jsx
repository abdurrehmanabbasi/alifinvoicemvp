import {doc, getDoc} from "firebase/firestore"
import {db} from "../../app/firebase"
import useAuth from "../../hooks/useAuth"
import { useEffect, useState } from "react"
import NewProduct from "./NewProduct"
const Products = () => {
    

    return ( <div className="flex flex-col p-4">
        <h2 className="text-3xl border-b-4 pb-1 mb-5 ">Product Managment </h2>
        
        <NewProduct/>
    </div> );
}
 
export default Products;