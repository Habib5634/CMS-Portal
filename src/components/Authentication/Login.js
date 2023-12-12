import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role is student

const navigate = useNavigate()
const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Retrieve the user's role from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const userRole = userData.role.toLowerCase(); // Normalize role to lowercase for comparison

        // Check if the user has a valid role to log in
        if (userRole === role) {
          console.log('User logged in:', user);
          toast.success('Login Successful');
          navigate('/');

        } else {
          console.log('User does not have a valid role to log in.');
          toast.warning('Role Not Match');
          // Optionally, you can redirect to a different page or show an error message
        }
      } else {
        console.log('User document does not exist in Firestore.');
        toast.warning('User is not registered with this email');
        // Handle the case where the user document does not exist
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      toast.error('Something went wrong');
      navigate('/login');
    }
  };

  return (
    <div className='bg-gradient-to-b from-emerald-500 to-blue-800 flex items-center justify-center min-h-screen pt-4 px-4 pb-10 text-center sm:block sm:p-0  h-screen w-full '>
      
      <form onSubmit={handleLogin} className='inline-block p-4 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full '>
      <h2 className='text-center text-2xl font-bold mb-5 text-gradient-to-b from-emerald-500 to-blue-800'>Login</h2>

      <div className='flex justify-center items-center mb-4'>
          <label className='font-bold text-center w-1/3'>Role:</label>
          <div className='flex items-center space-x-4'>
            <label>
              <input
                type='radio'
                value='student'
                checked={role === 'student'}
                onChange={() => setRole('student')}
              />
              Student
            </label>
            <label>
              <input
                type='radio'
                value='teacher'
                checked={role === 'teacher'}
                onChange={() => setRole('teacher')}
              />
              Teacher
            </label>
          </div>
        </div>

        <div className='flex justify-center items-center mb-4'>
        <label className='font-bold   text-center    w-1/3   '>
          Email: 
        </label>
        <input 
        type="email"
        placeholder='Enter Your Email Address'
         value={email}
         className='border pl-2 py-1 border-black w-2/3 rounded-md'
          onChange={(e) => setEmail(e.target.value)}
           required />
        </div>
     <div className='flex justify-center items-center'>
        <label className='font-bold   text-center    w-1/3   '>
          Password:
        </label>
        <input 
        type="password"
        placeholder='Enter Your Password'
        value={password} 
        className='border pl-2 py-1 border-black w-2/3 rounded-md'
        onChange={(e) => setPassword(e.target.value)} 
        required />

        </div>
       <div className='flex justify-center mt-4 gap-4 '>
        <button className='bg-gradient-to-b from-emerald-500 to-blue-800 rounded-full text-white font-bold px-6 flex justify-center py-2' type="submit">Login</button>
        <button className='flex items-center'>Not a User! <Link to='/signup'><span className='text-blue-500 ml-1'>Signup</span></Link></button>
        </div>
      </form>
    </div>
  );
};

export default Login;