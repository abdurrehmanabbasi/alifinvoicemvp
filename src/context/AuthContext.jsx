import { createContext, useEffect, useState } from "react";
import { auth, db } from "../app/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc,getDoc } from "firebase/firestore";
// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDoc,setUserDoc]=useState(null)
  const [loading, setLoading] = useState(true);

  // Listen for user changes on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDoc(docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          setUserDoc(null)
        }
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userDoc
      }}
    >
      {loading ? <div>loading...</div> : children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
