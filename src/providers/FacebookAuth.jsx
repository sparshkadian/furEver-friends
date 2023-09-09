import { Link } from 'react-router-dom';

const FacebookAuth = () => {
  const handleFacebookLogin = () => {};

  return (
    <>
      <Link to='/auth/facebook'>
        <div
          onClick={handleFacebookLogin}
          className='cursor-pointer border-2 flex justify-around p-2 items-center'
        >
          <img
            className='bg-white'
            src='../facebook-icon.png'
            alt='google-icon'
            width={40}
            height={40}
          />
          <div className='font-semibold'>Sign In with Facebook</div>
        </div>
      </Link>
    </>
  );
};

export default FacebookAuth;
