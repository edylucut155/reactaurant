import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing/Landing";
import Dashboard from "./pages/dashboard/Dashboard";
import './App.css';
import { UserAuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import { SnackbarProvider } from "notistack";
function App() {

  return (
    <>
      <UserAuthContextProvider>
        <SnackbarProvider>
          <BrowserRouter>
              <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/dashboard' element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
                />
              </Routes>
            </BrowserRouter>
        </SnackbarProvider>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
