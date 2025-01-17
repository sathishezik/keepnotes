import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./components/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import { lazy } from "react";
import { useSelector } from "react-redux";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

function App() {
  const [pageTitle, setPageTitle] = useState("");
  const location = useLocation();
  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/" || path === "/Login") {
      setPageTitle("Login Page");
    } else if (path === "/Signup") {
      setPageTitle("Signup Page");
    } else if (path === "/Notes") {
      setPageTitle("Your Notes");
    } else if (path === "/About") {
      setPageTitle("About page");
    } else {
      setPageTitle("");
    }
  }, [location]);

  return (
    <ErrorBoundary>
      <div className="min-vh-100 d-flex flex-column main">
        <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
          <Header />
          <Container>
            <Row>
              <Col>
                <h6 className="mt-3">Homepage / {pageTitle}</h6>
              </Col>
            </Row>
          </Container>

          <Routes>
            {!user ? (
              <>
                <Route path="/" element={<Navigate to="/Login" />} />
                <Route path="/Login" element={<SignIn />} />
                <Route path="/Signup" element={<SignUp />} />
                <Route path="/About" element={<About />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/Notes" />} />
                <Route path="/Notes" element={<Home />} />
              </>
            )}
          </Routes>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
