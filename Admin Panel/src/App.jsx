import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import RestaurantList from "./pages/restaurantList/RestaurantList";
import SupplierList from "./pages/supplierList/SupplierList";
import PfaPicture from "./pages/pfapicture/PfaPicture";
import PfaData from "./pages/pfaData/PfaData";
import AdminLogin from "./pages/Login/AdminLogin";
import Home from "./pages/home/Home";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Fdaapproved from "./pages/pfaapproved/Fdaapproved";
import Contract from "./pages/contract/Contract";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import OrdersList from "./pages/orders/OrdersList";
import Disputes from "./pages/dispute/Dispute";

// route configure
function App() {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/admin" element={<Home />} />
            <Route path="/restaurant" element={<RestaurantList />} />
            <Route path="/userDetails" element={<User />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/supplier" element={<SupplierList />} />
            <Route path="/pfa" element={<PfaPicture />} />
            <Route path="/pfadata" element={<PfaData />} />
            <Route path="/fdaapprove" element={<Fdaapproved />} />
            <Route path="/contract" element={<Contract />} />
            <Route path="/orders" element={<OrdersList />} />
            <Route path="/disputes" element={<Disputes />} />
          </Route>
          <Route path="/" element={<AdminLogin />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
