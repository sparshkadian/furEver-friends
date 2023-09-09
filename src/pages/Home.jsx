import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import bookmarkAnimation from './../animations/bookmarkAnimation.json';

const Home = () => {
  const auth = getAuth();
  const [dogData, setDogData] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch('http://localhost:5100/api/v1/dogs');
    const {
      data: { dogs },
    } = await response.json();
    setDogData(dogs);
  };

  const disableBookmark = (dogId) => {
    setSelectedProfiles(
      selectedProfiles.filter((id) => {
        return id !== dogId;
      })
    );
  };

  const enableBookmark = (id) => {
    setSelectedProfiles((prevState) => {
      return [...prevState, id];
    });
  };

  const checkSelected = (id) => {
    for (let i = 0; i < selectedProfiles.length; i++) {
      if (id === selectedProfiles[i]) return true;
      else return false;
    }
  };

  return (
    <>
      <nav className='navBar bg-zinc-200 relative flex justify-between p-3 items-center'>
        <div className='flex flex-col'>
          <Link to='/'>
            {' '}
            <p className='text-xl'>FurEver</p>
            <p className='text-sm ml-[8.5px]'>Friends</p>
          </Link>
        </div>
        <Link to='/profile'>
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
      </nav>

      <div className='w-4/5 m-auto grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-10'>
        {dogData.map((dog, i) => {
          return (
            <div key={i} className='relative rounded-md flex flex-col'>
              {checkSelected(dog._id) && (
                <div className='cursor-pointer absolute w-[80px] -top-[24px] right-[-12px]'>
                  {' '}
                  <Lottie
                    onClick={() => {
                      disableBookmark(dog._id);
                    }}
                    animationData={bookmarkAnimation}
                  />
                </div>
              )}

              {!checkSelected(dog._id) && (
                <div className='cursor-pointer overflow-hidden absolute -top-1 right-1'>
                  <img
                    onClick={() => {
                      enableBookmark(dog._id);
                    }}
                    src='../bookmark-disabled.png'
                    className='text-red-300'
                  />
                </div>
              )}
              <div className='h-[250px]'>
                <img
                  src={dog.photoURL}
                  className='w-full h-full rounded-t-md'
                  alt='cover-photo'
                />
              </div>

              <div className='border-2 border-zinc-200 border-t-0 flex flex-col gap-4 p-2'>
                <div>
                  <p className='font-semibold'>
                    Name: <span className='font-normal'>{dog.name}</span>
                  </p>
                </div>
                <div>
                  <p className='font-semibold'>
                    Breed: <span className='font-normal'>{dog.breed}</span>
                  </p>
                </div>
                <div>
                  <p className='font-semibold'>
                    Age: <span className='font-normal'>{dog.age}</span>
                  </p>
                </div>
                <div>
                  <p className='font-semibold'>
                    {' '}
                    Nature: <span className='font-normal'>{dog.nature}</span>
                  </p>
                </div>
                <div>
                  <p className='font-semibold'>
                    {' '}
                    Contact: <span className='font-normal'>{dog.contact}</span>
                  </p>
                </div>

                <button
                  onClick={() => console.log(dog.name)}
                  type='btn'
                  className='btn w-1/2 m-auto my-3'
                >
                  Save
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
