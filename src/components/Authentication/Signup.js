import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone,setPhone] = useState('')
  const [city,setCity] = useState('')
  const [address,setAddress] = useState('')
  const [country,setCountry] = useState('')
  const [role, setRole] = useState('student'); // Default role is student
 
  const [] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();
  
    let navigateToLogin;
  
    try {
      console.log('Before navigation');
      navigateToLogin = navigate;
  
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Check if the user document exists in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (!userDocSnapshot.exists()) {
        // If the user document doesn't exist, create it
        await setDoc(userDocRef, {
          username,
          phone,
          city,
          address,
          country,
          role,
        });
      }
      toast.success('Registeration Successful! Please Login to continue');
  
      console.log('User signed up:', user);
    } catch (error) {
      console.error('Error signing up:', error.message);
      toast.error('Something went wrong went registering your account');
      navigateToLogin('/signup');
    }
  
    if (navigateToLogin) {
      navigateToLogin('/login', { replace: true });
      console.log('After navigation');
    }
  };


  return (
    <div className='bg-gradient-to-b from-emerald-500 to-blue-800 flex items-center justify-center min-h-screen pt-4 px-4 pb-10 text-center sm:block sm:p-0  h-screen w-full '>
      <form onSubmit={handleSignup} className='inline-block p-4 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full '>
      <h2 className='text-center text-2xl font-bold mb-5 text-gradient-to-b from-emerald-500 to-blue-800'>Signup</h2>

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
          Username:
        </label>
        <input 
        type="text" 
        placeholder='Enter Your User Name'
        value={username} 
        className='border pl-2 py-1 border-black w-2/3 rounded-md'

        onChange={(e) => setUsername(e.target.value)} 
        required />

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
      <div className='flex justify-center items-center mb-4'>
       
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

        <div className='flex justify-center items-center mb-4'>
       
       <label className='font-bold   text-center    w-1/3   '>
         Phone:
         
       </label>
       <input 
         type="number"
         placeholder='Enter Your Phone Number'  
         value={phone} 
       className='border pl-2 py-1 border-black w-2/3 rounded-md'
         onChange={(e) => setPhone(e.target.value)} 
         required />
       </div>
       <div className='flex justify-center items-center mb-4'>
       
       <label className='font-bold   text-center    w-1/3   '>
         City:
         
       </label>
       <input 
         type="text"
         placeholder='Enter Your City'  
         value={city} 
       className='border pl-2 py-1 border-black w-2/3 rounded-md'
         onChange={(e) => setCity(e.target.value)} 
         required />
       </div>
       <div className='flex justify-center items-center mb-4'>
       
       <label className='font-bold   text-center    w-1/3   '>
         Address:
         
       </label>
       <input 
         type="text"
         placeholder='Enter Your Address'  
         value={address} 
       className='border pl-2 py-1 border-black w-2/3 rounded-md'
         onChange={(e) => setAddress(e.target.value)} 
         required />
       </div>
       <div className='flex justify-center items-center mb-4'>
       
       <label className='font-bold   text-center    w-1/3   '>
         Country:
         
       </label>
       <input 
         type="text"
         placeholder='Enter Your Country'  
         value={country} 
       className='border pl-2 py-1 border-black w-2/3 rounded-md'
         onChange={(e) => setCountry(e.target.value)} 
         required />
       </div>

        
        <div className='flex justify-center mt-4 gap-4 '>
                    <button className='bg-gradient-to-b from-emerald-500 to-blue-800 rounded-full text-white font-bold px-6 flex justify-center py-2' type="submit">Sign Up</button>
                    <button className='flex items-center'>Already Registered! <Link to='/login'><span className='text-blue-500 ml-1'>Login</span></Link></button>
                    </div>
      </form>
    </div>
  );
};

export default Signup;
