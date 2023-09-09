import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from '../providers/GoogleAuth';
import FacebookAuth from '../providers/FacebookAuth';
import { toast } from 'react-toastify';

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Sign In Successfull');
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error('User Not Found');
    }
  };

  return (
    <>
      <div className='h-screen'>
        <form className='form-container w-4/5 md:w-[60%] lg:w-1/2 flex flex-col gap-2'>
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
            Don't Have an Account ?{' '}
            <span className='text-red-500'>
              <Link to='/signup'>Sign Up</Link>
            </span>
          </p>

          <button className='btn mt-3' onClick={handleSignUp} type='submit'>
            Log In
          </button>

          <div className='form-divider relative border-2 mt-2'></div>

          <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <GoogleAuth />
            <FacebookAuth />
          </div>
        </form>
      </div>
    </>
  );
};

export default LogIn;
