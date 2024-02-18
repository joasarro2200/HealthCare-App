import React from 'react';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../../constants/routes';

import appLogo from '../../assets/logo.svg';

import './styles.css';

const Header: React.FC = () => {
  return (
    <nav className='header'>
      <Link className='link' to={HOME_ROUTE}>
        <img src={appLogo} alt="App logo" className='logo' />
      </Link>
      <Link className='link' to='/'>
        <p className='linkText'>Patients</p>
      </Link>
    </nav>
  );
};

export default Header;
