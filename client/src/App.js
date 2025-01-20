import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Dashboard from "./components/Dashboard";
import Account from "./components/Account";
import Transaction from "./components/Transaction";
import Payment from "./components/Payment";
import Reports from "./components/Reports";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import AccountRequest from "./components/AccountRequest";
import ApproveAccounts from "./components/ApproveAccounts";
import AdminLogin from "./components/AdminLogIn";
import AllUser from "./components/AllUser";



function App() {

  return (

    <Router>
      {/* <Signup /> */}

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounts" element={<Account />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/report" element={<Reports />} />

        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/new_account_request" element={<AccountRequest />} />
        <Route path="/approval_request" element={<ApproveAccounts />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/all_users" element={<AllUser />} />
      </Routes>


    </Router>

  );
}

export default App;
