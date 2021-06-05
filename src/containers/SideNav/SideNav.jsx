import React from 'react';
import Logo from '../../assets/images/logo.png';
import './SideNav.css';
import Avatar from '../../assets/images/Avatar.png';
import Home from '../../assets/images/homeIcon.png';
import NavList from '../../components/NavList/NavList';

const SideNav = () => {
  return (
    <>
      <div className='Navbar position-fixed'>
        <img className='logo' src={Logo} alt='Logo' />
        <div className='avatarContainer'>
          <img className='avatar' src={Avatar} alt='Avatar' />

          <div className='dropdown User'>
            <li
              className='btn btn-secondary dropdown-toggle'
              role='button'
              id='dropdownMenuLink'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'>
              Aman Rai
              <i className='fa fa-angle-down' aria-hidden='true'></i>
            </li>
            <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
              <a className='dropdown-item' href='logout'>
                Logout
              </a>
            </div>
          </div>
        </div>
        <NavList href='Home' title='Home' icon={Home} />
      </div>
    </>
  );
};

export default SideNav;
