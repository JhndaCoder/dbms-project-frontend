import {Fragment, useState} from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [navbar, setNavbar] = useState (false);

  const changeNavBg = () => {
    if (window.scrollY >= window.innerHeight / 10) {
      setNavbar (true);
    } else {
      setNavbar (false);
    }
  };

  window.addEventListener ('scroll', changeNavBg);

  return (
    <Fragment>
      <nav className={navbar ? 'nav-wrapper active' : 'nav-wrapper'}>
        <div className="nav-content">
          <ul className="list-styled">
          <NavLink to={'/'} className="link-styled">
                    Customers
                </NavLink>
          
                <NavLink to={'/orders'} className="link-styled">
                    Orders
                </NavLink>
                <NavLink to={'/waiters'} className="link-styled">
                    Waiters
                </NavLink>
                <NavLink to={'/bills'} className="link-styled">
                Bills
                </NavLink>
                <NavLink to={'/chefs'} className="link-styled">
                Chefs
                </NavLink>
                <NavLink to={'/foodItems'}  className="link-styled">
                Foot Items
                </NavLink>
                <NavLink to={'/tips'}  className="link-styled">
                Tips
                </NavLink>
                
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};
export default Navbar;
