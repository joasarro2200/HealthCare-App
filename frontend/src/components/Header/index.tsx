import React from 'react';
import { Link } from 'react-router-dom';
import { HOME_ROUTE, LIST_PATIENTS_ROUTE } from '../../constants/routes';

import './styles.css';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <Link className='link' to={HOME_ROUTE}>
          Home
        </Link>
        <Link className='link' to={LIST_PATIENTS_ROUTE}>
          Patients
        </Link>
      </nav>
    </header>
  );
};

export default Header;
