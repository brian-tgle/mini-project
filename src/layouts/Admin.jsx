import React, { useEffect, useState } from 'react';
import {
  useLocation, Route, Switch, useHistory
} from 'react-router-dom';
import AdminNavbar from 'components/Navbars/AdminNavbar';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';
import routes from 'routes';
import useAuthentication from 'stores/authentication/authentication';
import useDeviceDetect from 'ultis/useDeviceDetect';
import { ROUTES } from 'common/constants';
import sidebarImage from 'assets/img/sidebar-5.jpg';

function Admin() {
  const history = useHistory();
  const location = useLocation();
  const { isMobile } = useDeviceDetect();
  const [authentication] = useAuthentication();
  const [isSidebarVisible, setIsSidebarVisible] = useState(!isMobile);
  const renderRoute = (prop) => (
    <Route
      path={prop.layout + prop.path}
      render={(props) => <prop.component {...props} />}
      key={prop.path}
    />
  );
  const getRoutes = (routeList) => routeList.map((prop) => {
    if (prop.layout === '/admin') {
      return renderRoute(prop);
    }
    return null;
  });

  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => !prevState);
  };

  useEffect(() => {
    if (isMobile) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      setIsSidebarVisible(false);
    }
  }, [location, isMobile]);

  useEffect(() => {
    if (!authentication.loggedIn) {
      history.replace(ROUTES.LOGIN);
    }
  }, [authentication]);

  return (
    <>
      <div className="wrapper">
        {isSidebarVisible && <Sidebar color="black" image={sidebarImage} routes={routes} />}
        <div className="main-panel">
          <AdminNavbar toggleSidebar={toggleSidebar} />
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin;
