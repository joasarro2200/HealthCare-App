import React from 'react';

import './styles.css';

interface CardProps {
  imageSrc: string;
  title: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, title }) => {
  return (
    <div className='card'>
      <img className='cardImg' src={imageSrc} alt='cardImage' />
      <span className='cardTitle'>{title}</span >
      <div className='showMore'>
        <button type='button' className='showMoreButton'>Show more</button>
      </div>
    </div>
  );
};

export default Card;
