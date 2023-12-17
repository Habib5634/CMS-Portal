import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
import { AiFillEye, AiFillEyeInvisible, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import TextInput from '../Inputs/TextInput';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role is student
  const [loading, setLoading] = useState(false);
  const [isPasswordHidden, setPasswordHidden] = useState(true);
const navigate = useNavigate()
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
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

        // Update the destination path based on the user's role
        const destinationPath = userRole === 'student' ? '/student' : '/teacher';
        navigate(destinationPath);
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
  } finally {
    setLoading(false);
  }
};

  return (
    <>
    {loading ? (<Loading/>) : (
    <div className="relative h-screen flex justify-center items-center">
    <div className="absolute  top-0 left-0 right-0 bottom-0 bg-cover bg-center  " style={{ backgroundImage: 'url("https://images.unsplash.com/uploads/1412026095116d2b0c90e/3bf33993?q=80&w=1767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black overflow-y-auto bg-opacity-70  backdrop-blur-md flex justify-center items-center">
      <div className='inline-block justify-center  p-8 align-bottom overflow-y-auto bg-green-950 bg-opacity-40 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full '>
      
      <form onSubmit={handleLogin} >
      <h2 className=' text-3xl font-bold  pt-1 text-emerald-500 to-blue-800'>Login</h2>
      <p className='text-lg text-gray-300 mb-5'>Welcome to our CMS System</p>

      {/* Role */}
      <div className=' flex w-full gap-4'>
         
          <div className='flex items-center space-x-4'>
            <label className='flex items-center text-emerald-500'>
              <input
                type='radio'
                value='student'
                className='bg-emerald-500 mr-1'
                checked={role === 'student'}
                onChange={() => setRole('student')}
              />
              Student
            </label>
            <label className='flex items-center text-emerald-500'>
              <input
                type='radio'
                value='teacher'
                className='bg-emerald-500 mr-1'
                checked={role === 'teacher'}
                onChange={() => setRole('teacher')}
              />
              Teacher
            </label>
          </div>
        </div>

        <div className='flex flex-col w-full gap-4'>
      <TextInput
        type="email"
      label="Email"
      divClass='w-full'
      placeholder="John@gmail.com"
      id="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      icon={AiOutlineMail} // Specify the icon you want to use
    />
{/* passord */}
<div className="flex w-full flex-col">
      <label className="text-emerald-500 font-medium">
        Password<span className="text-red-500">*</span>
      </label>
      <div className="relative flex items-center mb-4  border border-gray-500">
        <AiOutlineLock className="text-white p-0.5 w-8 h-8 bg-emerald-500"/>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          placeholder="John.1234"
          type={isPasswordHidden ? 'password' : 'text'}
          className="w-full p-1 ml-3 text-emerald-500 outline-none bg-transparent"
        />
        <span
          className="text-gray-500 absolute top-1 right-3 inset-y-0 my-auto active:text-gray-500 cursor-pointer"
          onClick={() => setPasswordHidden(!isPasswordHidden)}
        >
          {isPasswordHidden ? (
            <AiFillEyeInvisible className="w-6 h-6" />
          ) : (
            <AiFillEye className="w-6 h-6" />
          )}
        </span>
      </div>
    </div>

        </div>
       <div className='flex flex-col justify-center mt-4 gap-4 '>
       <button
            className='bg-emerald-500  text-white font-bold px-6 flex justify-center py-2'
            type="submit"
            disabled={loading}
          >
            {loading ? " Please Wait..." : 'Login'}
          </button>
        <p className='flex items-center text-gray-300'>Not a User! <Link to='/signup'><span className='text-emerald-500 ml-1'>Signup</span></Link></p>
        </div>
      </form>
    </div>
    </div>
    </div>
    </div>
    )}
    </>
  );
};

export default Login;