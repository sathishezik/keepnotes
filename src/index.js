import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import { Helmet } from "react-helmet";

const Index = () => (
  <>
    <Helmet>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="My amazing React Application" />
      <meta name="keywords" content="React, Web Application, Productivity, Notes" />
      <meta name="author" content="Your Name" />
      <title>My React Application</title>

      {/* Open Graph tags */}
      <meta property="og:title" content="My React Application" />
      <meta property="og:description" content="An amazing React Application for managing notes." />
      <meta property="og:image" content="https://example.com/og-image.jpg" />
      <meta property="og:url" content="https://example.com" />

      {/* Twitter card tags */}
      <meta name="twitter:title" content="My React Application" />
      <meta name="twitter:description" content="An amazing React Application for managing notes." />
      <meta name="twitter:image" content="https://example.com/twitter-image.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
    
    <App />
  </>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
   <Provider store={store}>
    <React.StrictMode>
    <Index />
    </React.StrictMode>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
