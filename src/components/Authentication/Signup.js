import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible, AiOutlineMail, AiOutlineLock,AiOutlineIdcard } from 'react-icons/ai';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { CiUser } from "react-icons/ci";
import TextInput from '../Inputs/TextInput';
import { MdOutlinePhone, MdOutlineContactPhone  } from "react-icons/md";
import { IoBookOutline,IoSchoolOutline } from "react-icons/io5";
import { BsCalendar2Date } from "react-icons/bs";
import { FaBookBible } from "react-icons/fa6";
import { FaRegAddressBook } from "react-icons/fa";

import DropdownInput from '../Inputs/DropdownInput';
import Loading from '../Loading/Loading';
const Signup = () => {
 const currentDate= new Date().toISOString().split('T')[0] // Today's date
  const currentYear= new Date().getFullYear()
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail ] = useState('')
  const [course, setCourse] = useState('');
  const [section,setSection] = useState('')
  const [password, setPassword] = useState('');
  const [phone,setPhone] = useState('')
  const [cnic , setCnic] = useState('')
  const [fatherName,setFatherName] = useState('')
  const [fatherCnic, setFatherCnic]  = useState('')
  const [fatherPhone, setFatherPhone] = useState('')
  const [emergencyPhone,setEmergencyPhone] = useState('')
  const [role, setRole] = useState('student'); // Default role is student
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState('');
 const [registrationDate,setRegistrationDate] = useState(currentDate)
 const [registrationYear,setRegistrationYear] = useState(currentYear)
 const [loading, setLoading] = useState(false);
 const [qualification, setQualification] = useState('')
 const [otherQualifications, setOtherQualifications] = useState([]);
 const [newQualification, setNewQualification] = useState('');
