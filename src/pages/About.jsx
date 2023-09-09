import { motion } from 'framer-motion';
import { aboutAnimate } from '../utils/motion';

const About = () => {
  return (
    <>
      <motion.div
        variants={aboutAnimate}
        initial='hidden'
        whileInView='show'
        viewport={{ amount: 0.35 }}
        className='h-screen flex flex-col gap-10 w-4/5 lg:w-1/2 m-auto py-[100px]'
      >
        <div className='text-center'>
          <h2 className='font-semibold text-xl'>About Us</h2>
          <p className='text-lg'>
            Welcome to FurEver Friends, your trusted source for connecting
            loving families with furry friends in need of forever homes. Our
            mission is to create heartwarming stories of adoption, one paw at a
            time.
          </p>
        </div>

        <div className='text-center'>
          <h2 className='font-semibold text-xl'>What We Do</h2>
          <p className='text-lg'>
            Welcome to FurEver Friends, your trusted source for connecting
            loving families with furry friends in need of forever homes. Our
            mission is to create heartwarming stories of adoption, one paw at a
            time.
          </p>
        </div>

        <div className='text-center'>
          <h2 className='font-semibold text-xl'>Why Choose Adoption?</h2>
          <p className='text-lg'>
            Adopting a pet is a special journey filled with love, compassion,
            and the promise of unwavering loyalty. When you adopt from us, you
            not only give a deserving pet a second chance at life but also
            enrich your own life with the unique bond that only a rescued pet
            can offer.
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default About;
