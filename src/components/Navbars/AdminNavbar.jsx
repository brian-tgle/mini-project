import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

import routes from 'routes';
import useAuthentication from 'stores/authentication/authentication';
import { ROUTES } from 'common/constants';

function Header() {
  const location = useLocation();
  const history = useHistory();
  const [authenticationState, authenticationActions] = useAuthentication();
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i += 1) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };
  const handleLogout = (event) => {
    event.stopPropagation();
    authenticationActions.logout();
    history.replace(ROUTES.LOGIN);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines" />
          <span className="navbar-toggler-bar burger-lines" />
          <span className="navbar-toggler-bar burger-lines" />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" navbar>
            <Nav.Item>
              <Nav.Link
                className="m-0"
                onClick={(e) => e.preventDefault()}
              >
                <span className="no-icon">{authenticationState?.user?.fullname}</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className="m-0"
                onClick={handleLogout}
              >
                <span className="no-icon">Log out</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
