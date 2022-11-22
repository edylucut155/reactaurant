import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing/Landing";
import Dashboard from "./pages/dashboard/Dashboard";
import "./App.css";
import { UserAuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import { PagesPaths } from "./pages/types";
import CreateRestaurant from "./components/restaurant/scenes/create/CreateRestaurant";
import ManageRestaurant from "./components/restaurant/scenes/manage/ManageRestaurant";
import ViewRestaurant from "./components/restaurant/scenes/view/ViewRestaurant";
import EditRestaurant from "./components/restaurant/edit/EditRestaurant";
import Restaurants from "./components/restaurant/scenes/view/ViewAllRestaurants";

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path={PagesPaths.CREATE_RESTAURANT}
              element={
                <ProtectedRoute>
                  <CreateRestaurant />
                </ProtectedRoute>
              }
            />
            <Route
              path={PagesPaths.MANAGE_RESTAURANT}
              element={
                <ProtectedRoute>
                  <ManageRestaurant />
                </ProtectedRoute>
              }
            />
            <Route
              path={PagesPaths.VIEW_RESTAURANT}
              element={
                <ProtectedRoute>
                  <ViewRestaurant />
                </ProtectedRoute>
              }
            />
            <Route
              path={PagesPaths.EDIT_RESTAURANT}
              element={
                <ProtectedRoute>
                  <EditRestaurant />
                </ProtectedRoute>
              }
            />
            <Route
              path={PagesPaths.RESTAURANTS}
              element={
                <ProtectedRoute>
                  <Restaurants />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
