import { createContext, useEffect, useState } from 'react';
import { auth, createUser, signIn, sendPasswordReset, signOutUser } from '../app/firebaseAuth'; // Assuming you have the Firebase auth functions in a separate file

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for user changes on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Create user with email and password
  const handleCreateUser = async (email, password) => {
    try {
      const newUser = await createUser(email, password);
      setUser(newUser);
    } catch (error) {
      // Handle error
    }
  };

  // Sign in with email and password
  const handleSignIn = async (email, password) => {
    try {
      const signedInUser = await signIn(email, password);
      setUser(signedInUser);
    } catch (error) {
      // Handle error
    }
  };

  // Send password reset email
  const handleSendPasswordReset = async (email) => {
    try {
      await sendPasswordReset(email);
    } catch (error) {
      // Handle error
    }
  };

  // Sign out user
  const handleSignOut = async () => {
    try {
      await signOutUser();
      setUser(null);
    } catch (error) {
      // Handle error
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        createUser: handleCreateUser,
        signIn: handleSignIn,
        sendPasswordReset: handleSendPasswordReset,
        signOut: handleSignOut,
      }}
    >
      {loading?<div>loading...</div>:children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
