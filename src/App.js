import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Login from './components/Authentication/Login';
import SignUp from './components/Authentication/Signup';
import { useAuthState } from 'react-firebase-hooks/auth';
import Home from './components/Pages/Home'
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const [user, loading] = useAuthState(auth);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (!authChecked || loading) {
    // Loading state while checking authentication status
    return <div>Loading...</div>;
  }

  return (
    <>

    <ToastContainer />
    <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Home />
            ) : (
              <Navigate
                replace
                to="/login"
                state={{
                  from: '/',
                }}
              />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      </>
  );
}

export default App;
