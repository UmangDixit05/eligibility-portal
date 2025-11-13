import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import HomeIcon  from '../svgs/home.svg';
import LogoutIcon from '../svgs/logout.svg'
import styles from './css/SidebarHome.module.css'

export default function SidebarHome() {

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/Login")
  }

  return (
    <div className={styles.Sidebar}>
      <nav>
        <ul className='list-unstyled' id={styles.sidebarList}>
          <li className='mt-4'>
            <h1>
              <Link to="/" className='text-white text-decoration-none d-flex align-items-center gap-2'>
                <img src={HomeIcon} alt="Home" width={40} height={40} />
                Home
              </Link>
            </h1>
          </li>

          <li className='mt-4'>
            <h4>
              <Link to="/StudentReg" className='text-white text-decoration-none'>Add Student</Link>
            </h4>
          </li>

          <li className='mt-4'>
            <h4>
              <Link to="/StudentStatus" className='text-white text-decoration-none'>Check Student Status</Link>
            </h4>
          </li>

          <li className='mt-4'>
            <h4>
              <Link to="/UpdateStudent" className='text-white text-decoration-none'>Update Student Details</Link>
            </h4>
          </li>

          <li className='mt-4'>
            <h4>
              <Link to="/UpdateSubmissions" className='text-white text-decoration-none'>Update Subissions</Link>
            </h4>
          </li>

          <li className='mt-4'>
            <h4>
              <Link to="/AdminRegistration" className='text-white text-decoration-none'>Register an Admin</Link>
            </h4>
          </li>
        </ul>

        <ul className='list-unstyled' id={styles.LogoutArea}>
          <li onClick={() => handleLogout()} className={styles.AdminLogout}>
            <h2>
            {/* <h2 className='text-white text-decoration-none d-flex align-items-center gap-2'> */}
            <img src={LogoutIcon} alt="icon" height={30} width={30} />
            Logout
            </h2>
          </li>
        </ul> 
      </nav>
    </div>
  );
}
