import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Search from "./pages/Search";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={
                <div className="flex flex-col min-h-screen justify-between">
                  <Navbar />
                  <div className="flex-grow mx-auto w-full md:w-3/4">
                    <Dashboard />
                  </div>
                  <Footer />
                </div>
              }
            />
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute
              element={
                <div className="flex flex-col min-h-screen justify-between">
                  <Navbar />
                  <div className="flex-grow mx-auto w-full md:w-3/4">
                    <Search />
                  </div>
                  <Footer />
                </div>
              }
            />
          }
        />
        <Route
          path="*"
          element={
            <div className="flex flex-col min-h-screen justify-between">
              <Navbar />
              <div className="mx-auto w-full mb-20 md:w-3/4">
                <NotFound />
              </div>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
