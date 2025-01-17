import React from "react";
import { Card } from "react-bootstrap";

const PopupCard = ({ content, onClick }) => {
  return (
    <Card className="mb-3" style={{ cursor: "pointer" }} onClick={onClick}>
      <Card.Body>
        <Card.Title>{content.title}</Card.Title>
        <Card.Text>{content.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PopupCard;
