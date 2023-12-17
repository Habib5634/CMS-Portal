import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Login from './components/Authentication/Login';
import SignUp from './components/Authentication/Signup';
import { useAuthState } from 'react-firebase-hooks/auth';
import TeacherHome from './components/Pages/TeacherHome'
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from './components/Loading/Loading';
import StudentHome from './components/Pages/StudentHome';
import QuizPage from './components/Pages/QuizPage.js/QuizPage';
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
    return <Loading/>;
  }

  return (
    <>

    <ToastContainer />
    <Routes>
        <Route
          path="/teacher"
          element={
            user ? (
              <TeacherHome />
            ) : (
              <Navigate
                replace
                to="/login"
                state={{
                  from: '/teacher',
                }}
              />
            )
          }
        />
         <Route
          path="/student"
          element={
            user ? (
              <StudentHome />
            ) : (
              <Navigate
                replace
                to="/login"
                state={{
                  from: '/student',
                }}
              />
            )
          }
        />
        <Route
          path="/student/courses/:id"
          element={
            user ? (
              <QuizPage/>
            ) : (
              <Navigate
                replace
                to="/login"
                state={{
                  from: '/student/courses',
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
