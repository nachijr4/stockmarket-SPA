import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function AppNavbar() {
  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid>
        <div className="navbar-brand">Stock Search</div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className="me-2 px-3 navlink-selected" href="#action1">Search</Nav.Link>
            <Nav.Link className="me-2 px-3" href="#action2">Watchlist</Nav.Link>
            <Nav.Link className="me-5 px-3" href="#">Portfolio</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;