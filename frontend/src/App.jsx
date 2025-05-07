import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import RideList from "./pages/Rides";
import RideCreate from "./pages/createRide";
//import RideDetail from "./pages/RideDetail";
import Dashboard from "./pages/Dashboard";

import Header from "./components/Header";
import Footer from "./components/Footer";

const pageVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

function AnimatedRoute({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-[calc(100vh-100px)]"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const { token, role } = useAuth();

  return (
    <>
      <Header />
      <Toaster position="top-center" />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <AnimatedRoute>
                <Home />
              </AnimatedRoute>
            }
          />
          <Route
            path="/login"
            element={
              !token ? (
                <AnimatedRoute>
                  <Login />
                </AnimatedRoute>
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/register"
            element={
              !token ? (
                <AnimatedRoute>
                  <Register />
                </AnimatedRoute>
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />

          {/* Protected routes */}
          {token && (
            <>
              <Route
                path="/dashboard"
                element={
                  <AnimatedRoute>
                    <Dashboard />
                  </AnimatedRoute>
                }
              />
              <Route
                path="/rides"
                element={
                  <AnimatedRoute>
                    <RideList />
                  </AnimatedRoute>
                }
              />
              <Route
                path="/rides/:id"
                element={
                  <AnimatedRoute>
                    <RideDetail />
                  </AnimatedRoute>
                }
              />
              {role === "driver" && (
                <Route
                  path="/rides/create"
                  element={
                    <AnimatedRoute>
                      <RideCreate />
                    </AnimatedRoute>
                  }
                />
              )}
            </>
          )}

          {/* Fallback */}
          <Route
            path="*"
            element={<Navigate to={token ? "/dashboard" : "/login"} />}
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}
