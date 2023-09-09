import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';

const Home = () => {
  const auth = getAuth();
  const [dogData, setDogData] = useState([]);

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
            <div
              key={i}
              className='border-2 border-zinc-200 rounded-md flex flex-col'
            >
              <div className='dogImg-container h-[250px]'>
                <img
                  src={dog.photoURL}
                  className='w-full h-full rounded-t-md'
                  alt='cover-photo'
                />
              </div>

              <div className='flex flex-col gap-4 p-2'>
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
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
