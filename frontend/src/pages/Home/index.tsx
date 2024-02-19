import React from 'react';
import './styles.css'

const Home: React.FC = () => {
  return (
    <div className='mainContainer'>
        <h1>Welcome!</h1>
        <p>
          Our app is designed to simplify the process of registering
          and managing patient data. Easily create and maintain patient
          records, ensuring all their information is organized and readily
          accessible.
        </p>
        <p>
            Simplify your medical facility's administrative tasks with our easy-to-use platform.
        </p>
    </div>
  );
};

export default Home;
