import React from "react";
import { Route, Routes } from "react-router-dom";
import TableUser from "../components/TableUser";
import Home from "../components/Home";
import Login from "../components/Login";
import PrivateRoutes from "./PrivateRoutes";
function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <PrivateRoutes>
              <TableUser />
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default AppRoutes;
