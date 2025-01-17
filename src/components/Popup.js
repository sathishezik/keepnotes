import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../assets/css/style.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Popup = ({ initialContent, onClose, onSave }) => {
  const [newContent, setNewContent] = useState(initialContent);
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    onSave(newContent); // Save data to the parent component
    onClose(); // Close the modal
  };

  const loginHandler = () => {
    onClose();
    navigate("/");
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {initialContent?.title ? "Edit Note" : "Add Notes"}
        </Modal.Title>
      </Modal.Header>
      {user ? (
        <>
          <Modal.Body className="pb-0">
            <Form>
              <Form.Group className="mb-3">
                {/* <Form.Label>Title</Form.Label> */}
                <Form.Control
                  type="text"
                  name="title"
                  value={newContent.title}
                  onChange={handleChange}
                  placeholder="Enter Title"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                {/* <Form.Label>Description</Form.Label> */}
                <Form.Control
                  as="textarea"
                  rows={6}
                  name="description"
                  value={newContent.description}
                  onChange={handleChange}
                  placeholder="Enter Description"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button
              type="button"
              className="btn success"
              onClick={handleSaveClick}
            >
              Save
            </Button>
            <Button className="btn cancel" onClick={onClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <Modal.Body className="">
          {" "}
          <p>
            You need to log in to access this page. Please log in to continue.
          </p>
          <Button
            type="button"
            variant="success"
            className="d-block mx-auto"
            onClick={loginHandler}
          >
            Login
          </Button>
        </Modal.Body>
      )}
    </Modal>
  );
};

export default Popup;
