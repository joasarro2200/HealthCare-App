import React from 'react';
import { Link } from 'react-router-dom';
import { HOME_ROUTE, LIST_PATIENTS_ROUTE } from '../../constants/routes';

import appLogo from '../../assets/logo.svg';

import './styles.css';

const Header: React.FC = () => {
  return (
    <header>
      <Link to={HOME_ROUTE}>
        <img src={appLogo} alt="App logo" className='logo' />
      </Link>
      <nav>
        <Link className='link' to={LIST_PATIENTS_ROUTE}>
          Patients
        </Link>
      </nav>
    </header>
  );
};

export default Header;
