import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import archery from "../assets/images/archery.png";
import "../assets/css/style.css";
import { addCard, updateCard } from "../redux/cardsSlice";
import Popup from "../components/Popup";
import { motion } from "framer-motion";

const Home = () => {
  const [greeting, setGreeting] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const user = useSelector((state) => state.user.userData);
  const cards = useSelector((state) => state.cards);
  const dispatch = useDispatch();

  const formatDate = (date) => {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  useEffect(() => {
    const hours = new Date().getHours();
    setGreeting(
      hours < 12
        ? "Good Morning"
        : hours < 18
        ? "Good Afternoon"
        : "Good Evening"
    );
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handlePopupSave = (newContent) => {
    if (selectedCard) {
      // Edit existing card
      dispatch(
        updateCard({
          id: selectedCard.id,
          title: newContent.title,
          description: newContent.description,
        })
      );
    } else {
      // Add new card
      dispatch(
        addCard({
          title: newContent.title,
          description: newContent.description,
        })
      );
    }
    setShowPopup(false);
  };

  return (
    <div className="home">
      <Container>
        <Row>
          <Col md="12">
            <motion.div
                initial={{ x: -200 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
              <h2>
                {greeting}{" "}
                {user.username.includes("@")
                  ? user.username.split("@")[0]
                  : user.username}
              </h2>
            </motion.div>
            
          </Col>
        </Row>

        <Row className="mt-5">
          {cards.map((item, key) => (
            <Col md={3} key={key} className="mb-3">
              <Card
                className="notes"
                onClick={() => handleCardClick(item)} // Open edit popup on click
                style={{ cursor: "pointer" }}
              >
                <Card.Body className="p-0 d-flex flex-column">
                  <Card.Title className="mb-0">
                    <div className="d-flex align-items-center justify-content-between">
                      <h2 className="mb-0">{item?.title}</h2>
                      <img
                        src={archery}
                        className="img-fluid"
                        loading="lazy"
                        alt="archery"
                      />
                    </div>
                  </Card.Title>
                  <Card.Text>{item?.description}</Card.Text>
                  <Card.Footer>
                    <p className="mb-0 text-end">
                      last modified <span>{formatDate(item.modifiedDate)}</span>
                    </p>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {showPopup && (
        <Popup
          initialContent={selectedCard || { title: "", description: "" }}
          onClose={handlePopupClose} // Close function
          onSave={handlePopupSave} // Save function
        />
      )}
    </div>
  );
};

export default Home;