const [courseAllowed,setCourseAllowed] = useState('')
 const handleInputChange = (e) => {
   setNewQualification(e.target.value);
 };

 const addQualification = () => {
   if (newQualification.trim() !== '') {
     setOtherQualifications((prevQualifications) => [...prevQualifications, newQualification]);
     setNewQualification('');
   }
 };

 const removeQualification = (index) => {
   setOtherQualifications((prevQualifications) => [
     ...prevQualifications.slice(0, index),
     ...prevQualifications.slice(index + 1),
   ]);
 };

  const courseOptions = [
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Software Engineering', label: 'Software Engineering' },
    { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
  ];
  const sectionOptions = [
    { value: 'A', label: 'Section A' },
    { value: 'B', label: 'Section B' },
    
  ];
  
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();
  
    let navigateToLogin;
  
    try {
      setLoading(true);
      
      navigateToLogin = navigate;
  
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Check if the user document exists in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (!userDocSnapshot.exists()) {
        // If the user document doesn't exist, create it
        await setDoc(userDocRef, {
          firstName,
          lastName,
          email,
          password,
          course,
          section,
          phone,
          cnic,
          fatherName,
          fatherCnic,
          fatherPhone,
          emergencyPhone,
          dateOfBirth,
          age,
          registrationDate,
          registrationYear,
          qualification,
          otherQualifications,
          courseAllowed,
          role,
        });
      }
      toast.success('Registeration Successful! Please Login to continue');
  
      console.log('User signed up:', user);
    } catch (error) {
      console.error('Error signing up:', error.message);
      toast.error('Something went wrong went registering your account');
      navigateToLogin('/signup');
    }finally {
      setLoading(false);
    }
  
    if (navigateToLogin) {
      navigateToLogin('/login', { replace: true });
      console.log('After navigation');
    }
  };
  const handleDateOfBirthChange = (e) => {
    const selectedDate = e.target.value;
    setDateOfBirth(selectedDate);

    // Calculate age based on the selected date of birth
    const birthDate = new Date(selectedDate);
    const currentDate = new Date();
    const calculatedAge = currentDate.getFullYear() - birthDate.getFullYear();
    setAge(calculatedAge);
  };

  return (<>

    {loading ? (<Loading/>) : (
    <div className=" flex justify-center items-center">
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center  " style={{ backgroundImage: 'url("https://images.unsplash.com/uploads/1412026095116d2b0c90e/3bf33993?q=80&w=1767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
    <div className="  p-2 bg-black  bg-opacity-70 backdrop-blur-md flex justify-center items-center">
      <div className='inline-block justify-center  p-8   overflow-y-auto bg-green-950 bg-opacity-40 rounded-lg text-left  shadow-xl transform transition-all sm:my-8   sm:w-2xl'>

      <form onSubmit={handleSignup} >
      <h2 className=' text-3xl font-bold  pt-1 text-emerald-500 to-blue-800'>Signup</h2>
      <p className='text-lg text-gray-300 mb-5'>Welcome to our CMS System</p>

{/* Role */}
      <div className=' flex w-full gap-4'>
         
          <div className='flex items-center space-x-4'>
            <label className='flex items-center text-emerald-500'>
              <input
                type='radio'
                value='student'
                className='bg-emerald-500 mr-1 text-emerald-500'
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
            <label className='flex items-center text-emerald-500'>
              <input
                type='radio'
                value='assistant'
                className='bg-emerald-500 mr-1'
                checked={role === 'assistant'}
                onChange={() => setRole('assistant')}
              />
              Assistant Trainer
            </label>
          </div>
        </div>

        {/* First Name An Last Name */}
        <div className='flex flex-col md:flex-row gap-4'>
        <TextInput
        type="text"
        divClass='w-full md:w-1/2'
      label="First Name"
      id="firstName"
      placeholder="John"
      name="firstName"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      icon={CiUser} // Specify the icon you want to use
    />

        <TextInput
        type="text"
        divClass='w-full md:w-1/2'
      label="Last Name"
      id="lastName"
      placeholder="Doe"
      name="lastName"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      icon={CiUser} // Specify the icon you want to use
    />
</div>

{/* email and password */}
<div className='flex flex-col md:flex-row gap-4'>
      <TextInput
        type="email"
      label="Email"
      divClass='w-full md:w-1/2'
      placeholder="John@gmail.com"
      id="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      icon={AiOutlineMail} // Specify the icon you want to use
    />
{/* passord */}
<div className="flex w-full  md:w-1/2 flex-col">
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

        {/* contact and CNIC */}
<div className='flex flex-col md:flex-row gap-4'>
        <TextInput
        type="number"
      label="Phone Number"
      divClass='w-full md:w-1/2'
      id="phone"
      placeholder="+923-------"
      name="phone"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      icon={MdOutlinePhone} // Specify the icon you want to use
    />
    <TextInput
        type="number"
      label="CNIC Number"
      divClass='w-full md:w-1/2'
      placeholder="00000-0000000-0"
      id="cnic"
      name="cnic"
      value={cnic}
      onChange={(e) => setCnic(e.target.value)}
      icon={AiOutlineIdcard} // Specify the icon you want to use
    />
      
       </div>

        {/* course and section */}
{(role=== "student") ? ( 
  
  <div className='flex flex-col md:flex-row gap-4'>
      <DropdownInput
  label="Select Course"
  id="course"
  divClass='w-full md:w-1/2'
  name="course"
  value={course}
  onChange={(e) => setCourse(e.target.value)}
  options={courseOptions}
  icon={IoBookOutline}
/>

<DropdownInput
  label="Select Section"
  id="section"
  divClass='w-full md:w-1/2'
  name="section"
  value={section}
  onChange={(e) => setSection(e.target.value)}
  options={sectionOptions}
  icon={FaRegAddressBook }
/>
        </div>
): (
  // Qualification and Other Qualification
  <div className='flex flex-col md:flex-row gap-4'>
      <TextInput
  label="Qualification"
  id="qualification"
  placeholder='Qualification'
  divClass='w-full md:w-1/2'
  name="qualification"
  value={qualification}
  onChange={(e) => setQualification(e.target.value)}
  // options={courseOptions}
  icon={IoSchoolOutline}
/>

      <TextInput
  label="Course Allowed"
  id="courseAllowed"
  divClass='w-full md:w-1/2'
  name="courseAllowed"
  value={courseAllowed}
  type="number"
  placeholder='Cources'
  onChange={(e) => {
    // Check if the entered value is between 0 and 5 (inclusive)
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 5) {
      setCourseAllowed(newValue);
    }
  }}
  icon={FaBookBible}
/>


        </div>
)}
{(role=== "teacher" || role=== "assistant")&& (
  <div className="flex flex-col">
  <label className="text-emerald-500 font-medium">
    Other Qualifications<span className='text-red-500'>*</span>
  </label>
  <div className="flex items-center border mb-2 border-gray-500">
    <input
      value={newQualification}
      onChange={handleInputChange}
      placeholder="Add a qualification"
      className="w-full p-1 ml-3 text-emerald-500 outline-none bg-transparent"
    />
    <button
      type="button"
      onClick={addQualification}
      className="ml-2 bg-emerald-500 w-fit text-white p-1"
    >
      AddQualification
    </button>
  </div>

  {otherQualifications.length > 0 && (
    <div>
      <h2 className="text-emerald-500 font-medium">List of Other Qualifications:</h2>
      <ul>
        {otherQualifications.map((qualification, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span className='text-gray-500'>{qualification}</span>
            <button
              type="button"
              onClick={() => removeQualification(index)}
              className="text-red-500 ml-2"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )}
</div>
)}
        
{(role=== "student")&& (
  <>
   {/* father Name and Father CNIC */}
   <div className='flex flex-col md:flex-row gap-4'>
       <TextInput
        type="text"
        divClass='w-full md:w-1/2'
      label="Father name"
      id="fatherName"
      placeholder="Richard Doe"
      name="fatherName"
      value={fatherName}
      onChange={(e) => setFatherName(e.target.value)}
      icon={AiOutlineIdcard} // Specify the icon you want to use
    />
    <TextInput
        type="number"
      label="Father CNIC"
      divClass='w-full md:w-1/2'
      id="fatherCnic"
      placeholder="00000-0000000-0"
      name="fatherCnic"
      value={fatherCnic}
      onChange={(e) => setFatherCnic(e.target.value)}
      icon={AiOutlineIdcard} // Specify the icon you want to use
    />
       
       </div>
       <div className='flex flex-col md:flex-row gap-4'>
       <TextInput
        type="number"
        divClass='w-full md:w-1/2'
      label="Father Contact"
      id="fatherPhone"
      placeholder="+923---------"
      name="fatherPhone"
      value={fatherPhone}
      onChange={(e) => setFatherPhone(e.target.value)}
      icon={MdOutlineContactPhone} // Specify the icon you want to use
    />
     <TextInput
        type="number"
      label="Emergency Contact"
      id="emergencyPhone"
      divClass='w-full md:w-1/2'
      placeholder="+923---------"
      name="emergencyPhone"
      value={emergencyPhone}
      onChange={(e) => setEmergencyPhone(e.target.value)}
      icon={MdOutlinePhone} // Specify the icon you want to use
    />
       
       </div>
       {/* date of birth and Age */}
       <div className='flex flex-col md:flex-row gap-4'>
       <TextInput
        type="date"
        placeholder="08/17/1999"
      label="Date Of Birth"
      divClass='w-full md:w-1/2'
      id="dateOfBirth"
      name="dateOfBirth"
      value={dateOfBirth}
      onChange={handleDateOfBirthChange}
      icon={BsCalendar2Date } // Specify the icon you want to use
    />
       
       <TextInput
        type="text"
      label="Age"
      id="age"
      divClass='w-full md:w-1/2'
      name="age"
      value={age}
      readOnly
      icon={MdOutlinePhone} // Specify the icon you want to use
    />
       
       </div>
  
  
  </>
)}
      

        
        <div className='flex flex-col justify-center mt-4 gap-4 '>
                    <button  disabled={loading} className='bg-emerald-500   text-white font-bold px-6 flex justify-center py-2' type="submit">
                    {loading ? " Please Wait..." : 'Signup'}
                      </button>
                    <p className='flex items-center text-gray-300'>Already Registered! <Link to='/login'><span className='text-emerald-500 ml-1'>Login</span></Link></p>
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

export default Signup;
