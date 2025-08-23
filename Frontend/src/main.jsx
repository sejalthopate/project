
// // // src/main.jsx
// // import React from "react";
// // import ReactDOM from "react-dom/client";
// // import { BrowserRouter } from "react-router-dom"; // ✅ Import router
// // import App from "./App.jsx";
// // import "./index.css";

// // ReactDOM.createRoot(document.getElementById("root")).render(
// //   <React.StrictMode>
// //     <BrowserRouter> {/* ✅ wrap App inside BrowserRouter */}
// //       <App />
// //     </BrowserRouter>
// //   </React.StrictMode>
// // );


// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom"; // ✅ Import router
// import App from "./App.jsx";
// import "./index.css";
// import { AuthProvider } from "./context/AuthContext";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider> {/* ✅ wrap */}
//         <App />
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
