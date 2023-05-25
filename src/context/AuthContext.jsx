import { createContext, useEffect, useState } from 'react';
import {auth} from "../app/firebase"
import { onAuthStateChanged } from 'firebase/auth';
// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for user changes on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);



  return (
    <AuthContext.Provider
      value={{
        user
      }}
    >
      {loading?<div>loading...</div>:children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
