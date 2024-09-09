import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItemCount } from '../redux/productsSlice'; // Adjust path if needed
import { selectUserName, setUserName } from '../redux/userSlice'; // Adjust path if needed
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'; // Import react-bootstrap components
import './Navbar.css'; // Import custom CSS file

function NavbarComponent() {
  const cartItemCount = useSelector(selectCartItemCount);
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setUserName('')); // Clear user name from the Redux store
    navigate('/'); // Redirect to home page
  };

  return (
    <Navbar className="navbar" expand="lg" fixed="top">
      <Navbar.Brand as={Link} to="/">E-Thrift</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/products">Products</Nav.Link>
          <NavDropdown title="Categories" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/products?category=clothing">Clothing</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/products?category=accessories">Accessories</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/products?category=electronics">Electronics</NavDropdown.Item>
          </NavDropdown>
          {userName ? (
            <>
              <Nav.Link disabled className="nav-link disabled">Welcome, {userName}</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          ) : (
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          )}
          <Nav.Link as={Link} to="/cart">
            <i className="fa fa-shopping-cart"></i>
            <span className="badge">{cartItemCount}</span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
