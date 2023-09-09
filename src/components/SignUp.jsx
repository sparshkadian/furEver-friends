import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db } from './../firebase.config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import GoogleAuth from '../providers/GoogleAuth';
import FacebookAuth from '../providers/FacebookAuth';
import { toast } from 'react-toastify';

const SignUp = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const colRef = await getDocs(collection(db, 'users'));
      colRef.forEach((doc) => {
        if (doc.data().email === email) {
          toast.error('Email Already in Use');
        }
      });

      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      const data = {
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoUrl: auth.currentUser.photoURL,
      };

      await setDoc(doc(db, 'users', auth.currentUser.uid), data);

      toast.success('Account Created Successfully');
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error('SignUp Failed! Try Again.');
    }
  };

  return (
    <>
      <div className='h-screen'>
        <form className='form-container w-4/5 md:w-[60%] lg:w-1/2 rounded-md flex flex-col gap-2'>
          <label htmlFor='name'>Name: </label>
          <input
            className='border-2 rounded-md p-2 border-black'
            type='text'
            id='name'
            value={name}
            onChange={handleChange}
          />

          <label htmlFor='email'>Email: </label>
          <input
            className='border-2 rounded-md p-2 border-black'
            type='text'
            id='email'
            value={email}
            onChange={handleChange}
          />

          <label htmlFor='password'>Password: </label>
          <input
            className='border-2 rounded-md p-2 border-black'
            type='text'
            id='password'
            value={password}
            onChange={handleChange}
          />

          <p>
            Have an Account ?{' '}
            <span className='text-red-500'>
              <Link to='/login'>LogIn</Link>
            </span>
          </p>

          <button className='btn mt-3' onClick={handleSignUp} type='submit'>
            Sign Up
          </button>

          <div className='form-divider relative border-2 mt-2'></div>

          <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <GoogleAuth />
            <FacebookAuth />
          </div>

          <p className='text-sm'>
            <Link to='/'>&larr; Back Home</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
