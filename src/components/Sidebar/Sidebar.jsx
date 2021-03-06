import React from 'react';
import {
  useLocation, NavLink, Link, useHistory
} from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import useDeviceDetect from 'ultis/useDeviceDetect';
import Logo from 'assets/img/reactlogo.png';
import { ROUTES } from 'common/constants';
import useAuthentication from 'stores/authentication/authentication';

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const history = useHistory();
  const [, authenticationActions] = useAuthentication();
  const { isMobile } = useDeviceDetect();
  const activeRoute = (routeName) => (location.pathname.indexOf(routeName) > -1 ? 'active' : '');
  const renderMenuItem = (prop) => (
    <li
      className={
        prop.upgrade
          ? 'active active-pro'
          : activeRoute(prop.layout + prop.path)
      }
      key={prop.path}
    >
      <NavLink
        to={prop.layout + prop.path}
        className="nav-link"
        activeClassName="active"
      >
        <i className={prop.icon} />
        <p>{prop.name}</p>
      </NavLink>
    </li>
  );
  const handleLogout = (event) => {
    event.preventDefault();
    authenticationActions.logout();
    history.replace(ROUTES.LOGIN);
  };

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: `url(${image})`
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <Link
            to={ROUTES.DASHBOARD}
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img
                src={Logo}
                alt="..."
              />
            </div>
          </Link>
          <Link className="simple-text" to={ROUTES.DASHBOARD}>
            EXPENSES PORTAL
          </Link>
        </div>
        <Nav>
          {routes.map((prop) => {
            if (!prop.redirect) {
              return renderMenuItem(prop);
            }
            return null;
          })}
        </Nav>
        {isMobile && <Link to="/" className="logout" onClick={handleLogout}>LOG OUT</Link>}
      </div>
    </div>
  );
}

export default Sidebar;
