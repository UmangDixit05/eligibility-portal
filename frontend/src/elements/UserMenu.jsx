import React, { useState, useRef, useEffect } from 'react';
import styles from './css/UserMenu.module.css';
import logoutIcon from '../svgs/logout.svg';

const UserMenu = ({ userName, userData, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.userMenu} ref={menuRef}>
      <div className={styles.userName} onClick={toggleMenu}>
        👤 {userName}
      </div>
      {isOpen && (
        <>
            
            <div className={styles.dropdown}>
                {userData}
                <button className={styles.dropdownItem} onClick={onLogout}>
                    <img src={logoutIcon} alt="logoutIcon" />
                    Logout
                </button>
            </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;
