import { getAuth, signOut, deleteUser, updateProfile } from 'firebase/auth';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const Profile = () => {
  const auth = getAuth();
  const profilePhoto = auth.currentUser.photoURL;
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      signOut(auth);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (window.confirm('Are u sure u want to delete ur account')) {
        await deleteDoc(doc(db, 'users', auth.currentUser.uid));
        deleteUser(auth.currentUser);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error Occured, Pls Try Again');
    }
  };

  const handleProfileUpdate = async () => {
    // try {
    //   await updateProfile(auth.currentUser, {
    //     // photoURL:
    //   });
    //   const docRef = doc(db, 'users', auth.currentUser.uid);
    //   await updateDoc(docRef, {
    //     photoUrl: '',
    //   });
    //   toast.success('Profile Updated Successfully');
    // } catch (error) {
    //   toast.error('Error Updating Profile');
    // }
  };

  return (
    <>
      <div className='bg-gray-100 shadow-2xl rounded-md mt-10 p-2 py-5 w-[90%] md:w-[70%] lg:w-1/2 m-auto flex flex-col gap-10'>
        <p className='font-semibold text-center text-xl'>Profile Details</p>

        {!profilePhoto && (
          <div className='flex items-center gap-2'>
            <label htmlFor='photo'>Upload Profile Photo:</label>
            <input onClick={handleProfileUpdate} type='file' id='photo' />
          </div>
        )}

        {profilePhoto && (
          <img
            src={profilePhoto}
            alt='userProfile-photo'
            className='m-auto rounded-full'
            width={120}
            height={120}
          />
        )}

        <div className='flex flex-col gap-3 sm:text-lg'>
          <p className='font-semibold'>
            Name:{' '}
            <span className='font-normal'>{auth.currentUser.displayName}</span>
          </p>
          <p className='font-semibold'>
            Email: <span className='font-normal'>{auth.currentUser.email}</span>
          </p>
        </div>

        <div className='flex flex-col gap-5'>
          <button
            className='btn w-[40%] sm:w-1/3 m-auto'
            onClick={handleSignOut}
            type='button'
          >
            SignOut
          </button>

          <button
            className='btn w-1/2 sm:w-1/3 m-auto'
            onClick={handleDeleteAccount}
            type='button'
          >
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
