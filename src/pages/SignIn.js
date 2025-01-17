import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import "../assets/css/style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import axios from "axios";
import { motion } from "framer-motion";

const SignIn = () => {
  const [validated, setValidated] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Client-side form validation
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setShowError(true);

      // Hide error after 3 seconds
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      setValidated(true);
      return;
    }

    // If the form is valid, proceed with API call
    try {
      const response = await axios.post("https://api.example.com/signin", {
        username: formData.email,
        password: formData.password,
      });

      // Store the user data in Redux
      dispatch(setUserData(response.data));

      //  reset the form after successful login
      setFormData({
        username: "",
        password: "",
      });
      navigate("/Notes");
      console.log("Login successful, user data:", response.data);
    } catch (error) {
      // for temporary purpose
      dispatch(
        setUserData({
          username: formData.email,
          password: formData.password,
        })
      );
      localStorage.setItem(
        "userData",
        JSON.stringify({
          username: formData.email,
          password: formData.password,
        })
      );
      navigate("/Notes");
      // for temporary purpose

      console.error("Login error:", error.response?.data || error.message);
      setShowError(true);

      // Hide error message after 3 seconds
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }

    setValidated(true); // Trigger form validation on submit
  };

  const clickHandler = () => {
    navigate("/Signup");
  };

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0 }}
      transition={{ duration: 1 }}
      className="flex-grow-1 d-flex justify-content-center align-items-center signin-form"
    >
      <Container className="d-flex justify-content-center align-items-center">
        <Row className="justify-content-center w-100">
          <Col md="4">
            <Card
              style={{
                backgroundColor: "#fdf6e3",
              }}
            >
              <div className="header d-flex align-items-center justify-content-between">
                <h6 className="mb-0" style={{ fontWeight: "bold" }}>
                  Login
                </h6>
                <div className="circles d-flex align-items-center">
                  <div className="circle red"></div>
                  <div className="circle yellow"></div>
                  <div className="circle green"></div>
                </div>
              </div>
              <Card.Body>
                <Card.Title
                  className="text-center mb-4"
                  style={{ fontWeight: "bold", fontSize: "1.5rem" }}
                >
                  Login
                </Card.Title>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    {showError && (
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group controlId="formPassword" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      minLength={6}
                      required
                    />
                    {showError && (
                      <Form.Control.Feedback type="invalid">
                        Password must be at least 6 characters long.
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Row className="mx-3">
                    <Col>
                      <Button type="submit" className="w-100 login-btn">
                        Login
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        className="w-100 register-btn"
                        onClick={clickHandler}
                      >
                        Register
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default SignIn;
