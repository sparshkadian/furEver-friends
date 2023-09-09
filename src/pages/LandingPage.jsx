import { Link } from 'react-router-dom';
import { useAuthStatus } from './../hooks/useAuthStatus';
import { getAuth } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const LandingPage = () => {
  const auth = getAuth();
  const { isLoggedIn } = useAuthStatus();
  const [index, setIndex] = useState(0);
  const backgroundImages = [
    '../dogs-1.jpg',
    '../dogs-2.jpg',
    '../dogs-3.jpg',
    '../dogs-4.jpg',
  ];
  const backgroundPhoto = document.querySelector('.background-photo');

  const moveImageLeft = () => {
    if (index === 0) {
      setIndex(3);
    } else {
      setIndex((prev) => {
        return prev - 1;
      });
    }
    backgroundPhoto.classList.add('moveLeft');
    setTimeout(() => {
      backgroundPhoto.classList.remove('moveLeft');
    }, 1000);
  };

  const moveImageRight = () => {
    if (index === 3) {
      setIndex(0);
    } else {
      setIndex((prev) => {
        return prev + 1;
      });
    }
    backgroundPhoto.classList.add('moveRight');
    setTimeout(() => {
      backgroundPhoto.classList.remove('moveRight');
    }, 1000);
  };

  return (
    <>
      <div className='landing-page h-screen'>
        <nav className='navBar z-[1] bg-zinc-200 relative flex justify-between p-3 items-center'>
          <div className='flex flex-col'>
            <Link to='/'>
              {' '}
              <p className='text-xl'>FurEver</p>
              <p className='text-sm ml-[8.5px]'>Friends</p>
            </Link>
          </div>
          {isLoggedIn && (
            <Link to='/home'>
              <img
                src={
                  auth.currentUser.photoURL
                    ? auth.currentUser.photoURL
                    : '../dummy-user.png'
                }
                alt=''
                width={60}
                height={60}
                className='rounded-full  border-2 border-zinc-600'
              />
            </Link>
          )}

          {!isLoggedIn && (
            <div className='flex gap-4'>
              <button className='btn' type='button'>
                <Link to='/signup'>Sign Up</Link>
              </button>
              <button className='btn' type='button'>
                <Link to='/login'>Log In</Link>
              </button>
            </div>
          )}
        </nav>

        <p className='font-semibold text-black tagline text-[25px] sm:text-[30px] md:text-[40px] lg:text-[48px]'>
          Connecting Hearts and Paws
        </p>

        <main>
          <img
            src={backgroundImages[index]}
            className='background-photo w-full h-full aspect-video'
            alt='background-photo'
          />
        </main>

        <FontAwesomeIcon
          onClick={moveImageLeft}
          className='arrow left-[10px]'
          icon={faArrowLeft}
        />
        <FontAwesomeIcon
          onClick={moveImageRight}
          className='arrow right-[10px]'
          icon={faArrowRight}
        />
      </div>
    </>
  );
};

export default LandingPage;
