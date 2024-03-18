import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { useAppSelector } from '../store/hooks';


function AppNavbar() {
  const companyProfile = useAppSelector(state => state.stock.data.companyProfile)
  return (
    <Navbar variant="dark" expand="lg" className="navbar p-0">
      <Container fluid>
        <div className="navbar-brand">Stock Search</div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav
            className="my-2 my-lg-0"
            navbarScroll
          >
            <NavLink className={({ isActive, isPending }) =>{
                   return  isActive ? "me-2 px-3 my-1 fw-light navlink-selected nav-link" : "me-2 my-1 fw-light px-3 nav-link"}
                } to={companyProfile && companyProfile.ticker.length > 0 ? `/search/${companyProfile.ticker}` : '/search/home'} >Search</NavLink>
            <NavLink className={({ isActive, isPending }) =>{
                   return  isActive ? "me-2 px-3 my-1 fw-light navlink-selected nav-link" : "me-2 my-1 fw-light px-3 nav-link"}
                } to='/watchlist' >Watchlist</NavLink>
            <NavLink className={({ isActive, isPending }) =>{
                   return  isActive ? "me-2 px-3 my-1 fw-light navlink-selected nav-link" : "me-2 my-1 fw-light px-3 nav-link"}
                } to='/portfolio' >Portfolio</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;