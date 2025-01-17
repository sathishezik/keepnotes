import { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { motion } from "framer-motion";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true); // Trigger validation state

    // Reset errors
    setErrors({});
    setSuccess(false);

    // Client-side Validation
    const validationErrors = {};
    if (!formData.username.trim())
      validationErrors.username = "Username is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email))
      validationErrors.email = "Invalid email address.";
    if (!formData.password || formData.password.length < 6)
      validationErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      validationErrors.confirmPassword = "Passwords do not match.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTimeout(() => setErrors({}), 3000); // Clear errors after 3 seconds
      return;
    }

    try {
      const response = await axios.post("https://api.example.com/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      dispatch(setUserData(response.data));
      // Show success message
      setSuccess(true);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }); // Reset form

      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
    } catch (error) {
      // for temporary purpose
      setSuccess(true);
      dispatch(
        setUserData({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
      );
      localStorage.setItem(
        "userData",
        JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
      );
      navigate("/Notes");
      // for temporary purpose

      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      const serverErrors = error.response?.data?.errors || {
        general: "An error occurred. Please try again.",
      };
      setErrors(serverErrors);
      setTimeout(() => setErrors({}), 3000); // Clear errors after 3 seconds
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000); // Hide error after 3 seconds
      return () => clearTimeout(timer); // Cleanup on component unmount
    }
  }, [showError]);

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0 }}
      transition={{ duration: 1 }}
      className="flex-grow-1 d-flex justify-content-center align-items-center signup-form"
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
                  Sign Up
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
                  Sign Up
                </Card.Title>
                {success && (
                  <Alert variant="success" className="text-center">
                    Registration successful!
                  </Alert>
                )}
                {showError && (
                  <Alert variant="danger" className="text-center">
                    {errors.confirmPassword}
                  </Alert>
                )}
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group controlId="username" className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={formData.username}
                      onChange={handleChange}
                      isInvalid={!!errors.username}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      required
                      minLength={6}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="confirmPassword" className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Row className="mx-3">
                    <Col>
                      <Button type="submit" className="w-100 register-btn">
                        Register
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        className="w-100 login-btn"
                        onClick={() => navigate("/Login")}
                      >
                        Login
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

export default SignupForm;
