import React, { useState } from 'react';

import './styles.css';
import { GenericObject } from '../../constants/types';


interface CardProps {
  imageSrc: string;
  title: string;
  extraInfo: GenericObject;
}

const Card: React.FC<CardProps> = ({ imageSrc, title, extraInfo }) => {
  const [showExtraInfo, setShowExtraInfo] = useState<boolean>(false);

  const handleClick = () => {
    setShowExtraInfo(!showExtraInfo);
  }

  return (
    <div className='card'>
      <div className='cardBasic'>
        <img className='cardImg' src={imageSrc} alt='cardImage' />
        <span className='cardTitle'>{title}</span>
        <div className='showMore'>
          <button type='button' onClick={handleClick} className='showMoreButton'>
            {!showExtraInfo ? 'Show more' : 'Show less'}
          </button>
        </div>
      </div>
      {showExtraInfo && <div className='cardExtra'>
        {Object.entries(extraInfo).map(([key, value]) => (
          <div className='extraEntry' key={key}>
            <p>{key}:</p>
            <p>{value}</p>
          </div>
        ))}
      </div>}
    </div>
  );
};

export default Card;
