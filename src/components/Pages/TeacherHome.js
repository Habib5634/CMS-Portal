import React, { useEffect, useState } from 'react';

import { getDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const Home = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userDataFromFirestore = userDocSnapshot.data();
          setUserData(userDataFromFirestore);
        }
      }
    };

    fetchUserData();
  }, [user]);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logout Successful');
      // You can perform additional actions after logout if needed
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };


  return (
    <div className='bg-gradient-to-b from-emerald-500 to-blue-800 flex items-center justify-center min-h-screen pt-4 px-4 pb-10 text-center sm:block sm:p-0 h-screen w-full '>
      <h2>Welcome to the Home Page</h2>
      {user && userData && (
        <div>
          <p>Email: {user.email}</p>
          <p>Role: {userData.role}</p>
          {/* Add other user data fields as needed */}
        </div>
      )}

<button onClick={handleLogout} className='bg-gradient-to-b from-emerald-500 to-blue-800 rounded-full text-white font-bold px-6 flex justify-center py-2'>
            Logout
          </button>
    </div>
  );
};

export default Home;
