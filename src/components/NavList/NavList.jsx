import React from 'react';
import { Link } from 'react-router-dom';
import './NavList.css';

const NavList = ({ href, icon, title }) => {
  return (
    <>
      <Link to='/'>
        <div className='NavList'>
          <img className='icon' src={icon} alt={title} />
          <div className='title'>{title}</div>
        </div>
      </Link>
    </>
  );
};

export default NavList;
