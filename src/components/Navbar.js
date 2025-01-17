import React from "react";
import { Navbar, Nav, Offcanvas, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import { useState } from "react";
import Popup from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import { addCard } from "../redux/cardsSlice";
import { setUserData } from "../redux/userSlice";


const Header = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const user = useSelector((state) => state.user.userData);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleAddButtonClick = () => {
    setCurrentCard(null);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSave = (newContent) => {
    if (currentCard) {
      const updatedCards = [...cards];
      updatedCards[currentCard.index] = newContent;
      setCards(updatedCards);
      dispatch(
        addCard({
          title: newContent.title,
          description: newContent.description,
        })
      );
    } else {
      setCards([...cards, newContent]);
      dispatch(
        addCard({
          title: newContent.title,
          description: newContent.description,
        })
      );
    }
    setIsPopupOpen(false);
  };

  const logoutHandler = () =>{
    localStorage.clear()
     dispatch(setUserData(null));
    navigate('/')
  }
  return (
    <div>
      <Navbar expand="lg" className="navbar">
        <Container>
          <Navbar.Brand >Keep Notes</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            onClick={toggleSidebar}
          />
          <Navbar.Collapse className="d-none d-lg-flex">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/About" style={{pointerEvents:"none"}}>
                About
              </Nav.Link>
              <Nav.Link onClick={handleAddButtonClick}>Notes</Nav.Link>
              <Nav.Link as={Link} to="/account" style={{pointerEvents:"none"}}>
                Account
              </Nav.Link>
              {user ? (
                <Nav.Link onClick={logoutHandler}>
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/Login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Sidebar Offcanvas */}
      <Offcanvas
        show={showSidebar}
        onHide={toggleSidebar}
        placement="end"
        className="d-lg-none"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Keep Notes</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/home" onClick={toggleSidebar}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/features" onClick={toggleSidebar}>
              Notes
            </Nav.Link>
            <Nav.Link as={Link} to="/pricing" onClick={toggleSidebar}>
              Account
            </Nav.Link>
            <Nav.Link as={Link} to="/Login" onClick={toggleSidebar}>
              Login
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {isPopupOpen && (
        <Popup
          initialContent={currentCard || { title: "", description: "" }}
          onClose={handleClosePopup}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Header;
